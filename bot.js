console.debug = () => {}; // 🔇 Silenciar logs de Baileys // 🔇 Silence Baileys logs

import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import handleMessage from './cuervo.js';
import * as config from './cuervo/config.js';

(async function start(usePairingCode = true) {
  const session = await useMultiFileAuthState('session');
  global.botStartTime = Date.now();

  const cuervo = makeWASocket({
    printQRInTerminal: !usePairingCode,
    auth: session.state,
    logger: pino({ level: 'silent' }).child({ level: 'silent' })
  });
  global.isBotReady = false; // inicialmente falso // initially false

  // ✅ Guardar número del bot (para detección de auto-chat) // ✅ Save bot number (for self-chat detection)
  global.botNumber = cuervo.user.id.split(':')[0]; // 'cuervo' en lugar de 'kizon'

  // ✅ Emparejamiento QR si no está conectado // ✅ QR Pairing if not connected
  if (usePairingCode && !cuervo.user && !cuervo.authState.creds.registered) { // 'cuervo' en lugar de 'kizon'
    const rl = await import('readline');
    const rlInterface = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (text) => new Promise(res => rlInterface.question(text, res));
    const waNumber = await question("Masukkan nomor WhatsApp Anda: +");
    const code = await cuervo.requestPairingCode(waNumber.replace(/\D/g, "")); // 'cuervo' en lugar de 'kizon'
    console.log(`\x1b[44;1m\x20CÓDIGO DE EMPAREJAMIENTO\x20\x1b[0m\x20${code}`); // CÓDIGO DE EMPAREJAMIENTO
    rlInterface.close();
  }

  // ✅ Mensajes entrantes // ✅ Incoming messages
  cuervo.ev.on("messages.upsert", async ({ messages }) => { // 'cuervo' en lugar de 'kizon'
    const m = messages[0];
    if (!m.message) return;

    // ✅ Permitir mensajes del propio bot // ✅ Allow messages from the bot itself
    const senderJid = m.key.participant || m.key.remoteJid || '';
    const senderNum = senderJid.split('@')[0];
    const isFromBot = senderNum === global.botNumber;

    // ✅ Lectura automática // ✅ Auto-read
    await cuervo.readMessages([m.key]); 

    // ✅ Manejar comando // ✅ Handle command
    await handleMessage(m, cuervo); 
  });

  // ✅ Conexión // ✅ Connection
  cuervo.ev.on("connection.update", async ({ connection, lastDisconnect }) => { 
  if (connection === "open") {
    console.log("✅ Conectado con:", cuervo.user.id.split(':')[0]); 
    global.isBotReady = true;
  }
  if (connection === "close") {
    global.isBotReady = false;
    const code = lastDisconnect?.error?.output?.statusCode;
    if (code === 401) {
      await fs.promises.rm("session", { recursive: true, force: true });
    }
    return start();
  }
});

  // ✅ Guardar sesión automáticamente // ✅ Auto-save session
  cuervo.ev.on("creds.update", session.saveCreds); 
})();
