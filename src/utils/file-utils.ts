import fs from 'fs';

export function getFileContent(): string {
  return fs.readFileSync('./src/assets/content.txt', 'utf-8');
}
