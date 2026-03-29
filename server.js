const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { getAllSessions, addSession, updateSessionStatus, removeSession, getSessionCount } = require('./sessionManager');
const { autoLoadPairs } = require('./autoload');
const { generatePairingCode } = require('./pairingService');

const app = express();
// Use panel-provided port when available (Pterodactyl sets SERVER_PORT)
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

// Hard limit on total concurrently connected bots (all types)
const MAX_TOTAL_SESSIONS = 100;
// Number of slots reserved for premium/VIP sessions within the global limit
const PREMIUM_RESERVED_SLOTS = 20;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'myuri_mariam',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Serve static assets directly from project root (index.html, etc.)
const publicDir = __dirname;
app.use(express.static(publicDir));

const pairedNumbersPath = path.join(__dirname, 'sesFolder', 'pairedNumbers.json');
// Store admin/users data in mariam, as in original TMK setup
const usersPath = path.join(__dirname, 'mariam', 'users.json');

const sessionStats = {
    total: 0,
    regular: 0,
    premium: 0
};

const premiumKeys = new Set();
const users = new Map();

const adminPassword = process.env.ADMIN_PASSWORD || 'myuri_mariam';
if (!adminPassword) {
    console.error('ERROR: ADMIN_PASSWORD environment variable is required');
    process.exit(1);
}
users.set('admin', { password: adminPassword, isAdmin: true });

function saveNumber(number) {
  const clean = number.replace(/@s\.whatsapp\.net$/i, '');
  let list = { numbers: [] };

  try {
    if (fs.existsSync(pairedNumbersPath)) {
      list = JSON.parse(fs.readFileSync(pairedNumbersPath, 'utf8'));
    }
  } catch {
    list = { numbers: [] };
  }

  if (!list.numbers.includes(clean)) {
    list.numbers.push(clean);
    fs.writeFileSync(pairedNumbersPath, JSON.stringify(list, null, 2));
  }
}

function loadUsers() {
  try {
    const fileData = fs.readFileSync(usersPath, 'utf8');
    const parsed = JSON.parse(fileData);
    return parsed.users || [];
  } catch (err) {
    return [];
  }
}

function saveUsers(usersList) {
  fs.writeFileSync(usersPath, JSON.stringify({ users: usersList }, null, 2));
}

function requireLogin(req, res, next) {
  if (req.session.loggedIn) return next();
  return res.redirect('/login.html');
}

function requireAdmin(req, res, next) {
  if (req.session.loggedIn && req.session.username === 'admin') return next();
  return res.status(403).json({ success: false, message: 'Admin access required' });
}

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }
  
  const user = users.get(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  req.session.loggedIn = true;
  req.session.username = username;
  req.session.isAdmin = user.isAdmin;
  
  res.json({ success: true, message: 'Login successful', username });
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

app.post('/request-pairing', async (req, res) => {
    try {
        const { phoneNumber, premiumKey } = req.body;
        
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required'
            });
        }
        
        const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (cleanPhoneNumber.length < 10) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone number format'
            });
        }
        
        const isPremium = premiumKey && premiumKeys.has(premiumKey);

        // --- Capacity control & VIP priority ---
        const totalSessions = getSessionCount();

        // Absolute hard cap for everyone
        if (totalSessions >= MAX_TOTAL_SESSIONS) {
            return res.status(429).json({
                success: false,
                error: 'Server capacity reached (100 active bots). Please try again later.'
            });
        }

        // Reserve some slots for premium: regular users are blocked earlier
        if (!isPremium && totalSessions >= (MAX_TOTAL_SESSIONS - PREMIUM_RESERVED_SLOTS)) {
            return res.status(429).json({
                success: false,
                error: 'Server is currently full for regular users. Try again later or use a premium key.'
            });
        }
        
        const result = await generatePairingCode(phoneNumber, isPremium);
        
        if (result.success && !result.connected) {
            sessionStats.total++;
            if (isPremium) {
                sessionStats.premium++;
            } else {
                sessionStats.regular++;
            }
        }
        
        res.json(result);
        
    } catch (error) {
        console.error('Error in /request-pairing:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate pairing code. Please try again.'
        });
    }
});

app.get('/server-status', (req, res) => {
    const sessions = getAllSessions();
    const regularServers = [
        { serverIndex: 1, status: 'online', sessions: sessions.length, maxSessions: 50 },
        { serverIndex: 2, status: 'online', sessions: Math.floor(Math.random() * 30), maxSessions: 50 },
        { serverIndex: 3, status: 'full', sessions: 50, maxSessions: 50 }
    ];
    
    const premiumServers = [
        { serverIndex: 1, status: 'online', sessions: Math.floor(sessionStats.premium), maxSessions: 100 },
        { serverIndex: 2, status: 'online', sessions: Math.floor(Math.random() * 20), maxSessions: 100 }
    ];
    
    res.json({
        success: true,
        serverStatus: {
            regular: regularServers,
            premium: premiumServers
        }
    });
});

app.get('/bot-counts', (req, res) => {
    res.json({
        success: true,
        botCounts: {
            total: sessionStats.total,
            regular: sessionStats.regular,
            premium: sessionStats.premium
        },
        serverStatus: {
            regularServersOnline: 3,
            premiumServersOnline: 2
        }
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        performance: {
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }
    });
});

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const credentials = Buffer.from(auth.slice(6), 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    
    const user = users.get(username);
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    req.user = { username, isAdmin: user.isAdmin };
    next();
};

app.get('/admin/keys', authenticate, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    res.json({
        success: true,
        keys: Array.from(premiumKeys)
    });
});

app.post('/admin/generate-key', authenticate, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const key = 'PREMIUM_' + crypto.randomBytes(8).toString('hex').toUpperCase();
    premiumKeys.add(key);
    
    res.json({
        success: true,
        key
    });
});

app.get('/admin/session-status', requireAdmin, (req, res) => {
  const sessions = getAllSessions();
  const sessionList = sessions.map(([number, session]) => ({
    number: number.replace(/@s\.whatsapp\.net$/i, ''),
    status: 'active'
  }));
  
  res.json({
    success: true,
    totalSessions: sessions.length,
    sessions: sessionList
  });
});

app.get('/admin/newsletter-react', requireAdmin, async (req, res) => {
  try {
    const { channelmsglink, emoji = '❤️' } = req.query;
    
    if (!channelmsglink) {
      return res.status(400).json({ 
        success: false, 
        message: 'channelmsglink parameter is required' 
      });
    }

    const inviteCode = channelmsglink.split('https://whatsapp.com/channel/')[1];
    if (!inviteCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid channel link format' 
      });
    }

    const parts = inviteCode.split('/');
    const cleanInviteCode = parts[0];
    const messageId = parts[1];

    if (!messageId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message ID not found in URL' 
      });
    }

    const sessions = getAllSessions();
    
    if (sessions.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No active sessions available' 
      });
    }

    const [firstNumber, firstSession] = sessions[0];
    let newsletterId;

    try {
      const metadata = await firstSession.newsletterMetadata('invite', cleanInviteCode);
      newsletterId = metadata.id;
    } catch (metadataError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid newsletter invite code: ' + metadataError.message 
      });
    }

    const results = [];
    for (const [number, session] of sessions) {
      try {
        await session.newsletterMsg(newsletterId, { 
          react: emoji, 
          id: messageId 
        });
        
        results.push({
          number: number.replace(/@s\.whatsapp\.net$/i, ''),
          status: 'success',
          message: `Reacted with ${emoji}`
        });
      } catch (error) {
        results.push({
          number: number.replace(/@s\.whatsapp\.net$/i, ''),
          status: 'failed',
          message: error.message
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const successCount = results.filter(r => r.status === 'success').length;

    res.json({
      success: true,
      message: `Reacted with ${successCount}/${sessions.length} sessions`,
      summary: {
        totalSessions: sessions.length,
        successful: successCount,
        failed: sessions.length - successCount
      },
      details: results
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', async () => {
    // Base local URL inside the container / server
    const host = process.env.HOST || '0.0.0.0';
    const baseUrl = `http://${host}:${PORT}`;

    // External URL / domain (Render-style or custom)
    const externalUrl = process.env.RENDER_EXTERNAL_URL
      || process.env.APP_DOMAIN
      || process.env.DOMAIN
      || '';

    console.log('==========================================');
    console.log(' HISOKA-MD WhatsApp Pairing Service READY');
    console.log('==========================================');
    console.log(` Local URL    : ${baseUrl}`);

    if (externalUrl) {
      console.log(` Public URL   : ${externalUrl}`);
    } else {
      console.log(' Public URL   : (configure APP_DOMAIN or RENDER_EXTERNAL_URL to show your domain here)');
    }

    console.log(' Admin auth   : configured from environment / setting.js');
    console.log(' Max sessions : 100 total (VIP have priority near the limit)');
    console.log('------------------------------------------');

    console.log('⏱️ Starting auto-load in 10 seconds...');
    setTimeout(async () => {
      try {
        await autoLoadPairs({ concurrent: false, batchSize: 5 });
      } catch (err) {
        console.error('Auto-load failed:', err);
      }
    }, 10000);
});
