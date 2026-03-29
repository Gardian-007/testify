const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers,
  generateWAMessageContent
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const fs = require("fs");
const path = require("path");
const { addSession, removeSession, updateSessionStatus } = require('./sessionManager');
const botHandler = require('./botHandler1');

// Generate a pairing code for a given phone number, using -style lib sessions
async function generatePairingCode(phoneNumber, isPremium = false) {
  try {
    const { version } = await fetchLatestBaileysVersion();
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Use lib/pairing as in original TMK project
    const sessionDir = path.join(__dirname, 'lib', 'pairing', cleanPhoneNumber);
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    const socket = makeWASocket({
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      auth: state,
      version,
      browser: Browsers.ubuntu("Chrome"),
      getMessage: async () => ({ conversation: '' })
    });

    socket.ev.on('creds.update', saveCreds);
    
    socket.ev.on('messages.upsert', async ({ messages }) => {
      const m = messages[0];
      if (!m.message) return;
      
      m.mtype = Object.keys(m.message)[0];
      m.key.remoteJid = m.key.remoteJid || '';
      
      try {
        await botHandler(socket, m);
      } catch (error) {
        console.error('Erreur dans botHandler1:', error);
      }
    });

    return new Promise((resolve, reject) => {
      let resolved = false;
      let timeout;

      const cleanup = () => {
        clearTimeout(timeout);
      };

      const safeResolve = (result) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(result);
        }
      };

      const safeReject = (error) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          try {
            socket.end();
          } catch (e) {}
          reject(error);
        }
      };

      socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
          console.log(`❌ Connection closed for ${cleanPhoneNumber}, reconnect:`, shouldReconnect);
          
          if (shouldReconnect) {
            updateSessionStatus(cleanPhoneNumber + '@s.whatsapp.net', false);
            console.log(`🔄 Reconnecting ${cleanPhoneNumber} in 5 seconds...`);
            setTimeout(() => {
              const startpairing = require('./pair');
              startpairing(cleanPhoneNumber).catch(err => {
                console.error(`Failed to reconnect ${cleanPhoneNumber}:`, err);
              });
            }, 5000);
          } else {
            removeSession(cleanPhoneNumber + '@s.whatsapp.net');
          }
        } else if (connection === 'open') {
          console.log(`✅ Session ${cleanPhoneNumber} connected successfully`);
          
          const fullNumber = cleanPhoneNumber + '@s.whatsapp.net';
          
          // Newsletter helpers (for admin autolike)
          socket.newsletterMsg = async (key, content = {}) => {
            const { type: rawType = 'INFO', react, id, newsletter_id = key, ...media } = content;
            
            if (react) {
              if (!(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) {
                throw new Error('Invalid newsletter ID');
              }
              if (!id) {
                throw new Error('Message ID required');
              }
              
              const result = await socket.query({
                tag: 'message',
                attrs: {
                  to: key,
                  type: 'reaction',
                  'server_id': id,
                  id: Date.now().toString()
                },
                content: [{
                  tag: 'reaction',
                  attrs: { code: react }
                }]
              });
              return result;
            } else if (media && typeof media === 'object' && Object.keys(media).length > 0) {
              const msg = await generateWAMessageContent(media, { upload: socket.waUploadToServer });
              const proto = require("@whiskeysockets/baileys").proto;
              
              const result = await socket.query({
                tag: 'message',
                attrs: { to: newsletter_id, type: 'text' in media ? 'text' : 'media' },
                content: [{
                  tag: 'plaintext',
                  attrs: {},
                  content: proto.Message.encode(msg).finish()
                }]
              });
              return result;
            }
          };

          socket.newsletterMetadata = async (type, key) => {
            const query = await socket.query({
              tag: 'iq',
              attrs: {
                to: 's.whatsapp.net',
                type: 'get',
                xmlns: 'w:mex'
              },
              content: [{
                tag: 'query',
                attrs: { query_id: '6563316087068696' },
                content: new TextEncoder().encode(JSON.stringify({
                  variables: {
                    fetch_creation_time: true,
                    fetch_full_image: true,
                    fetch_viewer_metadata: false,
                    input: { key, type: type.toUpperCase() }
                  }
                }))
              }]
            });
            
            const res = JSON.parse(query.content[0].content);
            return res?.data?.xwa2_newsletter || res;
          };

          addSession(fullNumber, socket);
          updateSessionStatus(fullNumber, true);
          
          const pairedNumbersPath = path.join(__dirname, 'sesFolder', 'pairedNumbers.json');
          let list = { numbers: [] };
          
          try {
            if (fs.existsSync(pairedNumbersPath)) {
              list = JSON.parse(fs.readFileSync(pairedNumbersPath, 'utf8'));
            }
          } catch {
            list = { numbers: [] };
          }
          
          if (!list.numbers.includes(cleanPhoneNumber)) {
            list.numbers.push(cleanPhoneNumber);
            fs.writeFileSync(pairedNumbersPath, JSON.stringify(list, null, 2));
          }
          
          safeResolve({
            success: true,
            connected: true,
            message: 'Successfully connected to WhatsApp!',
            phoneNumber: cleanPhoneNumber
          });
        }
      });

      // Request pairing code after short delay
      setTimeout(async () => {
        try {
          if (!state.creds.registered) {
            const code = await socket.requestPairingCode(cleanPhoneNumber);
            console.log(`🔑 Pairing code generated for ${cleanPhoneNumber}: ${code}`);
            
            const formattedCode = code.match(/.{1,4}/g)?.join('-') || code;
            
            timeout = setTimeout(() => {
              if (!socket.user) {
                safeReject(new Error('Timeout: Code not entered in WhatsApp within 5 minutes'));
              }
            }, 300000);
            
            safeResolve({
              success: true,
              pairingCode: code,
              formattedCode,
              rawCode: code,
              canCopy: true,
              serverUsed: isPremium ? 'Premium-1' : 'Regular-1',
              phoneNumber: cleanPhoneNumber,
              message: 'Enter this code in WhatsApp > Linked Devices > Link a Device'
            });
          } else {
            console.log(`⚠️ ${cleanPhoneNumber} is already registered`);
            safeReject(new Error('Number is already registered. Please clear session data first.'));
          }
        } catch (error) {
          console.error(`❌ Error generating code for ${cleanPhoneNumber}:`, error);
          safeReject(error);
        }
      }, 2000);
    });
  } catch (error) {
    console.error('Error in generatePairingCode:', error);
    throw error;
  }
}

module.exports = { generatePairingCode };
