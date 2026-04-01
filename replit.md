# TMK Pairing Server

## Project Overview
A Node.js-based WhatsApp pairing and automation service. It provides a web interface for users to pair their WhatsApp accounts using a pairing code (via the `@whiskeysockets/baileys` library) and then performs automated actions like reacting to newsletter posts ("autolike").

## Architecture
- **Backend**: Express.js server (`site.js`) handling web UI and API endpoints
- **WhatsApp Integration**: Baileys library for WhatsApp multi-device protocol
- **Session Management**: In-memory session tracking (`sessionManager.js`) with file persistence in `richstore/pairing/`
- **Frontend**: Static HTML files in `frontend/` directory (login, dashboard, admin panel)

## Key Files
- `site.js` - Main entry point; Express server for the web UI and API (runs on port 5000)
- `pair.js` - Core WhatsApp connection logic using Baileys
- `autoload.js` - Automatically restores WhatsApp sessions from `richstore/pairing/` on startup
- `sessionManager.js` - In-memory tracking of active WhatsApp sessions
- `case.js` - WhatsApp message handling logic
- `config.js` - Bot configuration settings
- `settings.json` - Operational settings for bot logic
- `ecosystem.config.js` - PM2 process management configuration (used for production reference)

## Data Storage
- `richstore/users.json` - Registered user accounts and their pairings
- `richstore/pairing/` - WhatsApp session credentials per paired number
- `sesFolder/pairedNumbers.json` - Tracked paired numbers

## Port Configuration
- Server runs on port **5000** (configurable via `PORT` environment variable)
- Host: `0.0.0.0` (allows external access)

## Running the App
```bash
node site.js
```

## Deployment
- Deployment target: `vm` (always running — required for persistent WhatsApp sessions)
- Run command: `node site.js`
