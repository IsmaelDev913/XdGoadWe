import axios from "axios";

const translateHandler = async ({ reply, bot, m, args }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  if (args.length < 2) {
  await reply("🈯 использовать .переводить [язык] <Текст>");
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
  await reply(`🈯 перевод (${lang}): ${traduccion}`);
  } catch {
  await reply("❌ ошибка в переводе.");
  }
};
export default translateHandler
