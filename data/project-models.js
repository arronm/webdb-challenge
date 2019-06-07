const db = require('./models')('project');

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
};

const getActions = id => {
  return db.cb(db => {
    return db('action')
      .join('project', 'project.id', 'action.project_id')
      .select('action.id', 'action.description', 'action.notes', 'action.complete')
      .where('action.project_id', id);
  });
}

module.exports = {
  ...db,
  getProject,
  getActions,
};
