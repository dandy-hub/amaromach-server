import { IncomingMessage, ServerResponse } from 'http';
import { getFileContent, getPackageJsonLastUpdatedDate } from '../utils/file-utils';
import { constants } from 'http2';

export const getUpperCasedContent = async (res: ServerResponse) => {
  getFileContent((chunk) => {
    if (chunk.serverAction === 'error') {
      res.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      res.end(chunk.content);
      return;
    }

    try {
      res.statusCode = constants.HTTP_STATUS_OK;
      res[chunk.serverAction](chunk.content.toUpperCase());
    } catch (err: unknown) {
      res.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      res.end('Error trying to proccess the file content');
    }
  });
};

export const getPackageJsonUpdateDate = async (res: ServerResponse) => {
  getPackageJsonLastUpdatedDate()
    .then((date) => {
      res.statusCode = constants.HTTP_STATUS_OK;
      res.end(date ? date.toLocaleString() : 'Date not available');
    })
    .catch((err: unknown) => {
      res.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      res.end("coudn't load the last modification date of the package.json date");
    });
};
