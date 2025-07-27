// utils.js
import fetch from 'node-fetch';
const { proto, generateWAMessage, areJidsSameUser, decryptPollVote, } = (await import('@whiskeysockets/baileys')).default;
export const getBuffer = async (url) => {
  const res = await fetch(url);
  return await res.buffer();
};

export const fetchJson = async (url, options) => {
  const res = await fetch(url, options);
  return await res.json();
};

export const baileys = async (m, chatUpdate, proto, generateWAMessage, areJidsSameUser, decryptPollVote) => {
if (m.isBaileys) {
return
}
if (!m.message) {
return
}
if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) {
return
}
let id
if (m.message.buttonsResponseMessage) {
id = m.message.buttonsResponseMessage.selectedButtonId
} else if (m.message.templateButtonReplyMessage) {
id = m.message.templateButtonReplyMessage.selectedId
} else if (m.message.listResponseMessage) {
id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
} else if (m.message.interactiveResponseMessage) {
id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id
}
const text = m.message.buttonsResponseMessage?.selectedDisplayText || m.message.templateButtonReplyMessage?.selectedDisplayText || m.message.listResponseMessage?.title
let isIdMessage = true 
const messages = await generateWAMessage(m.chat, {text: isIdMessage ? id : text, mentions: m.mentionedJid}, {
userJid: this.user.id,
quoted: m.quoted && m.quoted.fakeObj,
})
messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
messages.key.id = m.key.id
messages.pushName = m.name
if (m.isGroup) {
messages.key.participant = messages.participant = m.sender
}
const msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)].map((v) => (v.conn = this, v)),
type: 'append',
}
this.ev.emit('messages.upsert', msg)
                              }
