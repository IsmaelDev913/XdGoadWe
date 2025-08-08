const cleanHandler = async (bot, { reply, m }) => {
  const jid = m.key.remoteJid;
    // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const metadata = await bot.groupMetadata(jid);
  const sender = m.key.participant || m.key.remoteJid;
  const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

  if (!admins.includes(sender))
  return reply("> ❌ Эту команду могут использовать только администраторы.");
  const messages = await bot.groupMessages(jid, 50);
  const botMsgs = messages.filter(msg => msg.key.fromMe);

  for (let msg of botMsgs) {
  await bot.sendMessage(jid, { delete: msg.key });
  }

  await reply("> 🧹 Сообщения успешно удалены.");
};
export default cleanHandler;
