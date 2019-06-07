/*
 POST for adding projects.

 POST for adding actions.

 GET for retrieving a project by its id that returns an object with the following structure:

{
  id: 1,
  name: 'project name here',
  description: 'the project description',
  completed: false, // or true, the database will return 1 for true and 0 for false
  actions: [
    {
      id: 1,
      description: 'action description',
      notes: 'the action notes',
      completed: false // or true
    },
    {
      id: 7,
      description: 'another action description',
      notes: 'the action notes',
      completed: false // or true
    }
  ]
}


 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const PORT = 4444;

const middleware = [
  helmet(),
  cors(),
  express(),
];

server.use(middleware);

server.get('/', (req, res) => {
  res.json({
    message: "Api is working",
  });
});

server.get('/api/projects/:id', async (req, res) => {
  try {
    
  } catch (error) {
    
  }
});

server.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
