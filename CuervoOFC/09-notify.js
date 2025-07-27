const notifyHandler = async ({ reply, bot, args, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  if (!jid.endsWith("@g.us")) {
  await bot.sendMessage(jid, { text: "> ❌ Функциональная команда только для групп." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });

  return;
  }

  const groupMetadata = await sock.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
  // Verificar si el que manda es admin

  if (!admins.includes(m.key.participant || m.participant)) {
  await bot.sendMessage(jid, { text: "> ❌ Эту команду могут использовать только администраторы." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });

  return;
  }

  if (args.length === 0) {
  await bot.sendMessage(jid, { text: "> ❗ использование команды: .уведомить {сообщение}" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });

  return;
  }

  const texto = args.join(" ");
  const nt = await bot.sendMessage(jid, { text: texto, mentions: groupMetadata.participants.map(p => p.id) }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
  } catch (error) {
  console.error(error);
  await bot.sendMessage(jid, { text: "> ❌ ошибка обработки команды." } { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }

};
export default notifyHandler;