
require('./setting');
const { getBuffer, fetchJson, getGroupAdmins, runtime, sleep, isUrl } = require('./library/lib/myfunc');
const fs = require('fs');
const path = require('path');

let autoreadStatus = global.autoreadstatus || false;
let antiviewonce = global.antiviewonce || false;
let autoread = global.autoread || false;

module.exports = async (sock, m) => {
  try {
    const from = m.key.remoteJid;
    const sender = m.key.fromMe ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : m.key.participant || m.key.remoteJid;
    const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'; // LIGNE CORRIGÉE
    
    const body = m.mtype === 'conversation' ? m.message.conversation :
                 m.mtype === 'imageMessage' ? m.message.imageMessage.caption :
                 m.mtype === 'videoMessage' ? m.message.videoMessage.caption :
                 m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text : '';

    const isGroup = from.endsWith('@g.us');
    const groupMetadata = isGroup ? await sock.groupMetadata(from).catch(e => null) : null;
    const participants = isGroup && groupMetadata ? groupMetadata.participants : [];
    const groupAdmins = isGroup ? getGroupAdmins(participants) : [];
    const isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    const mess = global.mess
    const isOwner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender);
///////////////////////

    
    if (global.autotyping) {
  if (command) { isOwner.readMessages([m.key]) }
  sock.sendPresenceUpdate('composing', from)
}
if (global.autoread) {
  sock.readMessages([m.key])
};

function getRandomFile(ext) {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
}
    ////////////////

    const prefixRegex = new RegExp(`^[${global.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : global.prefix;
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const text = args.join(' ');
    const quoted = m.quoted ? m.quoted : m;

    const reply = (teks) => {
      sock.sendMessage(from, { text: teks }, { quoted: m });
    };

    if (autoreadStatus && from.endsWith('@broadcast')) {
      await sock.readMessages([m.key]);
      
    }

    if (autoread && m.message && !m.key.fromMe) {
      await sock.readMessages([m.key]);
    }

    if (antiviewonce && m.message) {
      if (m.message.viewOnceMessageV2 || m.message.viewOnceMessage) {
        const viewOnceMessage = m.message.viewOnceMessageV2?.message || m.message.viewOnceMessage?.message;
        
        if (viewOnceMessage) {
          const messageType = Object.keys(viewOnceMessage)[0];
          const caption = viewOnceMessage[messageType]?.caption || 'View Once Message';
          
          try {
            await sock.sendMessage(from, {
              [messageType]: viewOnceMessage[messageType],
              caption: `🔓 *Anti View Once*\n\n${caption}`
            }, { quoted: m });
            
            console.log(`👁️ View Once message sauvegardé`);
          } catch (error) {
            console.error('Erreur anti view once:', error);
          }
        }
      }
    }

    if (!isCmd) return;

    console.log(`📩 Commande: ${command} de ${m.pushName} dans ${isGroup ? groupMetadata.subject : 'Chat privé'}`);
    
    
    // Réponse à "maria" sans préfixe
    if (budy && budy.toLowerCase() === "maria" && !isCmd) {
      let text = '> _Maria... loves me but I love her ... she is my all .. i am gratfull being with her_ .... ';
      m.reply(text);
      
      await sock.sendMessage(m.chat, {
        text: text,
        contextInfo: {
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363400575205721@newsletter',
            serverMessageId: 2,
            newsletterName: `${global.botname}`
          },
          externalAdReply: {
            showAdAttribution: false,
            title: `${global.botname} - BLOOMING LOVE`,
            body: `confession ... I (Raven) know`,
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailUrl: `https://img1.pixhost.to/images/8395/637002757_jarroffc.jpg`,
            sourceUrl: `https://github.com/ravenn-h`
          }
        }
      }, { quoted: m });
    }
    
    //━━━━━━━━━━━━━━━━━━━━━━━━//
    // ATTENTION : Ne pas modifier cette section
    switch (command) {
      
      case "menu":
{
  // Listes de menus séparées pour une meilleure organisation
  const downloaderMenu = require("./library/menulist/downloadermenu")
  const groupMenu = require("./library/menulist/groupmenu")
  const ownerMenu = require("./library/menulist/ownermenu")
  
  
  const subcmd = args[0] ? args[0].toLowerCase() : ""
  
  const infoBot = `
_👋hi , ${pushname}_
_Je suis Vrush-maria qui peut t'aider à rechercher, jouer ou télécharger. Je peux aussi être un compagnon de chat, un confident._

╭─ ⌬ _Infos Bot_
│ • _nom_ : *${botname}*
│ • _propriétaire_ : *${ownername}*
│ • _version_ : *${botver}*
│ • _type_ : *${typebot}*
│ • _commandes_ : *${totalcmd()}*
│ • _préfixe_ : *${global.prefix}*
╰─────────────

`.trim()
  
  let menu = ""
  
  if (subcmd === "owner" || subcmd === "menu owner") menu = ownerMenu
  else if (subcmd === "downloader" || subcmd === "menu downloader") menu = downloaderMenu
  else if (subcmd === "group" || subcmd === "menu group") menu = groupMenu
  
  
  
  else if (subcmd === "allmenu") {
    menu = [  ownerMenu, downloaderMenu, groupMenu,].join(
      "\n",
    )
  } else {
    menu = `

📂 *_MENU PRINCIPAL_* 📂

┌──────────────────┐
│ 📋 *_TOUS LES MENUS_* │
└──────────────────┘

▢ _${global.prefix}owner_ - 👤 _Owner Menu_""
▢ _${global.prefix}group_ 
▢ _${global.prefix}downloader

`.trim()
  }
  const fullMenu = `${infoBot}\n${menu}`

          await sock.sendMessage(
            m.chat,
            {
              text: fullMenu,
              contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [sender],
                externalAdReply: {
                  title: "𝚅𝚛𝚞𝚜𝚑 𝙼𝚊𝚛𝚒𝚊 ",
                  body: "𝕽𝖆𝖛𝖊𝖓-𝓗𝓲𝓼𝓸𝓴𝓪",
                  thumbnail: fs.readFileSync("./media/thumb.png"),
                  sourceUrl: wagc,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m },
          )
        }
        break

      //━━━━━━━━━━━━━━━━━━━━━━━━//
case "play": 
      case "ytmp3": 
      case "ytaudio": {
        if (!text) {
          const helpMsg = `
┌──────────────────┐
│ 🎵 **YOUTUBE AUDIO** │
└──────────────────┘

**Utilisation:**
■ ${prefix + command} URL YouTube
■ ${prefix + command} nom de la chanson

**Exemples:**
■ ${prefix + command} https://youtu.be/xxxx
■ ${prefix + command} Imagine Dragons Thunder

┌──────────────────┐
│ ⚡ **${botname}** │
└──────────────────┘`;
          return reply(helpMsg);
        }
        
        try {
          const yts = require("yt-search");
          let search = await yts(text);
          
          if (!search.all[0]) {
            return reply(`❌ Aucun résultat trouvé pour: ${text}`);
          }
          
          let video = search.all[0];
          
          let caption = `
┌──────────────────┐
│ 🎵 **RÉSULTAT TROUVÉ** │
└──────────────────┘

■ **Titre:** ${video.title}
■ **Durée:** ${video.timestamp}
■ **Vues:** ${video.views}
■ **Chaîne:** ${video.author.name}
■ **URL:** ${video.url}

⏳ _Téléchargement audio en cours..._

┌──────────────────┐
│ ⚡ **${botname}** │
└──────────────────┘`;
          
          await sock.sendMessage(m.chat, {
            image: { url: video.thumbnail },
            caption: caption
          }, { quoted: m });
          
          // Try to get audio URL using existing API
          const fg = require("api-dylux");
          const result = await fg.yta(video.url);
          
          if (result && result.dl_url) {
            await sock.sendMessage(m.chat, {
              audio: { url: result.dl_url },
              mimetype: 'audio/mpeg',
              fileName: `${video.title}.mp3`,
              ptt: false
            }, { quoted: m });
          } else {
            reply("❌ Erreur lors du téléchargement audio. Réessayez plus tard.");
          }
          
        } catch (error) {
          console.error("YouTube audio download error:", error);
          reply("❌ Erreur lors du téléchargement. Réessayez plus tard.");
        }
      }
      break;


 
 // ===== MEDIA CONVERSIONS =====
      case "tourl": { 
        if (!/image/.test(mime)) return m.reply("Send/reply the image!");
        try {
          let mediaPath = await sock.downloadAndSaveMediaMessage(quoted);
          const service = new ImageUploadService('pixhost.to');
          let buffer = fs.readFileSync(mediaPath);
          let { directLink } = await service.uploadFromBinary(buffer, 'jarroffc.png');
          await sock.sendMessage(m.chat, { text: directLink }, { quoted: m });
          await fs.unlinkSync(mediaPath);
        } catch (err) {
          console.error("Tourl Error:", err);
          m.reply("An error occurred while converting media to URL.");
        }
      }
      break;

 // ===== READ VIEW ONCE =====
 case "rvo": case "readvo": case "readviewonce": case "readviewoncemessage": case "vv": {
   const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
   
   const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
   
   const mediaType = quoted?.imageMessage ? "image" :
     quoted?.videoMessage ? "video" :
     null;
   
   if (!mediaType) {
     return sock.sendMessage(m.chat, {
       text: "❌ Please *reply to a view once image or short video* to retrieve."
     }, { quoted: m });
   }
   
   try {
     const stream = await downloadContentFromMessage(
       mediaType === "image" ? quoted.imageMessage : quoted.videoMessage,
       mediaType
     );
     
     let buffer = Buffer.from([]);
     for await (const chunk of stream) {
       buffer = Buffer.concat([buffer, chunk]);
     }
     
     await sock.sendMessage(m.chat, {
       [mediaType]: buffer,
       caption: `💥 Here's your removed view-once ${mediaType}`
     }, {
       quoted: {
         key: {
           fromMe: false,
           participant: "0@s.whatsapp.net",
           remoteJid: m.chat
         },
         message: {
           conversation: "🤺 VIEW ONCE FETCHED"
         }
       }
     });
     
   } catch (err) {
     console.error("❌ View once retrieval error:", err);
     await sock.sendMessage(m.chat, {
       text: "⚠️ Failed to retrieve view once."
     }, { quoted: m });
   }
 }
 break;
 
    case 'toimg': {
        if (!/webp/.test(mime)) return m.reply("🔖 Répondez à un sticker avec cette commande !");
        
        try {
          m.reply("🔄 Conversion en image...");
          let media = await sock.downloadAndSaveMediaMessage(quoted);
          
          const outputBuffer = await sharp(media)
            .png()
            .toBuffer();
          
          await sock.sendMessage(m.chat, { 
            image: outputBuffer,
            caption: "✅ Sticker converti en image !"
          }, { quoted: m });
          
          try {
            if (fs.existsSync(media)) {
              fs.unlinkSync(media);
            }
          } catch (cleanupError) {
            console.error("Cleanup error:", cleanupError);
          }
          
        } catch (error) {
          console.error("ToImg Error:", error);
          m.reply("❌ Impossible de convertir ce sticker en image. Assurez-vous de répondre à un sticker valide.");
        }
      }
      break;

  case 'qc': {
        if (!q) return m.reply(`Send command with text. ${m.prefix + command} ${pushname}`);
        let obj = {
          type: 'quote',
          format: 'png',
          backgroundColor: '#ffffff',
          width: 512,
          height: 768,
          scale: 2,
          messages: [
            {
              entities: [],
              avatar: true,
              from: {
                id: 1,
                name: `${pushname}`,
                photo: { 
                  url: await sock.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'),
                }
              },
              text: `${q}`,
              replyMessage: {},
            },
          ],
        };
        let response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let buffer = Buffer.from(response.data.result.image, 'base64');
        sock.sendImageAsSticker(m.chat, buffer, m, { packname: `${global.packname}`, author: `${global.author}` });
      }
      break;
      
      // ===== STATUS MANAGEMENT =====
      case 'setstatus':
      case 'status': {
        if (!isOwner) return m.reply("🔒 Cette commande est réservée au propriétaire.");
        
        if (!text) {
          return m.reply(`*🎭 Gestion du Statut WhatsApp:*\n\n*Commandes disponibles:*\n• .status online - Toujours en ligne\n• .status typing - Toujours en train d'écrire\n• .status recording - Toujours en enregistrement\n• .status pause - En pause\n• .status offline - Hors ligne permanent\n• .status auto - Basculer automatique\n• .status stop - Arrêter le statut continu\n\n*Status actuel:* ${global.continuousPresence ? global.currentPresence : "Aucun"}`);
        }
        
        const action = text.toLowerCase().trim();
        
        try {
          switch (action) {
            case 'online':
              global.currentPresence = 'available';
              global.continuousPresence = true;
              await sock.sendPresenceUpdate('available', m.chat);
              m.reply("✅ *Statut Permanent:* En ligne\n\n📡 Le bot restera toujours en ligne");
              break;
            
            case 'typing':
              global.currentPresence = 'composing';
              global.continuousPresence = true;
              global.presenceInterval = setInterval(async () => {
                if (global.continuousPresence && global.currentPresence === 'composing') {
                  try {
                    await sock.sendPresenceUpdate('composing', m.chat);
                  } catch (e) {}
                }
              }, 10000);
              await sock.sendPresenceUpdate('composing', m.chat);
              m.reply("✅ *Statut Permanent:* En train d'écrire...\n\n⌨️ Le bot apparaîtra toujours en train d'écrire");
              break;
            
            case 'recording':
              global.currentPresence = 'recording';
              global.continuousPresence = true;
              global.presenceInterval = setInterval(async () => {
                if (global.continuousPresence && global.currentPresence === 'recording') {
                  try {
                    await sock.sendPresenceUpdate('recording', m.chat);
                  } catch (e) {}
                }
              }, 10000);
              await sock.sendPresenceUpdate('recording', m.chat);
              m.reply("✅ *Statut Permanent:* Enregistrement audio...\n\n🎤 Le bot apparaîtra toujours en enregistrement");
              break;
            
            case 'stop':
              global.continuousPresence = false;
              global.currentPresence = null;
              if (global.presenceInterval) {
                clearInterval(global.presenceInterval);
                global.presenceInterval = null;
              }
              await sock.sendPresenceUpdate('available', m.chat);
              m.reply("🛑 *Statut continu arrêté*\n\nRetour au statut normal");
              break;
            
            default:
              m.reply("❌ Option invalide.\n\nUtilisez: online, typing, recording, stop");
          }
        } catch (error) {
          console.error("Status Error:", error);
          m.reply("❌ Erreur lors de la mise à jour du statut");
        }
      }
      break

      // ===== MEDIA CONVERSIONS EXTRA =====
      case 'tovn': {
        if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Reply media with caption ${m.prefix + command}`);
        if (!quoted) return m.reply(`Reply video/vn with caption ${m.prefix + command}`);
        
        try {
          let media = await quoted.download();
          
          const tempFile = `./librairy/database/Sampah/temp_${Date.now()}.mp3`;
          
          if (!fs.existsSync('./librairy/database/Sampah')) {
            fs.mkdirSync('./librairy/database/Sampah', { recursive: true });
          }
          
          fs.writeFileSync(tempFile, media);
          
          const outputFile = `./librairy/database/Sampah/output_${Date.now()}.mp3`;
          
          exec(`ffmpeg -i ${tempFile} -vn -ab 128k -ar 44100 -f mp3 ${outputFile}`, async (err) => {
            if (err) {
              console.error('FFmpeg error:', err);
              return m.reply("Erreur lors de la conversion en note vocale.");
            }
            
            try {
              const audioBuffer = fs.readFileSync(outputFile);
              await sock.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
              
              fs.unlinkSync(tempFile);
              fs.unlinkSync(outputFile);
            } catch (sendError) {
              console.error('Send error:', sendError);
              m.reply("Erreur lors de l'envoi de la note vocale.");
            }
          });
        } catch (error) {
          console.error('Tovn error:', error);
          m.reply("Erreur lors de la conversion en note vocale.");
        }
      }
      break;
            // ===== ANIME WALLPAPERS =====
      case 'akira': case 'akiyama': case 'anna': case 'asuna': case 'ayuzawa': case 'boruto': case 'chiho': case 'chitoge': case 'deidara': case 'erza': case 'elaina': case 'eba': case 'emilia': case 'hestia': case 'hinata': case 'inori': case 'isuzu': case 'itachi': case 'itori': case 'kaga': case 'kagura': case 'kaori': case 'keneki': case 'kotori': case 'kurumi': case 'madara': case 'mikasa': case 'miku': case 'minato': case 'naruto': case 'nezuko': case 'sagiri': case 'sasuke': case 'sakura': {
        try {
          const response = await fetch(`https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/anime-${command}.json`);
          const data = await response.json();
          const randomImage = data[Math.floor(data.length * Math.random())];
          
          await sock.sendMessage(m.chat, {
            image: { url: randomImage },
            caption: `🎌 *Wallpaper ${command.toUpperCase()}*\n\n📱 *Character:* ${command}\n🎨 *Type:* Anime Wallpaper\n⚡ *Bot:* ${global.botname}`
          }, { quoted: m });
        } catch (error) {
          console.error(`Error fetching ${command} wallpaper:`, error);
          m.reply(`❌ Erreur lors du chargement du wallpaper ${command}`);
        }
      }
      break
      
      // ===== COUPLE PROFILE PICTURES =====
      case 'couplepp': case 'ppcouple': {
        try {
          const response = await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json');
          const data = await response.json();
          const randomCouple = data[Math.floor(Math.random() * data.length)];
          
          const maleBuffer = await (await fetch(randomCouple.cowo)).buffer();
          await sock.sendMessage(m.chat, {
            image: maleBuffer,
            caption: '♂️ *Profile Picture - Male*'
          }, { quoted: m });
          
          const femaleBuffer = await (await fetch(randomCouple.cewe)).buffer();
          await sock.sendMessage(m.chat, {
            image: femaleBuffer,
            caption: '♀️ *Profile Picture - Female*'
          }, { quoted: m });
          
        } catch (error) {
          console.error('Error fetching couple profile pictures:', error);
          m.reply('❌ Erreur lors du chargement des photos de profil de couple');
        }
      }
      break
      //━━━━━━━━━━━━━━━━━━━━━━━━//
// Section Outils Développeur/Propriétaire
case "self":
{
  if (!isOwner) return reply(mess.OnlyOwner)
  sock.public = false
  reply("✅ Succès changement en Mode Privé")
}
break

case "public":
{
  if (!isOwner) return reply(mess.OnlyOwner)
  sock.public = true
  reply("✅ Succès changement en Mode Public")
}
break

case "restart":
if (!isOwner) return reply(mess.OnlyOwner)
reply(`🔄 Redémarrage réussi`)
await sleep(3000)
process.exit()
break
            //━━━━━━━━━━━━━━━━━━━━━━━━//
      // Section Gestion de Groupe

      case "welcome":
      case "left":
        {
          if (!m.isGroup) return reply("Spécialement dans le groupe")
          if (!isAdmins && !isOwner) return reply(mess.OnlyOwner)
          if (args.length < 1) return reply("Exemple : Welcome Activer/Désactiver")
          if (args[0] === "activer") {
            welcome = true
            reply(`✅ ${command} Déjà activé`)
          } else if (args[0] === "désactiver") {
            welcome = false
            reply(`✅ ${command} Déjà désactivé`)
          }
        }
        break

      case "groupevent":
        {
          if (!m.isGroup) return reply("Seulement en groupe")
          if (!isAdmins && !isOwner) return reply(mess.OnlyOwner)
          if (args.length < 1) return reply("Activer / Désactiver ?")
          if (args[0] === "activer") {
            groupevent = true
            reply(`✅ ${command} Déjà activé`)
          } else if (args[0] === "désactiver") {
            groupevent = false
            reply(`✅ ${command} Déjà désactivé`)
          }
        }
        break

      case "add":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!text && !m.quoted) {
            reply(`_Exemple :_\n\n ${prefix + command} 62xxx`)
          } else {
            const numbersOnly = text ? text.replace(/\D/g, "") + "@s.whatsapp.net" : m.quoted?.sender
            try {
              await sock.groupParticipantsUpdate(m.chat, [numbersOnly], "add").then(async (res) => {
                for (const i of res) {
                  const invv = await sock.groupInviteCode(m.chat)
                  if (i.status == 408) return reply(`_[ Erreur ]_ L'utilisateur vient de quitter le groupe`)
                  if (i.status == 401) return reply(`_[ Erreur ]_ Bot bloqué par l'utilisateur`)
                  if (i.status == 409) return reply(`_[ Rapport ]_ L'utilisateur est déjà dans le groupe`)
                  if (i.status == 500) return reply(`_[ Invalide ]_ Le groupe est plein`)
                  if (i.status == 403) {
                    await sock.sendMessage(
                      m.chat,
                      {
                        text: `@${numbersOnly.split("@")[0]} La cible ne peut pas être ajoutée car le compte est privé, une invitation sera envoyée en chat privé`,
                        mentions: [numbersOnly],
                      },
                      { quoted: m },
                    )
                    await sock.sendMessage(
                      `${numbersOnly ? numbersOnly : creator}`,
                      {
                        text: `${"https://chat.whatsapp.com/" + invv}\n━━━━━━━━━━━━━━━━━━━━━\n\nAdmin : wa.me/${m.sender}\n T'as invité dans ce groupe`,
                        detectLink: true,
                        mentions: [numbersOnly],
                      },
                      { quoted: m },
                    ).catch((err) => reply("Échec envoi invitation ! 😔"))
                  } else {
                    reply(mess.succes)
                  }
                }
              })
            } catch (e) {
              reply("Échec ajout utilisateur, quelque chose ne va pas ! 😢")
            }
          }
        }
        break

      case "kick":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isOwner && !isAdmins) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!m.quoted && !m.mentionedJid[0] && isNaN(Number.parseInt(args[0]))) {
            return reply(`*Exemple :* ${prefix + command} cible`)
          }
          const users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          if (owner.includes(users.replace("@s.whatsapp.net", ""))) {
            return reply("Mon propriétaire, ne peut pas l'exclure")
          }
          try {
            await sock.groupParticipantsUpdate(m.chat, [users], "remove")
            reply(mess.succes)
          } catch (err) {
            console.error(err)
            reply(mess.error)
          }
        }
        break

      case "promote":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isOwner && !isAdmins) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!m.quoted && !m.mentionedJid[0] && isNaN(Number.parseInt(args[0])))
            return reply(`*Exemple :* ${prefix + command} cible`)
          const users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`*Exemple :* ${prefix + command} cible`)
          await sock.groupParticipantsUpdate(m.chat, [users], "promote")
            .then((res) => reply(mess.succes))
            .catch((err) => reply(mess.error))
        }
        break

      case "demote":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isOwner && !isAdmins) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!m.quoted && !m.mentionedJid[0] && isNaN(Number.parseInt(args[0])))
            return reply(`*Exemple :* ${prefix + command} cible`)
          const users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
          if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`*Exemple :* ${prefix + command} cible`)
          await sock.groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => reply(mess.succes))
            .catch((err) => reply(mess.error))
        }
        break

      case "revoke":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          await sock.groupRevokeInvite(m.chat)
            .then((res) => {
              reply(mess.succes)
            })
            .catch(() => reply(mess.error))
        }
        break

      case "hidetag":
      case "h":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          sock.sendMessage(m.chat, { text: q ? q : "", mentions: participants.map((a) => a.id) }, { quoted: m })
        }
        break

      case "tagall":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          let teks = `╚»˙·٠•●「 *Mention Tous* 」●•٠·˙«╝\n\n`
          for (const mem of participants) {
            teks += `🔸 @${mem.id.split("@")[0]}\n`
          }
          teks += `\n⏰ *${hariini}*`
          sock.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) }, { quoted: m })
        }
        break

      case "listonline":
      case "liston":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          const id = args && /\d+-\d+@g.us/.test(args[0]) ? args[0] : m.chat
          const online = [...Object.keys(store.presences[id]), botNumber]
          sock.sendText(
            m.chat,
            "🟢 *Liste En Ligne:*\n\n" + online.map((v) => `🔹 @${v.replace(/@.+/, "")}`).join`\n`,
            m,
            { mentions: online },
          )
        }
        break

      case "linkgc":
      case "linkgroup":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isBotAdmins) return reply(mess.botAdmin)
          const response = await sock.groupInviteCode(m.chat)
          sock.sendText(
            m.chat,
            `🔗 *Lien du Groupe :* ${groupMetadata?.subject || 'Groupe'}\n\nhttps://chat.whatsapp.com/${response}\n\nLe lien du groupe a été envoyé en privé`,
            m,
            { detectLink: true },
          )
          sock.sendText(
            m.sender,
            `🔗 *Lien du Groupe :* ${groupMetadata?.subject || 'Groupe'}\n\nhttps://chat.whatsapp.com/${response}`,
            m,
            { detectLink: true },
          )
        }
        break

      case "resetlinkgc":
      case "resetlinkgroup":
      case "resetlink":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          sock.groupRevokeInvite(m.chat)
          reply("✅ Lien du groupe réinitialisé avec succès")
        }
        break

      case "setppgc":
      case "setppgroup":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!quoted) return reply(`Envoyer/Répondre à une Image avec Caption ${prefix + command}`)
          if (!/image/.test(mime)) return reply(`Envoyer/Répondre à une Image avec Caption ${prefix + command}`)
          if (/webp/.test(mime)) return reply(`Envoyer/Répondre à une Image avec Caption ${prefix + command}`)
          const media = await sock.downloadAndSaveMediaMessage(quoted)
          await sock.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
          reply("✅ Photo de profil du groupe modifiée avec succès")
        }
        break

      case "setnamegc":
      case "setnamegroup":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!text) return reply(`Exemple : ${prefix + command} nom texte`)
          await sock.groupUpdateSubject(m.chat, text)
            .then((res) => reply("✅ Nom du groupe modifié avec succès"))
            .catch((err) => reply(mess.error))
        }
        break

      case "setdescgc":
      case "setdescgroup":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (!text) return reply(`Exemple : ${prefix + command} texte`)
          await sock.groupUpdateDescription(m.chat, text)
            .then((res) => reply("✅ Description du groupe modifiée avec succès"))
            .catch((err) => reply(mess.error))
        }
        break

      case "group":
      case "grup":
        {
          if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isAdmins && !isOwner) return reply(mess.admin)
          if (!isBotAdmins) return reply(mess.botAdmin)
          if (args[0] === "close" || args[0] === "tutup") {
            await sock.groupSettingUpdate(m.chat, "announcement")
              .then((res) => reply(`✅ Groupe fermé avec succès`))
              .catch((err) => reply(mess.error))
          } else if (args[0] === "open" || args[0] === "buka") {
            await sock.groupSettingUpdate(m.chat, "not_announcement")
              .then((res) => reply(`✅ Groupe ouvert avec succès`))
              .catch((err) => reply(mess.error))
          } else {
            reply(`Mode ${command}\n\n*Type :*\n1. open\n2. close`)
          }
        }
        break

      //━━━━━━━━━━━━━━━━━━━━━━━━//

      case 'antiviewonce': {
        if (!isOwner) return reply('Seul le propriétaire peut utiliser cette commande.');
        
        antiviewonce = !antiviewonce;
        reply(`[✓]Anti View Once: ${antiviewonce ? 'Activé' : 'Désactivé'}`);
        break;
      }

      case 'autoread': {
        if (!isOwner) return reply('Seul le propriétaire peut utiliser cette commande.');
        
        autoread = !autoread;
        reply(`[✓]Auto Read: ${autoread ? 'Activé' : 'Désactivé'}`);
        break;
      }

      case 'autoreadstatus':
      case 'status': {
        if (!isOwner) return reply('Seul le propriétaire peut utiliser cette commande.');
        
        autoreadStatus = !autoreadStatus;
        reply(`[✓]Auto Read Status: ${autoreadStatus ? 'Activé' : 'Désactivé'}`);
        break;
      }

      case 'ping': {
        const start = Date.now();
        await sock.sendMessage(from, { text: 'Pinging...' }, { quoted: m });
        const end = Date.now();
        reply(`🏓 Pong!\nLatence: ${end - start}ms\nUptime: ${runtime(process.uptime())}`);
        break;
      }

      default:
        break;
    }

  } catch (error) {
    console.error('Erreur dans botHandler:', error);
  }
};

module.exports.autoreadStatus = () => autoreadStatus;
module.exports.antiviewonce = () => antiviewonce;
module.exports.autoread = () => autoread;
