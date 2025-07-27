

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
  return await bot.sendMessage(jid, { text: "> ❌ Эту команду могут использовать только администраторы." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
  const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
  if (!mentioned || mentioned.length === 0) {
  return await bot.sendMessage(jid, { text: "> ❗ пометить пользователя для удаления.\nпример команды: /устранять @пользователь" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
  try {
  await bot.groupParticipantsUpdate(jid, [mentioned[0]], "remove");
  const nt = await bot.sendMessage(jid, { text: `> 👢 удаленный пользователь с пользователем.` }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (e) {
  console.error("❌ Error al expulsar:", e);
  await bot.sendMessage(jid, { text: "> ❌ Ошибка при запуске фильтра. Когда я получил права администратора???" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
}
export default kickHandler;