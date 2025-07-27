import fs from 'fs';

export function getMode() {
  const data = JSON.parse(fs.readFileSync('./cuervo/mode.json'));
  return data.mode;
}

export function setMode(newMode) {
  const data = { mode: newMode };
  fs.writeFileSync('./cuervo/mode.json', JSON.stringify(data, null, 2));
}