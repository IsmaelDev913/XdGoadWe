

const tangallHandler = async ({ bot, m, reply }) => {
  const jid = m.key.remoteJid;
  // Traducción a ruso // Russian translation
  if (!jid) return reply("⚠️ Неверный JID (сообщение не может быть отправлено).");
  await bot.sendMessage(jid, { react: { text: "⏱️", key: m.key } });
  const sender = m.key.participant || m.key.remoteJid;

  const groupMetadata = await bot.groupMetadata(jid);

  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);

  const isAdmin = admins.includes(sender);

  if (!isAdmin) {

  return await bot.sendMessage(jid, { text: "> ❌ команда только для администраторов." }, { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  }

  const participants = groupMetadata.participants.map(p => p.id);
  const mentions = participants;
  const texto = participants.map(p => `> ᠙᳞✿̶᮫᮫ְְׅ᳝ׅ᳝᳞᳞࣪᪲࣪֘⣷ׅ᳝࣪ ࣪࣪𖡻ְְׅ᳝ׅׅ࣪࣪֘ᰰ᮫ְׅ᳝࣪᪲⃞̶𝝸𝕝᮫ְ᳝᳝⃨۪۪۪ׅ᳝࣪࣪っְְׅ᳝۪⃨۪۪۪࣪: @${p.split("@")[0]}`).join("\n");
 const nt = await bot.sendMessage(jid, { text: `╭࣭۬═ֽ̥࣪━᜔๋݈═𑂺ׄ︵ິּ֙᷼⌒݈᳹᪾̯ ⋮꥓ּ〪࣭ׄິ᜔ּ໋࣭ׄ⋮⌒ໍּ֣ׄ═ᮣໍ࣭ׄ━𑂺᜔꥓໋┉꥓ׂ᷼━᜔࣭֙━๋݈═̥࣭۬╮\n> ᠙᳞✿̶᮫᮫ְְׅ᳝ׅ᳝᳞᳞࣪᪲࣪֘⣷ׅ᳝࣪ ࣪࣪𖡻ְְׅ᳝ׅׅ࣪࣪֘ᰰ᮫ְׅ᳝࣪᪲⃞̶𝝸𝕝᮫ְ᳝᳝⃨۪۪۪ׅ᳝࣪࣪っְְׅ᳝۪⃨۪۪۪࣪:👥 *Маркировка каждого:*\n${texto}\n꥓໋╰ׅ۬═ֽ̥࣪━᜔๋݈═𑂺ׄ︵ິּ֙᷼⌒݈᳹᪾̯ ⋮꥓ּ࣭ׄ⋮⌒ໍּ֣ׄ═ᮣໍ࣭ׄ━𑂺᜔꥓໋┉꥓ׂ᷼━᜔࣭֙━๋݈═̥࣭۬╯`, mentions, },  { contextInfo: { externalAdReply: { title: "Юмэко Бот", body: "работает на русской мафуа", mediaType: 1, previewType: 'PHOTO', thumbnailUrl: 'https://files.catbox.moe/651gmb.jpg', renderLargerThumbnail: true, sourceUrl: 'https://dash.cuervo-host.xyz' } }, }, { quoted: m });
  await bot.sendMessage(jid, { react: { text: '🤖', key: nt.key } });
}
export default tangallHandler;