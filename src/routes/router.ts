import http, { IncomingMessage, ServerResponse } from 'http';
import { getPackageJsonUpdateDate, getUpperCasedContent } from '../controllers/controller';
export const router = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/package-json-modification-date':
      return getPackageJsonUpdateDate(res);
    case '/uppercased-content':
      return getUpperCasedContent(res);
    default:
      res.statusCode = 404;
      res.end('Not Found');
  }
};
