import { getFileContent } from '../utils/file-utils';
import fs from 'fs';

export async function getUpperCaseContent(): Promise<string> {
  return (await getFileContent()).toUpperCase();
}

export async function getPackageJsonUpdateDate(): Promise<string> {
  return fs.statSync('./package.json').mtime.toLocaleString();
}
