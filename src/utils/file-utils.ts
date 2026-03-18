import fs from 'fs';

export interface FileChunk {
  serverAction: 'write' | 'end' | 'error';
  content: string;
}

const KILO_BYTE = 1024;
const MEGA_BYTE = KILO_BYTE * 1024;
const MAX_SIZE_TO_READ_AT_ONCE = 5 * MEGA_BYTE;
const CHUNK_SIZE = MEGA_BYTE;

const CONTENT_FILE_PATH = __dirname + '/../assets/content.txt';

export const getFileContent = (callback: (chunk: FileChunk) => void) => {
  try {
    const size = fs.statSync(CONTENT_FILE_PATH).size;

    if (size <= MAX_SIZE_TO_READ_AT_ONCE) {
      fs.readFile(CONTENT_FILE_PATH, 'utf-8', (err, data) => {
        if (err) {
          callback({ serverAction: 'error', content: 'Error reading file' });
          return;
        }

        callback({ serverAction: 'end', content: data });
      });

      return;
    }

    fs.createReadStream(CONTENT_FILE_PATH, { highWaterMark: CHUNK_SIZE })
      .on('data', (chunk) => {
        callback({ serverAction: 'write', content: chunk.toString() });
      })
      .on('error', (err) => {
        callback({ serverAction: 'error', content: 'Error reading file\ndetails: ' + err.message });
      })
      .on('end', () => {
        callback({ serverAction: 'end', content: '' });
      });
  } catch (err: unknown) {
    callback({
      serverAction: 'error',
      content:
        'Error accessing file\ndetails: ' + (err instanceof Error ? err.message : 'unknown error'),
    });
  }
};

export const getPackageJsonLastUpdatedDate = async (): Promise<Date | undefined> => {
  let time: Date;
  try {
    time = fs.statSync('./package.json').mtime;
  } catch (err: unknown) {
    throw new Error(
      'Error accessing package.json file\ndetails: ' + (err instanceof Error ? err.message : 'unknown error')
    );
  }
  return time;
};
