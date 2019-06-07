const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const PORT = 4444;

const projectRouter = require('./routers/projects');
const actionRouter = require('./routers/actions');

const middleware = [
  helmet(),
  cors(),
  express.json(),
];

server.use(middleware);

server.get('/', (req, res) => {
  res.json({
    message: "Api is working",
  });
});

// Project Router
server.use('/api/projects', projectRouter);

// Action Router
server.use('/api/actions', actionRouter);

server.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
