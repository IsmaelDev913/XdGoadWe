import yts from 'yt-search';
// import axios from 'axios'; // No usado en este archivo, se puede eliminar // Not used in this file, can be removed
import fetch from 'node-fetch';

const getBuffer = async (url) => {
  const res = await fetch(url);
  return await res.buffer();
};
const fetchJson = async (url, opt) => {
  const res = await fetch(url, opt);
  return await res.json();
};

const playHandler = async (m, { text, command, reply, bot }) => {
  try {
    // Traducción a ruso // Russian translation
    if (!text) return reply(`Пожалуйста, введите также название песни, например *${command} lucid dreams*`);
    const jid = m.key.remoteJid;
    // Traducción a ruso // Russian translation
    if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");

    await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });

    const rus = await yts(text);
    const data = rus.all.filter(v => v.type === 'video');
    // Traducción a ruso // Russian translation
    if (data.length === 0) return reply("Видео не найдено.");

    const res = data[0];
    const thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`;
    const inithumb = await getBuffer(thumbUrl);

    const teks = `╔◡╍┅•.⊹︵ࣾ᷼ ׁ𖥓┅╲۪ ⦙᷼᷼͝͝⦙ ׅ╱ׅ╍𖥓 ︵ࣾ᷼︵ׄׄ᷼⊹┅╍◡╗\n┋  ⣿̶⃚̶̸ֻ〪ׅ⃕݊⃧͝ᤢ֠◌ִ̲*ВОСПРОИЗВЕДЕНИЕ МУЗЫКИ С YOUTUBE*  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋\n╚◠┅┅˙•⊹.⁀𖥓 ׅ╍╲۪ ⦙᷼᷼͝͝⦙ ׅ╱ׅ╍𖥓 ◠˙⁀۪ׄ⊹˙╍┅◠╝\n\n` + // Traducción a ruso // Russian translation
      `  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋📺 *Канал* : ${res.author.name}\n` + // Traducción a ruso // Russian translation
      `  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋👀 *Просмотры* : ${res.views} просмотров\n` + // Traducción a ruso // Russian translation
      `  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋⏱️ *Продолжительность* : ${res.timestamp}\n` + // Traducción a ruso // Russian translation
      `  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋🔗 *связь* : ${res.url}\n\nОтправка аудио...`; // Traducción a ruso // Russian translation

    await bot.sendMessage(jid, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: '  ꨪ̸⃙ׅᮬֺ๋֢᳟  ┋ ' + res.title,
          body: '┋  ⣿̶⃚̶̸ֻ〪ׅ⃕݊⃧͝ᤢ֠◌ִ̲ ' + new Date().toLocaleString(),
          mediaType: 2,
          renderLargerThumbnail: true,
          thumbnail: inithumb,
          mediaUrl: res.url,
          sourceUrl: res.url
        }
      },
      image: { url: thumbUrl },
      text: teks
    }, { quoted: m });

    // La dependencia de esta API externa es una consideración clave // This external API reliance is a key consideration
    const mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`);
    const crot = mbut.result.download.audio;

    const nt = await bot.sendMessage(jid, {
      audio: { url: crot },
      mimetype: 'audio/mpeg',
      ptt: true // Envía como nota de voz // Sends as voice note
    }, { quoted: m });

    await bot.sendMessage(jid, { react: { text: '🎶', key: nt.key } });

  } catch (err) {
    console.error(err); // console.error permanece en español // console.error remains in Spanish
    // Traducción a ruso // Russian translation
    reply(`❌ Произошла ошибка: ${err.message}`);
  }
};

export default playHandler;
