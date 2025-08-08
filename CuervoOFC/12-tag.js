

const tangHandler = async ({ reply, bot, args, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  if (!jid.endsWith("@g.us")) {
  await reply("❌ Эта команда работает только в группах.");
  return;
  }
  const groupMetadata = await sock.groupMetadata(jid);
  const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
  // Verificar si el que manda es admin
  if (!admins.includes(m.key.participant || m.participant)) {
  await reply("❌ Эту команду могут использовать только администраторы.");
  return;
  }
  if (args.length === 0) {
  await reply("❗ использование команды: .ярлык [сообщение]" }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  return;
  }
  const texto = args.join(" ");
  await bot.sendMessage(jid, { text: texto, mentions: groupMetadata.participants.map(p => p.id) });
  } catch (error) {
  console.error(error);
  await reply("❌ ошибка в работе команды.");
  }
};
export default tagHandler;
