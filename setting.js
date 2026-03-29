// Bridge file to expose global configuration for botHandler1
// Loads TMK config (owner, mess, botname, etc.) and ensures common globals exist
require('./config');

// Ensure some aliases expected by botHandler1 / Hisoka-style code
if (!global.prefix) {
  global.prefix = global.xprefix || '.';
}

// Basic safety defaults
if (!global.owner) {
  global.owner = ['2250104610403'];
}
if (!Array.isArray(global.owner)) {
  global.owner = [String(global.owner)];
}

if (!global.mess) {
  global.mess = {
    success: '[✓] Done.',
    admin: '🚨 Admin only.',
    botAdmin: '[×] Make me admin first.',
    OnlyOwner: '👑 Owner only.',
    OnlyGrup: '👥 Group only.',
    private: '📩 Private chat only.',
    wait: '⏳ Processing...',
    error: '⚠️ Error occurred.'
  };
}

// Export global so require('./setting') works as in Hisoka-MD
module.exports = global;
