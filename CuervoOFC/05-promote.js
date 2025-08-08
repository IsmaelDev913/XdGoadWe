

const promoteHandler = async (bot, { m, reply }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const sender = m.key.participant || m.key.remoteJid;
  const groupMetadata = await bot.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);

  if (!isAdmin) {
  return await reply("> ❌ Только администраторы могут использовать команду.");

  }

  const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;

  if (!mentioned || mentioned.length === 0) {
  return await reply("> ❗ упомянуть пользователя для продвижения.");
  }

  try {
  await bot.groupParticipantsUpdate(jid, [mentioned[0]], "promote");
  const nt = await reply(`> ✅ пользователь был успешно повышен .`);
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (e) {
  console.error("❌ Error al promover:", e);
  await reply("> ❌ Не удалось разместить ваш заказ.");
  }

}
export default promoteHandler;
