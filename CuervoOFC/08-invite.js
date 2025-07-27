const inviteHandler = async ({ reply, bot, m }) => {
  
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const sender = m.key.participant || m.key.remoteJid;
  const groupMetadata = await sock.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);

  if (!isAdmin) {
    return await bot.sendMessage(jid, { text: "> ❌ Эту команду могут использовать только администраторы." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });

  }

  try {
    const code = await bot.groupInviteCode(jid);
    const url = `https://chat.whatsapp.com/${code}`;
    const nt = await bot.sendMessage(jid, { text: `╭╶╌╌╌╌╌┈┈┈┈╌╌╌╌╌╶╮\n┊🔗 Ссылка на группу:\n┊${url}\n╰╶╌╌╌╌╌┈┈┈┈╌╌╌╌╌╶╯` }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
    await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (e) {
    console.error("❌ Error al obtener link:", e);
    await bot.sendMessage(jid, { text: "> ❌ Не удалось получить ссылку на группу." },  { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }

}
export default inviteHandler;