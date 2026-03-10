import { getFileContent } from '../utils/file-utils';
import fs from 'fs';

export function getUpperCaseContent(): string {
  return getFileContent().toUpperCase();
}

export function getPackageJsonUpdateDate(): string {
  return fs.statSync('./package.json').mtime.toLocaleString();
}
