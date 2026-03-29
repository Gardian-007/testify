import moment from "moment-timezone";

const CONNECTION = "pairing"; // qr atau pairing
const OWNER_NAME = "Roseee";
const NOMOR_BOT = "6285646476989"; // 628xx nomor wa
const DESTINATION = "group"; // group , private, both
const APIKEY = "19cf3ba8c7a0b6923de2c8f7"; // apikey dari autoresbot.com (paket apikey)
const RATE_LIMIT = 3000; // 3 detik/chat
const SIMILARITY = true; // Pencarian kemiripan command (true, false)
const MODE = "production"; // [production, development] (jangan di ubah kecuali anda developer)
const VERSION = global.version; // don't edit

const EMAIL = "@gmail.com";
const REGION = "Indonesia";
const WEBSITE = "";
const DATA_OWNER = [""];

// Konfiqurasi Chat
const ANTI_CALL = true; // jika true (setiap yang nelpon pribadi akan di block)
const AUTO_READ = false; // jika true (setiap chat akan di baca/centang 2 biru)
const AUTO_BACKUP = false; // jika true (setiap restart server, data backup di kirimkan ke wa owner);
const MIDNIGHT_RESTART = true; // Restart setiap jam 12 malam
const PRESENCE_UPDATE = ""; // unavailable, available, composing, recording, paused
const TYPE_WELCOME = "2"; // 1, 2, 3, 4, 5, 6 text dan random
const BG_WELCOME2 = "https://api.autoresbot.com/api/maker/bg-default";

// antibadword di grub
const BADWORD_WARNING = 3; // Jumlah maksimum peringatan sebelum tindakan diambil
const BADWORD_ACTION = "both"; // tindakan setelah warning terpenuhi (kick, block, both)

// antispam di grub
const SPAM_LIMIT = 3; // Batas pesan dianggap spam
const SPAM_COULDOWN = 10; // Waktu cooldown dalam detik (10 detik)
const SPAM_WARNING = 3; // Jumlah maksimum peringatan sebelum tindakan diambil
const SPAM_ACTION = "both"; // tindakan setelah warning terpenuhi (kick, block, both)

// More
const STATUS_SCHEDULED = true;

const config = {
  APIKEY,
  phone_number_bot: NOMOR_BOT,
  type_connection: CONNECTION,
  bot_destination: DESTINATION,
  owner_name: OWNER_NAME,
  owner_number: DATA_OWNER,
  owner_website: WEBSITE,
  owner_email: EMAIL,
  region: REGION,
  version: VERSION,
  rate_limit: RATE_LIMIT,
  status_prefix: true, // wajib prefix : atau false tanpa prefix
  prefix: [".", "!", "#"],
  sticker_packname: OWNER_NAME,
  sticker_author: `\n\n\n\n\n\n\n\n\n\n\n\n\n\n
  Rose Multidevice\n\nKartlzy Store - 6283821177025\n\n
  ${moment.tz("Asia/Jakarta").format("DD/MM/YY")}`,
  mode: MODE,
  commandSimilarity: SIMILARITY,
  anticall: ANTI_CALL,
  autoread: AUTO_READ,
  autobackup: AUTO_BACKUP,
  PresenceUpdate: PRESENCE_UPDATE,
  typewelcome: TYPE_WELCOME,
  bgwelcome2: BG_WELCOME2,
  midnight_restart: MIDNIGHT_RESTART,
  scheduled: STATUS_SCHEDULED,
  SPAM: {
    limit: SPAM_LIMIT,
    couldown: SPAM_COULDOWN,
    warning: SPAM_WARNING,
    action: SPAM_ACTION,
  },
  BADWORD: {
    warning: BADWORD_WARNING,
    action: BADWORD_ACTION,
  },
};

export default config;
