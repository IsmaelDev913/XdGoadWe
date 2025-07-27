const groupHandler = async ({ bot, reply, args, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  const metadata = await bot.groupMetadata(jid).catch(() => null);
  if (!metadata) {
  return await bot.sendMessage(jid, { text: "> ❌ команда доступна только в группах." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
  const sender = m?.key?.participant || m?.key?.remoteJid || '';
  const admins = metadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);
  if (!isAdmin) {
  return await bot.sendMessage(jid, { text: "> ❌ Только администраторы могут использовать команду." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
  const action = (args[0] || "").toLowerCase();
  if (action === "открытая") {
  await bot.groupSettingUpdate(jid, "not_announcement");
  await bot.sendMessage(jid, { text: "> 🔓 группа была *открытая*." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  } else if (action === "закрытая") {
  await bot.groupSettingUpdate(jid, "announcement");
  await bot.sendMessage(jid, { text: "> 🔒 группа была *закрытая*." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  } else {
  await bot.sendMessage(jid, { text: ">❗ использование команды:\n.группа открытая\n.группа закрытая" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }
  } catch (e) {
  console.error("Error en /group:", e);
  await bot.sendMessage(jid, { text: "> ❌ Произошла ошибка при выполнении команды." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }

}
export default groupHandler