const express = require('express');

const actionRouter = require('./routes/actionRouter.js');
const projectRouter = require('./routes/projectRouter.js');

const server = express();

server.use(express.json());

server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', function (req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));