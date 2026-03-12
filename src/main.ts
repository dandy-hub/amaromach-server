import http, { IncomingMessage, ServerResponse } from 'http';
import { router, registerRoute } from './routes/router';
import { getPackageJsonUpdateDate, getUpperCaseContent } from './controllers/controller';

registerRoute('GET', '/uppercased-content', getUpperCaseContent);
registerRoute('GET', '/package-json-modification-date', getPackageJsonUpdateDate);

const port = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  router(req, res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
