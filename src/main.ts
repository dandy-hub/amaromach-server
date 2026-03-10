import http, { IncomingMessage, ServerResponse } from 'http';
import { router ,registerRoute} from './routes/router';
import { getPackageJsonUpdateDate, getUpperCaseContent } from './controllers/controller';

registerRoute('GET', '/uppercasedContent', getUpperCaseContent);
registerRoute('GET', '/packageJsonModificationDate', getPackageJsonUpdateDate);

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  router(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
