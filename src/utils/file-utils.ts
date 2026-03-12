import fs from 'fs';

export function getFileContent(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile('./src/assets/content.txt', 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

