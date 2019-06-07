const db = require('./models')('project');
  /*
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

const getProject = id => {
  return db.cb(async (db) => {
    const actions = await db('action')
      .where('project_id', id);
    const project = await db('project')
      .where('id', id)
      .first();

    return {
      ...project,
      actions,
    };
  });
}

module.exports = {
  ...db,
  getProject,
};
