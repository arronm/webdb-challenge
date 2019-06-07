const db = require('./models')('action');

const getAction = id => {
  return db.cb(async (db) => {
    const contexts = await db('action_context')
      .join('action', 'action.id', 'action_context.id')
      .join('context', 'context.id', 'action_context.id')
      .select('context.name')
      .where('action_context.action_id', id)
      .map(context => context.name);
    const action = await db('action')
      .where('id', id)
      .first();

      console.log('did you even wait', {
        ...action,
        contexts
      });
    return {
      ...action,
      contexts
    }
  });
};

module.exports = {
  ...db,
  getAction,
};
