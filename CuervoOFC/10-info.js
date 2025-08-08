

const infoHandler = async (bot { reply, m }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  try {
  const group = await bot.groupMetadata(jid);
  const creator = group.owner ? `@${group.owner.split("@")[0]}` : "Незнакомец";
  const desc = group.desc || "нет описания.";
  const nombre = group.subject || "неназванный";
  const cantidad = group.participants.length;
  const texto = `╭╴─━━━━━━━━━━━━─╶╮\n┃🏷️ *Имя:* ${nombre}\n┃📝 *описание:* ${desc}\n┃👤 *создатель:* ${creator}\n┃👥 *члены:* ${cantidad}╰╴─━━━━━━━━━━━━─╶╯`;

  const nt = await bot.sendMessage(jid, { text: texto, mentions: [group.owner] }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });

  } catch (e) {
  console.error("Error en /info:", e);
  await reply("> ❌ Не удалось получить информацию о группе.");
  }

}
export default infoHandler;
