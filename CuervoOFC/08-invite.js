const inviteHandler = async (bot, { reply, m }) => {
  
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

  try {
    const code = await bot.groupInviteCode(jid);
    const url = `https://chat.whatsapp.com/${code}`;
    const nt = await reply(`╭╶╌╌╌╌╌┈┈┈┈╌╌╌╌╌╶╮\n┊🔗 Ссылка на группу:\n┊${url}\n╰╶╌╌╌╌╌┈┈┈┈╌╌╌╌╌╶╯`);
    await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (e) {
    console.error("❌ Error al obtener link:", e);
    await reply("> ❌ Не удалось получить ссылку на группу.");
  }

}
export default inviteHandler;
