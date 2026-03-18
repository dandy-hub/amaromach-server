import http, { IncomingMessage, ServerResponse } from 'http';
import { getPackageJsonUpdateDate, getUpperCasedContent } from './controllers/controller';
import { router } from './routes/router';

const port = process.env.PORT || 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  router(req, res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
