import http, { IncomingMessage, ServerResponse } from 'http';
import { getPackageJsonUpdateDate, getUpperCasedContent } from '../controllers/controller';
export default http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    if (req.url === '/uppercased-content') {
      getUpperCasedContent(res);
      return;
    }
    
    if (req.url === '/package-json-modification-date') {
      getPackageJsonUpdateDate(res);
      return;
    }
  }

  res.statusCode = 404;
  res.end('Not Found');
});
