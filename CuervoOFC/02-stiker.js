import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import { Sticker, StickerTypes } from "wa-sticker-formatter";

const stickerHandler = async (bot, { reply, m }) => {
  const jid = m.key.remoteJid;
  const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (!quoted) {
    return await reply("⚠️ *Ответьте на 10-секундное изображение или видео, чтобы создать стикер.*");
  }

  const type = Object.keys(quoted)[0];
  if (!["imageMessage", "videoMessage"].includes(type)) {
    return reply("❌ *только изображения или видео.*");
  }

  try {
    const media = quoted[type];
    const stream = await downloadContentFromMessage(media, type === "imageMessage" ? "image" : "video");

    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    const sticker = new Sticker(buffer, {
      pack: "юмэко бот",
      author: "Воронья мафия",
      type: StickerTypes.FULL,
    });

    const stickerBuffer = await sticker.toBuffer();

    await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: m });

  } catch (err) {
    console.error("❌ Sticker error:", err);
    await reply("❌ ошибка создания стикера");
  }
};
export default stickerHandler 
