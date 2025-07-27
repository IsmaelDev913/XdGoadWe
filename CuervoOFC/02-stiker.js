import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs'; // Agregado existsSync, mkdirSync
import { spawn } from 'child_process';

  const stickerHandler = async (m, { bot }) => {
  const msg = m.message;
  // Acceso seguro a quotedMessage y imageMessage
  const quotedMsg = msg?.extendedTextMessage?.contextInfo?.quotedMessage;
  const isImage = quotedMsg?.imageMessage;

  // Asegurar que el directorio temp exista
  const tempDir = '../temp';
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);
  }

  // Traducción a ruso // Russian translation
  if (!isImage) {
    return bot.sendMessage(m.key.remoteJid, { text: '> ❗Ответьте на изображение с помощью команды .stiker' }, { quoted: m });
  }

  try {
    // ✅ Descargar medios // Download media
    const mediaBuffer = await downloadMediaMessage(
      { message: quotedMsg },  // MUST be wrapped as { message: ... }
      'buffer',
      {}
    );

    const inputPath = `../temp/${Date.now()}.jpg`;
    const outputPath = inputPath.replace('.jpg', '.webp');
    writeFileSync(inputPath, mediaBuffer);

    // 🔄 Convertir a sticker vía ffmpeg // Convert to sticker via ffmpeg
    await new Promise((resolve, reject) => {
      const ffmpegProcess = spawn('ffmpeg', [
        '-i', inputPath,
        '-vcodec', 'libwebp',
        '-vf', 'scale=512:512:force_original_aspect_ratio=increase,crop=512:512',
        '-lossless', '1',
        '-compression_level', '6',
        '-qscale', '75',
        '-preset', 'picture',
        '-an', '-vsync', '0',
        outputPath
      ]);

      let errorMessage = '';
      ffmpegProcess.stderr.on('data', (data) => {
        errorMessage += data.toString();
      });

      ffmpegProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          // console.error en español // console.error in Spanish
          console.error(`ffmpeg salió con código ${code}: ${errorMessage}`);
          // Mensaje de error para el usuario en ruso // Error message for user in Russian
          reject(new Error('Не удалось создать стикер (ошибка конвертации).'));
        }
      });
      ffmpegProcess.on('error', (err) => { // Captura errores si ffmpeg no puede ser iniciado // Catches errors if ffmpeg can't be spawned
        // console.error en español // console.error in Spanish
        console.error('No se pudo iniciar el proceso de ffmpeg:', err);
        // Mensaje de error para el usuario en ruso // Error message for user in Russian
        reject(new Error('Не удалось запустить инструмент конвертации стикеров. Убедитесь, что ffmpeg установлен.'));
      });
    });

    // ✅ Enviar sticker // Send sticker
    await bot.sendMessage(m.key.remoteJid, {
      sticker: { url: outputPath }
    }, { quoted: m });

  } catch (err) {
    // console.error en español // console.error in Spanish
    console.error("Error en stickerHandler:", err);
    // Mensaje de error para el usuario en ruso // Error message for user in Russian
    return bot.sendMessage(m.key.remoteJid, { text: `> ❌ Произошла ошибка: ${err.message}` }, { quoted: m });
  } finally {
    // 🧹 Limpiar archivos (asegurarse de que existan antes de eliminar) // Clean up files (ensure they exist before deleting)
    if (existsSync(inputPath)) {
      unlinkSync(inputPath);
    }
    if (existsSync(outputPath)) {
      unlinkSync(outputPath);
    }
  }
};

export default stickerHandler;
