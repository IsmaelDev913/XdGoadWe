

const kickHandler = async ({ bot, reply, m }) => {

  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const sender = m.key.participant || m.key.remoteJid;
  const groupMetadata = await bot.groupMetadata(jid);
  const admins = groupMetadata.participants
  .filter(p => p.admin)
  .map(p => p.id);
  const isAdmin = admins.includes(sender);
  if (!isAdmin) {
  return await reply("> ❌ Эту команду могут использовать только администраторы.");
  }
  const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
  if (!mentioned || mentioned.length === 0) {
  return await reply("> ❗ пометить пользователя для удаления.\nпример команды: /устранять @пользователь");
  }
  try {
  await bot.groupParticipantsUpdate(jid, [mentioned[0]], "remove");
  const nt = await reply(`> 👢 удаленный пользователь с пользователем.`);
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (e) {
  console.error("❌ Error al expulsar:", e);
  await reply("> ❌ Ошибка при запуске фильтра. Когда я получил права администратора???");
  }
}
export default kickHandler;
