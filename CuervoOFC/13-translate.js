import axios from "axios";

const translateHandler = async ({ reply, bot, m, args }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  if (args.length < 2) {
  await sock.sendMessage(jid, { text: "🈯 Uso: /traducir [idioma] [texto]\nEjemplo: /traducir en hola mundo" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  return;
  }
  const lang = args[0];
  const text = args.slice(1).join(" ");
  try {
  const res = await axios.post("https://libretranslate.de/translate", {
  q: text,
  source: "auto",
  target: lang,
  format: "text",
  }, {
  headers: { "Content-Type": "application/json" }
  });
  const traduccion = res.data.translatedText;
  await sock.sendMessage(jid, { text: `🈯 Traducción (${lang}): ${traduccion}` }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  } catch {
  await sock.sendMessage(jid, { text: "❌ Error al traducir el texto." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
};
export default translateHandler