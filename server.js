const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const PORT = 4444;

const projectDB = require('./data/project-models');
const actionDB = require('./data/action-models');
const errorRef = require('./helpers/errorRef');
const validateBody = require('./middleware/validateBody');
const validateId = require('./middleware/validateId');

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

// POST Project
server.post('/api/projects', validateBody({
  name: {
    type: 'string',
    required: true,
  },
}), async (req, res) => {
  try {
    const project = await projectDB.add(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// POST Action
server.post('/api/actions', validateBody({
  description: {
    type: 'string',
    required: true,
  },
  project_id: {
    type: 'number',
    required: true,
    exists: {
      database: require('./data/models'),
      table: 'project',
      column: 'id',
    }
  }
}), async (req, res) => {
  try {
    const action = await actionDB.add(req.body);
    res.json(action);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// GET Project By Id
server.get('/api/projects/:id', validateId(projectDB), async (req, res) => {
  try {
    const project = await projectDB.getProject(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(err));
  }
});

server.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
