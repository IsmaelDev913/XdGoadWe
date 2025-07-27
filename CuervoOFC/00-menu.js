import axios from 'axios';
import fetch from 'node-fetch';

const getBuffer = async (url) => {
  const res = await fetch(url);
  return await res.buffer();
};
const fetchJson = async (url, opt) => {
  const res = await fetch(url, opt);
  return await res.json();
};

const menuHandler = async (m, { command, reply, bot }) => {
const jid = m.key.remoteJid;
    // Traducción a ruso // Russian translation
    if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");

    await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });

 // Comando: ruso
      console.log('Ejecutando menú...'); // console.log: español
      
      const nama = m.pushName || 'Без имени'; // Texto visible: ruso
      const id = (m.key.participant || m.key.remoteJid || '').split('@')[0];
      const menuText = `
:   ╭──────────────────╮
:   │ 👋 Привет, *${nama}*!
╭─┴─「 *ИНФОРМАЦИЯ О БОТЕ* 」 
│
│ ${wish}
│         *⌚ ${time} IST*
│
│ ▢ *ᴏᴡɴᴇʀ:* Русская ворона
│ ▢ *ᴠᴇʀsɪᴏɴ:*  Юмэко Бот
│ ▢ *ᴍᴏᴅᴇ:* ᴘᴜʙʟɪᴄ
│ ▢ *ᴘʀᴇғɪx:* *# / !*
│
│      ▎▍▌▌▉▏▎▌▉▐▏▌▎
│      ▎▍▌▌▉▏▎▌▉▐▏▌▎
│       ©2025  Юмэко Бот
│
╰──────────────────╮
│ ◩ ᴍᴇɴᴜ ◪「 *Команды бота* 」
╭──────────────────╯
│
│[ ᴍᴇᴅɪᴀ ]
│ ▢ 
│
│[ ᴄᴏɴᴠᴇʀᴛ ]
│ ▢ 
│
│[ ғᴜɴ ]
│ ▢ 
│
│
│[ ᴛᴀɢ ]
│ ▢ 
│
│[ ᴏᴛʜᴇʀ ]
│ ▢ 
│
│[ ᴏᴡɴᴇʀ ]
│ ▢ 
│
│   ❏ 𝘤𝘰𝘥𝘦𝘥 𝘣𝘺 Русская ворона ❏
╰──────────────────╯
📌 Нажмите кнопку ниже, чтобы начать!
`;

      // Ambil foto profil atau fallback // Obtener foto de perfil o alternativa // Get profile picture or fallback
      let profile;
      try {
        profile = await bot.profilePictureUrl(m.sender, 'image');
      } catch {
        profile = 'https://files.catbox.moe/651gmb.jpg';
      }

      try {
       const nt = await bot.sendMessage(jid, {
          image: { url: "https://files.catbox.moe/651gmb.jpg" },
          caption: menuText,
          footer: 'Бот Yumeko, работающий на основе русской мафии', // Texto visible: ruso
          buttons: [
            { buttonId: '.пинг', buttonText: { displayText: '📡 Пинг' }, type: 1 }, // Texto visible: ruso
            { buttonId: '.тест', buttonText: { displayText: '🤖 Статус' }, type: 1 }, // Texto visible: ruso
            { buttonId: '.играть типичная русская мафиозная музыка', buttonText: { displayText: '🎵 Играть' }, type: 1 } // Texto visible: ruso
          ],
          headerType: 4, // 4 = ExternalAdReply (imagen + enlace) // 4 = ExternalAdReply (image + link)
          viewOnce: true,
          contextInfo: {
            externalAdReply: {
              title: "Юмэко Бот",
              body: "работает на русской мафуа",  // Texto visible: ruso
              mediaType: 1,
              previewType: 'PHOTO',
              thumbnailUrl: profile,
              renderLargerThumbnail: true,
              sourceUrl: 'https://dash.cuervo-host.xyz' // cambiar tu enlace aquí // change your link here
            }
          }
        }, { quoted: m });
        await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });

      } catch (e) {
        console.error('Error al enviar el menú:', e); // console.error: español
        reply('⚠️ Не удалось отобразить меню.'); // Texto visible: ruso
      }
}
export default menuHandler;
