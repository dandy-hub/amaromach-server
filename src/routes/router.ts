import { IncomingMessage, ServerResponse } from 'http';

type Handler = () => Promise<string>;

const routes: Record<string, { [s: string]: Handler }> = {};

export function registerRoute(type: string, url: string, handler: Handler): void {
  if (routes[type] !== undefined) {
    routes[type][url] = handler;
  } else {
    routes[type] = { [url]: handler };
  }
}

export async function router(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  const handlersWithMethod = routes[method || 'GET'];
  if (handlersWithMethod === undefined) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  if (url === undefined) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }
  const handler = handlersWithMethod[url];
  if (handler === undefined) {
    res.statusCode = 501;
    res.end('Not Implemented');
    return;
  }

  res.statusCode = 200;
  res.end(await handler());
}
