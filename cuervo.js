// kizonn.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const yts = require('yt-search');
import { botName, ownerName, ownerNumber, getTime, mode, getDate, prefix } from './cuervo/config.js';
import { getBuffer, fetchJson, baileys } from './cuervo/utils.js';
import { addOwner, removeOwner, getOwners } from './cuervo/cuervo.js';
import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs';
import { getMode, setMode } from './cuervo/mode.js';
import menuHandler from './CuervoOFC/00-menu.js';
import playHandler from './CuervoOFC/01-play.js';
import stickerHandler from './CuervoOFC/02-stiker.js';
import tangallHandler from './CuervoOFC/03-tangall.js';
import adminsHandler from './CuervoOFC/04-admins.js';
import promoteHandler from './CuervoOFC/05-promote.js';
import demoteHandler from './CuervoOFC/06-demote.js';
import cleanHandler from './CuervoOFC/07-clean.js';
import inviteHandler from './CuervoOFC/08-invite.js';
import notifyHandler from './CuervoOFC/09-notify.js';
import infoHandler from './CuervoOFC/10-info.js';
import groupHandler from './CuervoOFC/11-group.js';
import tagHandler from './CuervoOFC/12-tag.js';
import translateHandler from './CuervoOFC/13-translate.js';
import kickHandler from './CuervoOFC/14-kick.js';
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent,  proto,  generateWAMessageContent, generateWAMessage,  prepareWAMessageMedia,  downloadContentFromMessage,  areJidsSameUser,  getContentType } = require('@whiskeysockets/baileys')



const profileCache = {}; // Cache de foto de perfil de usuario // User profile picture cache
const img = ''; // Imagen por defecto // Default image
async function getUserProfile(bot, jid) {
  if (profileCache[jid]) return profileCache[jid];
  try {
    const url = await bot.profilePictureUrl(jid, 'image');
    profileCache[jid] = url;
    return url;
  } catch {
    return img;
  }
}

export default async function handleMessage(m, bot) {
  const body =  (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.message.listResponseMessage && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith('.') && m.message.listResponseMessage.singleSelectReply.selectedRowId) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
  //m.message?.conversation || m.message?.extendedTextMessage?.text || m.message?.buttonsResponseMessage?.selectedDisplayText || m.message?.templateButtonReplyMessage?.selectedDisplayText || m.message?.listResponseMessage?.title || m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.message?.templateButtonReplyMessage?.selectedId || m.message?.buttonsResponseMessage?.selectedButtonId || '';
  if (!body.startsWith(prefix)) return;

  // Se mueve la definición de 'reply' al inicio para que esté disponible
  const reply = (msg) => {
    if (bot?.sendMessage && m.key?.remoteJid) {
      bot.sendMessage(m.key.remoteJid, { text: msg }, { quoted: m });
    } else {
      console.error("No se pudo enviar la respuesta: el bot no está listo o falta remoteJid.", msg); // console.error: español
    }
  };

  if (!bot?.sendMessage || !bot?.user?.id) {
    reply("⏳ Бот ещё не готов. Попробуйте позже."); // Texto visible: ruso
    return;
  }
  const args = body.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const text = args.join(' ');
  const sender = (m.key.participant || m.key.remoteJid || '').split('@')[0];
  const isOwner = ownerNumber.includes(sender);
  
console.log('=== DEPURACIÓN ==='); // console.log: español
console.log('Cuerpo:', body); // console.log: español
console.log('Comando:', command); // console.log: español
console.log('Argumentos:', args); // console.log: español
console.log('Remitente:', sender); // console.log: español

  switch (command) {
    case 'меню': {
    await menuHandler(m, { bot, reply });
    break
    }
    
    case 'вызов': {
    await tangallHandler(m, { bot, reply })
    }
    
    case 'администраторы': {
    await adminsHandler(m, { bot, reply })
    }
    
    case 'продвигать': {
    await promoteHandler(m, { bot, reply })
    }
    
    case 'деградировать': {
    await demoteHandler(m, { bot, reply })
    }
    
    case 'чистый': {
    await cleanHandler(m, { bot, reply })
    }
    
    case 'приглашать': {
    await inviteHandler(m, { bot, reply})
    }
    
    case 'уведомить': {
    await notifyHandler(m, { bot, reply })
    }
    
    case 'информация': {
    await infoHandler(m, { bot, reply})
    }
    
    case 'кластер': {
    await groupHandler(m, { bot, reply })
    }
    
    case 'галочка': {
    await tagHandler(m, { bot, reply })
    }
    
    case 'переводить': {
    await translateHandler(m, { bot, reply })
    }
    
    case 'устранять': {
    await kickHandler(m, { bot, reply })
    }
      
    case 'пинг': { // Comando: ruso
      reply('🏓 Понг!'); // Texto visible: ruso
      break;
    }

    case 'тест': // Comando: ruso (cambiado de 'tes' a 'тест' para "test")
    case 'бот': { // Comando: ruso
      const uptime = process.uptime();
      const format = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        return `${h} часов ${m} минут ${sec} секунд`; // Texto visible: ruso
      };
      reply(`🤖 *Бот активен в течение:* ${format(uptime)}`); // Texto visible: ruso
      break;
    }

    case 'режим': { // Comando: ruso
      if (!isOwner) return reply('❌ Только для владельца.'); // Texto visible: ruso
      if (text === 'публичный' || text === 'частный') {
        setMode(text);
        reply(`✅ Режим изменен на *${text.toUpperCase()}*.`); // Texto visible: ruso
      } else {
        reply('Используйте: .mode public / .mode private'); // Texto visible: ruso
      }
      break;
    }

    case 'добавитьвладельца': { // Comando: ruso
      if (!isOwner) return reply('❌ Только для владельца.'); // Texto visible: ruso
      const number = text.replace(/[^0-9]/g, '');
      if (!number) return reply('❗ Введите номер, который хотите сделать владельцем.'); // Texto visible: ruso
      addOwner(number);
      reply(`✅ Номер ${number} теперь является владельцем.`); // Texto visible: ruso
      break;
    }

    case 'удалитьвладельца': { // Comando: ruso
      if (!isOwner) return reply('❌ Только для владельца.'); // Texto visible: ruso
      const number = text.replace(/[^0-9]/g, '');
      if (!number) return reply('❗ Введите номер, который хотите удалить из владельцев.'); // Texto visible: ruso
      removeOwner(number);
      reply(`❌ Номер ${number} удален из владельцев.`); // Texto visible: ruso
      break;
    }

    case 'играть': { // Comando: ruso
      await playHandler(m, { text, command, reply, bot });
      break;
    }

    case 'стикер': // Comando: ruso
    case 'стикер': { // Comando: ruso
      await stickerHandler(m, { bot });
      break;
    }

    default: {
      reply(`\`१✿ᩧ┅═❏✧͚Юмэко Бот ❏═┅✿ᩧ̼१\`\n> _*❌ Команда не распознана, использует .меню*_\n\`︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶\``); // Texto visible: ruso
    }
  }
}
