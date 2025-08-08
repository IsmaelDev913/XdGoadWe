

const demoteHandler = async (bot, { m, reply }) => {

  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const sender = m.key.participant || m.key.remoteJid;
  const groupMetadata = await sock.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);

  if (!isAdmin) {
  return await reply("> ❌ Эту команду могут использовать только администраторы.");
  }
  const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
  if (!mentioned || mentioned.length === 0) {
  return await reply(">❗ Пометить пользователя для понижения.");
  }
  try {
    await bot.groupParticipantsUpdate(jid, [mentioned[0]], "demote");
    const nt = await reply(`> ⛔ пользователь успешно понижен.`);
    await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });

  } catch (e) {
   console.error("❌ Error al degradar:", e);
   await reply("> ❌ Не удалось понизить уровень пользователя .");
  }

}
export default demoteHandler;
