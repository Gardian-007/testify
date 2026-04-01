const chalk = require('chalk')
const fs = require('fs')

global.allxmenu = (prefix, hituet) => {
return`
╭━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ *${botname}* ⚡
┃  ʜᴇʟʟᴏ ${m.pushName}
┃  ʙᴏᴛ : 「${botname}」
┃  sᴛᴀᴛᴜs : active ✅
┃  ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
┃  ᴏᴡɴᴇʀ : ${ownername}
┃  ᴠᴇʀsɪᴏɴ : v.1
╰━━━━━━━━━━━━━━━━━━━╯
@${m?.sender.split('@')[0]}
\`Powered by Vrush-mini | RaVenn-h\`
┈─────────────────
◈━━━ 𝘼𝙇𝙇 𝙈𝙀𝙉𝙐 ━━━◈
│⚡  ${prefix}𝒑𝒐𝒍𝒍
│⚡  ${prefix}𝒃𝒓𝒂𝒕 
│⚡  ${prefix}𝒔𝒕𝒊𝒄𝒌𝒆𝒓
│⚡  ${prefix}𝒕𝒐𝒖𝒓𝒍 
│⚡  ${prefix}𝒗𝒗
│⚡  ${prefix}𝒕𝒂𝒌𝒆/𝒔𝒕𝒆𝒂𝒍 
│⚡  ${prefix}𝒑𝒍𝒂𝒚
│⚡  ${prefix}𝒈𝒊𝒕𝒄𝒍𝒐𝒏𝒆
│⚡  ${prefix}𝒉𝒊𝒅𝒆𝒕𝒂𝒈
│⚡  ${prefix}𝒕𝒂𝒈𝒂𝒍𝒍
│⚡  ${prefix}𝒅𝒆𝒎𝒐𝒕𝒆
│⚡  ${prefix}𝒑𝒓𝒐𝒎𝒐𝒕𝒆
│⚡  ${prefix}𝒎𝒖𝒕𝒆
│⚡  ${prefix}𝒖𝒏𝒎𝒖𝒕𝒆
│⚡  ${prefix}𝒋𝒐𝒊𝒏
│⚡  ${prefix}𝒌𝒊𝒄𝒌
│⚡  ${prefix}𝒂𝒅𝒅
│⚡  ${prefix}𝒍𝒊𝒏𝒌𝒈𝒄
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌 
│⚡  ${prefix}𝒕𝒕𝒔/𝒔𝒂𝒚
│⚡  ${prefix}𝒓𝒆𝒔𝒕𝒂𝒓𝒕 
│⚡  ${prefix}𝒍𝒆𝒇𝒕 
│⚡  ${prefix}𝒅𝒆𝒍𝒆𝒕𝒆 
│⚡  ${prefix}𝒈𝒓𝒐𝒖𝒑𝒋𝒊𝒅
│⚡  ${prefix}𝒋𝒊𝒅
│⚡  ${prefix}𝒕𝒐𝒊𝒎𝒈
│⚡  ${prefix}𝒅𝒆𝒗𝒊𝒄𝒆 
│⚡  ${prefix}𝒉𝒅/𝒓𝒆𝒎𝒊𝒏𝒊
│⚡  ${prefix}𝒊𝒎𝒈
│⚡  ${prefix}𝒔𝒔/𝒔𝒔𝒘𝒆𝒃
│⚡  ${prefix}𝒊𝒎𝒃𝒅
│⚡  ${prefix}𝒂𝒏𝒊𝒎𝒆𝒅𝒍
│⚡  ${prefix}𝒃𝒍𝒐𝒄𝒌 
│⚡  ${prefix}𝒖𝒏𝒃𝒍𝒐𝒄𝒌 
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒊𝒎𝒂𝒈𝒆
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒕𝒆𝒙𝒕
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒗𝒊𝒅
│⚡  ${prefix}𝒃𝒂𝒏
│⚡  ${prefix}𝒖𝒏𝒃𝒂𝒏
│⚡  ${prefix}𝒈𝒆𝒕 𝒄𝒂𝒔𝒆 ✓ 
│⚡  ${prefix}𝒏𝒔𝒇𝒘
│⚡  ${prefix}𝒘𝒂𝒊𝒇𝒖
│⚡  ${prefix}𝒂𝒏𝒊𝒎𝒆𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡  ${prefix}𝒚𝒕𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡  ${prefix}𝒕𝒂𝒈𝒂𝒅𝒎𝒊𝒏 
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒍𝒊𝒄𝒌
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒃𝒊𝒕𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒈𝒍𝒐𝒎𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒂𝒑𝒑𝒚
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒅𝒂𝒏𝒄𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒄𝒓𝒊𝒏𝒈𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒑𝒐𝒌𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒊𝒍𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒖𝒈
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒘𝒍𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒂𝒗𝒂𝒕𝒂𝒓
│⚡ ${prefix} 𝒉𝒂𝒑𝒑𝒚 
│⚡ ${prefix} 𝒅𝒂𝒏𝒄𝒆 
│⚡ ${prefix} 𝒉𝒂𝒏𝒅𝒉𝒐𝒍𝒅 
│⚡ ${prefix} 𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒔𝒍𝒂𝒑 
│⚡ ${prefix} 𝒌𝒊𝒔𝒔
│⚡ ${prefix} 𝒃𝒍𝒖𝒔𝒉
│⚡ ${prefix}𝒃𝒊𝒕𝒆
│⚡ ${prefix}𝒄𝒖𝒅𝒅𝒍𝒆 
│⚡ ${prefix}𝒃𝒖𝒚𝒔𝒄𝒓𝒊𝒑𝒕 
│⚡ ${prefix}𝒃𝒂𝒄𝒌𝒖𝒑 
│⚡ ${prefix}𝒓𝒆𝒑𝒐
│⚡ ${prefix}𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix}𝒔𝒆𝒕𝒃𝒊𝒐
│⚡ ${prefix}𝒆𝒗𝒆𝒓𝒚𝒐𝒏𝒆
│⚡ ${prefix}𝒓𝒆𝒔𝒆𝒕𝒍𝒊𝒏𝒌 
│⚡ ${prefix}𝒕𝒐𝒕𝒂𝒈
│⚡ ${prefix}𝒄𝒍𝒐𝒔𝒆𝒕𝒊𝒎𝒆 
│⚡ ${prefix}𝒐𝒑𝒆𝒏𝒕𝒊𝒎𝒆
│⚡ ${prefix}fact
│⚡ ${prefix}setpp
│⚡ ${prefix}tr
│⚡ ${prefix}setppgroup 
│⚡ ${prefix}google 
│⚡ ${prefix} pickupline 
│⚡ ${prefix} shorturl
│⚡ ${prefix} reportbug
│⚡ ${prefix} coffee 
│⚡ ${prefix} createlogo
│⚡ ${prefix} xnxxsearch
╰━━━━━━━━━━━━━━━━━━━╯
> *Vrush-mini* | RaVenn-h | 04`}

global.animemenu = (prefix) => {
return`
╭━━━ ◇ 𝘼𝙉𝙄𝙈𝙀 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix} 𝒏𝒘𝒂𝒊𝒇𝒖
│⚡ ${prefix} 𝒘𝒂𝒊𝒇𝒖
│⚡ ${prefix} 𝒏𝒔𝒇𝒘
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒌𝒊𝒍𝒍
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒍𝒊𝒄𝒌
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒃𝒊𝒕𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒈𝒍𝒐𝒎𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒂𝒑𝒑𝒚
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒅𝒂𝒏𝒄𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒄𝒓𝒊𝒏𝒈𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒑𝒐𝒌𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒘𝒊𝒏𝒌
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒊𝒍𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒖𝒈
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒘𝒍𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒂𝒗𝒂𝒕𝒂𝒓
╰━━━━━━━━━━━━━━━━━━━╯`}

global.ownermenu = (prefix) => {
return`
╭━━━ ◇ 𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}𝒔𝒆𝒍𝒇
│⚡ ${prefix}𝒑𝒖𝒃𝒍𝒊𝒄
│⚡ ${prefix}𝒂𝒅𝒅𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix}𝒅𝒆𝒍𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix}𝒈𝒆𝒕𝒄𝒂𝒔𝒆
│⚡ ${prefix}𝒂𝒅𝒅𝒑𝒓𝒆𝒎
│⚡ ${prefix}𝒅𝒆𝒍𝒑𝒓𝒆𝒎
│⚡ ${prefix}𝒃𝒂𝒄𝒌𝒖𝒑
│⚡ ${prefix}𝒓𝒆𝒔𝒕𝒂𝒓𝒕 
│⚡ ${prefix}𝒅𝒆𝒍/𝒅𝒆𝒍𝒆𝒕𝒆
│⚡ ${prefix}𝒃𝒍𝒐𝒄𝒌
│⚡ ${prefix}𝒖𝒏𝒃𝒍𝒐𝒄𝒌
│⚡ ${prefix}𝒃𝒖𝒚𝒔𝒄𝒓𝒊𝒑𝒕 
│⚡ ${prefix}𝒃𝒂𝒄𝒌𝒖𝒑 
│⚡ ${prefix} 𝒓𝒆𝒑𝒐
│⚡ ${prefix} 𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix} 𝒔𝒆𝒕𝒃𝒊𝒐
╰━━━━━━━━━━━━━━━━━━━╯`}

global.othermenu = (prefix) => {
return`
╭━━━ ◇ 𝙊𝙏𝙃𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡  ${prefix}𝒅𝒆𝒗𝒊𝒄𝒆
│⚡  ${prefix}𝒔𝒔/𝒔𝒔𝒘𝒆𝒃
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒊𝒎𝒂𝒈𝒆
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒕𝒆𝒙𝒕
│⚡  ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒗𝒊𝒅
│⚡  ${prefix}𝒃𝒂𝒏
│⚡  ${prefix}𝒖𝒏𝒃𝒂𝒏
│⚡  ${prefix}𝒋𝒊𝒅
│⚡  ${prefix}𝒗𝒗
│⚡ ${prefix}𝒘𝒆𝒂𝒕𝒉𝒆𝒓
│⚡ ${prefix}𝒇𝒂𝒄𝒕
│⚡ ${prefix}𝒄𝒓𝒆𝒂𝒕𝒆𝒍𝒐𝒈𝒐
│⚡ ${prefix}𝒔𝒉𝒐𝒓𝒕𝒖𝒓𝒍
│⚡ ${prefix}𝒓𝒆𝒑𝒐𝒓𝒕𝒃𝒖𝒈
╰━━━━━━━━━━━━━━━━━━━╯`}

global.gameenu = (prefix, hituet) => {
return`╭━━━ 𝙂𝘼𝙈𝙀 𝙈𝙀𝙉𝙐 ━━━╮
│⚡  
│⚡  
╰━━━━━━━━━━━━━━━━━━━╯`}

global.menuall = (prefix, hituet) => {
return`
╭━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ *VRUSH-MINI FULL MENU*
┃  𝗥𝗮𝗩𝗲𝗻𝗻-𝗵 | 04
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝙊𝙏𝙃𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}𝒅𝒆𝒗𝒊𝒄𝒆
│⚡ ${prefix}𝒔𝒔/𝒔𝒔𝒘𝒆𝒃
│⚡ ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒊𝒎𝒂𝒈𝒆
│⚡ ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒕𝒆𝒙𝒕
│⚡ ${prefix}𝒃𝒓𝒐𝒂𝒅𝒄𝒂𝒔𝒕𝒗𝒊𝒅
│⚡ ${prefix}𝒃𝒂𝒏
│⚡ ${prefix}𝒖𝒏𝒃𝒂𝒏
│⚡ ${prefix}𝒋𝒊𝒅
│⚡ ${prefix}𝒗𝒗
│⚡ ${prefix}𝒗𝒗2
│⚡ ${prefix}𝒘𝒆𝒂𝒕𝒉𝒆𝒓
│⚡ ${prefix}𝒇𝒂𝒄𝒕
│⚡ ${prefix}𝒄𝒓𝒆𝒂𝒕𝒆𝒍𝒐𝒈𝒐
│⚡ ${prefix}𝒔𝒉𝒐𝒓𝒕𝒖𝒓𝒍
│⚡ ${prefix}𝒓𝒆𝒑𝒐𝒓𝒕𝒃𝒖𝒈
│⚡ ${prefix}𝒕𝒓
│⚡ ${prefix}𝒑𝒊𝒄𝒌𝒖𝒑𝒍𝒊𝒏𝒆 
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝘼𝙉𝙄𝙈𝙀 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix} 𝒏𝒘𝒂𝒊𝒇𝒖
│⚡ ${prefix} 𝒘𝒂𝒊𝒇𝒖
│⚡ ${prefix} 𝒏𝒔𝒇𝒘
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒌𝒊𝒍𝒍
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒍𝒊𝒄𝒌
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒃𝒊𝒕𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒈𝒍𝒐𝒎𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒂𝒑𝒑𝒚
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒅𝒂𝒏𝒄𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒄𝒓𝒊𝒏𝒈𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒑𝒐𝒌𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒘𝒊𝒏𝒌
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒊𝒍𝒆
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒎𝒖𝒈
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒘𝒍𝒑
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡ ${prefix} 𝒂𝒏𝒊𝒎𝒆𝒂𝒗𝒂𝒕𝒂𝒓
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡  ${prefix}𝒉𝒅/𝒓𝒆𝒎𝒊𝒏𝒊
│⚡  ${prefix}𝒂𝒑𝒌
│⚡  ${prefix}𝒑𝒍𝒂𝒚
│⚡  ${prefix}𝒊𝒎𝒈
│⚡  ${prefix}𝒊𝒎𝒃𝒅
│⚡  ${prefix}𝒂𝒏𝒊𝒎𝒆𝒅𝒍
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌 
│⚡  ${prefix}𝒈𝒊𝒕𝒄𝒍𝒐𝒏𝒆
│⚡  ${prefix}𝒕𝒐𝒊𝒎𝒈
│⚡  ${prefix}𝒚𝒕𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒈𝒊𝒓𝒍 
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒔𝒂𝒏𝒕𝒖𝒚
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒔𝒆𝒙𝒚
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒃𝒐𝒄𝒊𝒍
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒈𝒉𝒆𝒂
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒌𝒂𝒚𝒆𝒔
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒑𝒂𝒏𝒓𝒊𝒌𝒂
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒏𝒐𝒕
│⚡  ${prefix}𝒙𝒏𝒙𝒙𝒔𝒆𝒂𝒓𝒄𝒉
│⚡  ${prefix}𝒄𝒐𝒇𝒇𝒆𝒆 
│⚡  ${prefix}idch
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝙂𝙍𝙊𝙐𝙋 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}𝒉𝒊𝒅𝒆𝒕𝒂𝒈
│⚡ ${prefix}𝒕𝒂𝒈𝒂𝒍𝒍
│⚡ ${prefix}𝒅𝒆𝒎𝒐𝒕𝒆
│⚡ ${prefix}𝒑𝒓𝒐𝒎𝒐𝒕𝒆
│⚡ ${prefix}𝒎𝒖𝒕𝒆
│⚡ ${prefix}𝒖𝒏𝒎𝒖𝒕𝒆
│⚡ ${prefix}𝒋𝒐𝒊𝒏
│⚡ ${prefix}𝒑𝒐𝒍𝒍
│⚡ ${prefix}𝒌𝒊𝒄𝒌
│⚡ ${prefix}𝒍𝒆𝒇𝒕
│⚡ ${prefix}𝒂𝒅𝒅
│⚡ ${prefix}𝒍𝒊𝒏𝒌𝒈𝒄
│⚡ ${prefix}𝒈𝒓𝒐𝒖𝒑𝒋𝒊𝒅
│⚡ ${prefix}𝒈𝒆𝒕𝒑𝒑
│⚡ ${prefix}𝒌𝒊𝒄𝒌𝒂𝒍𝒍
│⚡ ${prefix}𝒆𝒗𝒆𝒓𝒚𝒐𝒏𝒆
│⚡ ${prefix}𝒓𝒆𝒔𝒆𝒕𝒍𝒊𝒏𝒌 
│⚡ ${prefix}𝒕𝒐𝒕𝒂𝒈
│⚡ ${prefix}𝒄𝒍𝒐𝒔𝒆𝒕𝒊𝒎𝒆 
│⚡ ${prefix}𝒐𝒑𝒆𝒏𝒕𝒊𝒎𝒆 
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝙉𝙀𝙒 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}pair
│⚡ ${prefix}delpair 
│⚡ ${prefix}ai
│⚡ ${prefix}joke
│⚡ ${prefix}truth
│⚡ ${prefix}dare
│⚡ ${prefix}qc
│⚡ ${prefix}zaddy
│⚡ ${prefix}gptimage
│⚡ ${prefix}tovn
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix} 𝒕𝒂𝒌𝒆
│⚡ ${prefix} 𝒃𝒓𝒂𝒕
│⚡ ${prefix} 𝒄𝒓𝒚 
│⚡ ${prefix} 𝒌𝒊𝒍𝒍
│⚡ ${prefix} 𝒉𝒖𝒈
│⚡ ${prefix} 𝒉𝒂𝒑𝒑𝒚 
│⚡ ${prefix} 𝒅𝒂𝒏𝒄𝒆 
│⚡ ${prefix} 𝒉𝒂𝒏𝒅𝒉𝒐𝒍𝒅 
│⚡ ${prefix} 𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒔𝒍𝒂𝒑 
│⚡ ${prefix} 𝒌𝒊𝒔𝒔
│⚡ ${prefix} 𝒃𝒍𝒖𝒔𝒉
│⚡ ${prefix} 𝒃𝒊𝒕𝒆
│⚡ ${prefix} 𝒄𝒖𝒅𝒅𝒍𝒆 
│⚡ ${prefix} 𝒇𝒖𝒓𝒃𝒓𝒂𝒕
│⚡ ${prefix} 𝒔𝒉𝒊𝒏𝒐𝒃𝒖
│⚡ ${prefix} 𝒃𝒐𝒏𝒌
│⚡ ${prefix} 𝒑𝒂𝒕
│⚡ ${prefix} 𝒏𝒐𝒎
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ *EPHOTO* 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}glitchtext
│⚡ ${prefix}writetext
│⚡ ${prefix}advancedglow
│⚡ ${prefix}typographytext
│⚡ ${prefix}pixelglitch
│⚡ ${prefix}neonglitch
│⚡ ${prefix}flagtext
│⚡ ${prefix}flag3dtext
│⚡ ${prefix}deletingtext
│⚡ ${prefix}blackpinkstyle
│⚡ ${prefix}glowingtext
│⚡ ${prefix}underwatertext
│⚡ ${prefix}logomakerl
│⚡ ${prefix}cartoonstyle
│⚡ ${prefix}papercutstyle
│⚡ ${prefix}watercolortext
│⚡ ${prefix}effectclouds
│⚡ ${prefix}blackpinklogo
│⚡ ${prefix}gradienttext
│⚡ ${prefix}summerbeach
│⚡ ${prefix}mluxurygold
│⚡ ${prefix}multicoloredneon
│⚡ ${prefix}sandsummer
│⚡ ${prefix}galaxywallpaper
│⚡ ${prefix}1917style
│⚡ ${prefix}lmakingneon
│⚡ ${prefix}royaltext
│⚡ ${prefix}freecreate
│⚡ ${prefix}galaxystyle
│⚡ ${prefix}lighteffects
│⚡ ${prefix}logoneko
╰━━━━━━━━━━━━━━━━━━━╯
╭━━━ ◇ 𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}𝒔𝒆𝒍𝒇
│⚡ ${prefix}𝒑𝒖𝒃𝒍𝒊𝒄
│⚡ ${prefix}𝒂𝒅𝒅𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix}𝒅𝒆𝒍𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix}𝒈𝒆𝒕𝒄𝒂𝒔𝒆
│⚡ ${prefix}𝒂𝒅𝒅𝒑𝒓𝒆𝒎
│⚡ ${prefix}𝒅𝒆𝒍𝒑𝒓𝒆𝒎
│⚡ ${prefix}𝒃𝒂𝒄𝒌𝒖𝒑
│⚡ ${prefix}𝒓𝒆𝒔𝒕𝒂𝒓𝒕 
│⚡ ${prefix}𝒅𝒆𝒍/𝒅𝒆𝒍𝒆𝒕𝒆
│⚡ ${prefix}𝒃𝒍𝒐𝒄𝒌
│⚡ ${prefix}𝒖𝒏𝒃𝒍𝒐𝒄𝒌
│⚡ ${prefix}𝒃𝒖𝒚𝒔𝒄𝒓𝒊𝒑𝒕 
│⚡ ${prefix}𝒃𝒂𝒄𝒌𝒖𝒑 
│⚡ ${prefix} 𝒓𝒆𝒑𝒐
│⚡ ${prefix} 𝒐𝒘𝒏𝒆𝒓
│⚡ ${prefix} 𝒔𝒆𝒕𝒃𝒊𝒐
╰━━━━━━━━━━━━━━━━━━━╯`}

global.downloadmenu = (prefix) => { 
return`
╭━━━ ◇ 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡  ${prefix}𝒉𝒅/𝒓𝒆𝒎𝒊𝒏𝒊
│⚡  ${prefix}apk
│⚡  ${prefix}𝒑𝒍𝒂𝒚
│⚡  ${prefix}𝒊𝒎𝒈
│⚡ ${prefix}𝒊𝒎𝒃𝒅
│⚡  ${prefix}𝒂𝒏𝒊𝒎𝒆𝒅𝒍
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌 
│⚡  ${prefix}𝒈𝒊𝒕𝒄𝒍𝒐𝒏𝒆
│⚡  ${prefix}𝒕𝒐𝒊𝒎𝒈
│⚡  ${prefix}𝒚𝒕𝒔𝒆𝒂𝒓𝒄𝒉 
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒈𝒊𝒓𝒍 
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒔𝒂𝒏𝒕𝒖𝒚
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒔𝒆𝒙𝒚
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒃𝒐𝒄𝒊𝒍
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒈𝒉𝒆𝒂
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒌𝒂𝒚𝒆𝒔
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒑𝒂𝒏𝒓𝒊𝒌𝒂
│⚡  ${prefix}𝒕𝒊𝒌𝒕𝒐𝒌𝒏𝒐𝒕
│⚡ ${prefix} xnxxsearch
╰━━━━━━━━━━━━━━━━━━━╯`}

global.groupmenu = (prefix) => {
return`╭━━━ ◇ 𝙂𝙍𝙊𝙐𝙋 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}𝒉𝒊𝒅𝒆𝒕𝒂𝒈
│⚡ ${prefix}𝒕𝒂𝒈𝒂𝒍𝒍
│⚡ ${prefix}𝒅𝒆𝒎𝒐𝒕𝒆
│⚡ ${prefix}𝒑𝒓𝒐𝒎𝒐𝒕𝒆
│⚡ ${prefix}𝒎𝒖𝒕𝒆
│⚡ ${prefix}𝒖𝒏𝒎𝒖𝒕𝒆
│⚡ ${prefix}𝒋𝒐𝒊𝒏
│⚡ ${prefix}𝒑𝒐𝒍𝒍
│⚡ ${prefix}𝒌𝒊𝒄𝒌
│⚡ ${prefix}𝒍𝒆𝒇𝒕
│⚡ ${prefix}𝒂𝒅𝒅
│⚡ ${prefix}𝒍𝒊𝒏𝒌𝒈𝒄
│⚡ ${prefix}𝒈𝒓𝒐𝒖𝒑𝒋𝒊𝒅
│⚡ ${prefix}𝒈𝒆𝒕𝒑𝒑
│⚡ ${prefix}𝒌𝒊𝒄𝒌𝒂𝒍𝒍
│⚡ ${prefix}𝒆𝒗𝒆𝒓𝒚𝒐𝒏𝒆
│⚡ ${prefix}𝒓𝒆𝒔𝒆𝒕𝒍𝒊𝒏𝒌 
│⚡ ${prefix}𝒕𝒐𝒕𝒂𝒈
│⚡ ${prefix}𝒄𝒍𝒐𝒔𝒆𝒕𝒊𝒎𝒆 
│⚡ ${prefix}𝒐𝒑𝒆𝒏𝒕𝒊𝒎𝒆 
╰━━━━━━━━━━━━━━━━━━━╯`}

global.stickermenu = (prefix) => {
return`
╭━━━ ◇ 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix} 𝒕𝒂𝒌𝒆
│⚡ ${prefix} 𝒃𝒓𝒂𝒕
│⚡ ${prefix} 𝒄𝒓𝒚 
│⚡ ${prefix} 𝒌𝒊𝒍𝒍
│⚡ ${prefix} 𝒉𝒖𝒈
│⚡ ${prefix} 𝒉𝒂𝒑𝒑𝒚 
│⚡ ${prefix} 𝒅𝒂𝒏𝒄𝒆 
│⚡ ${prefix} 𝒉𝒂𝒏𝒅𝒉𝒐𝒍𝒅 
│⚡ ${prefix} 𝒉𝒊𝒈𝒉𝒇𝒊𝒗𝒆
│⚡ ${prefix} 𝒔𝒍𝒂𝒑 
│⚡ ${prefix} 𝒌𝒊𝒔𝒔
│⚡ ${prefix} 𝒃𝒍𝒖𝒔𝒉
│⚡ ${prefix} 𝒃𝒊𝒕𝒆
│⚡ ${prefix} 𝒄𝒖𝒅𝒅𝒍𝒆 
│⚡ ${prefix} 𝒇𝒖𝒓𝒃𝒓𝒂𝒕
│⚡ ${prefix} 𝒔𝒉𝒊𝒏𝒐𝒃𝒖
│⚡ ${prefix} 𝒃𝒐𝒏𝒌
│⚡ ${prefix} 𝒑𝒂𝒕
│⚡ ${prefix} 𝒏𝒐𝒎
╰━━━━━━━━━━━━━━━━━━━╯`}

global.ephotomenu = (prefix) => {
return`
╭━━━ ◇ *EPHOTO* 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}glitchtext
│⚡ ${prefix}writetext
│⚡ ${prefix}advancedglow
│⚡ ${prefix}typographytext
│⚡ ${prefix}pixelglitch
│⚡ ${prefix}neonglitch
│⚡ ${prefix}flagtext
│⚡ ${prefix}flag3dtext
│⚡ ${prefix}deletingtext
│⚡ ${prefix}blackpinkstyle
│⚡ ${prefix}glowingtext
│⚡ ${prefix}underwatertext
│⚡ ${prefix}logomakerl
│⚡ ${prefix}cartoonstyle
│⚡ ${prefix}papercutstyle
│⚡ ${prefix}watercolortext
│⚡ ${prefix}effectclouds
│⚡ ${prefix}blackpinklogo
│⚡ ${prefix}gradienttext
│⚡ ${prefix}summerbeach
│⚡ ${prefix}mluxurygold
│⚡ ${prefix}multicoloredneon
│⚡ ${prefix}sandsummer
│⚡ ${prefix}galaxywallpaper
│⚡ ${prefix}1917style
│⚡ ${prefix}lmakingneon
│⚡ ${prefix}royaltext
│⚡ ${prefix}freecreate
│⚡ ${prefix}galaxystyle
│⚡ ${prefix}lighteffects
│⚡ ${prefix}logoneko
╰━━━━━━━━━━━━━━━━━━━╯`}

global.bugmenu = (prefix) => {
return`
╭━━━ ◇ 𝘽𝙐𝙂 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}fc-group
│⚡ ${prefix}force 
│⚡ ${prefix}delay
╰━━━━━━━━━━━━━━━━━━━╯`}

global.funmenu = (prefix) => {
return`
╭━━━ ◇ 𝙁𝙐𝙉 𝙈𝙀𝙉𝙐 ◇ ━━━╮
│⚡ ${prefix}tictactoe 
╰━━━━━━━━━━━━━━━━━━━╯`}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
        fs.unwatchFile(file)
        console.log(chalk.redBright(`Update ${__filename}`))
        delete require.cache[file]
        require(file)
})
