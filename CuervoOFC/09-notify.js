const notifyHandler = async (bot, { reply, args, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  if (!jid.endsWith("@g.us")) {
  await reply("> ❌ Функциональная команда только для групп.");

  return;
  }

  const groupMetadata = await sock.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
  // Verificar si el que manda es admin

  if (!admins.includes(m.key.participant || m.participant)) {
  await reply("> ❌ Эту команду могут использовать только администраторы.");

  return;
  }

  if (args.length === 0) {
  await reply("> ❗ использование команды: .уведомить {сообщение}");

  return;
  }

  const texto = args.join(" ");
  const nt = await bot.sendMessage(jid, { text: texto, mentions: groupMetadata.participants.map(p => p.id) }, { quoted: m });
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (error) {
  console.error(error);
  await reply("> ❌ ошибка обработки команды.");
  }

};
export default notifyHandler;
