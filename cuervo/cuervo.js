// kizon/owner.js
import fs from 'fs';

const filePath = './cuervo/cuervo.json';

export function getOwners() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    return data.owners || [];
  } catch (err) {
    return [];
  }
}

export function saveOwners(list) {
  const data = { owners: list };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addOwner(number) {
  const list = getOwners();
  if (!list.includes(number)) {
    list.push(number);
    saveOwners(list);
  }
}

export function removeOwner(number) {
  const list = getOwners().filter(n => n !== number);
  saveOwners(list);
}