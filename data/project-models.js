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
}

module.exports = {
  ...db,
  getProject,
};
