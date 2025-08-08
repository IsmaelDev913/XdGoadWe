const groupHandler = async ({ bot, reply, args, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  const metadata = await bot.groupMetadata(jid).catch(() => null);
  if (!metadata) {
  return await reply("> ❌ команда доступна только в группах.");
  }
  const sender = m?.key?.participant || m?.key?.remoteJid || '';
  const admins = metadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);
  if (!isAdmin) {
  return await reply("> ❌ Только администраторы могут использовать команду.");
  }
  const action = (args[0] || "").toLowerCase();
  if (action === "открытая") {
  await bot.groupSettingUpdate(jid, "not_announcement");
  await reply("> 🔓 группа была *открытая*.");
  } else if (action === "закрытая") {
  await bot.groupSettingUpdate(jid, "announcement");
  await reply("> 🔒 группа была *закрытая*.");
  } else {
  await reply(">❗ использование команды:\n.группа открытая\n.группа закрытая");
  }
  } catch (e) {
  console.error("Error en /group:", e);
  await reply("> ❌ Произошла ошибка при выполнении команды.");
  }

}
export default groupHandler
