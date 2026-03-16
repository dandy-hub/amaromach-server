import server from './routes/router';
const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
