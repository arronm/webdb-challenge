exports.up = function(knex, Promise) {
  // create context table
  // create action_context table
  return knex.schema
    .createTable('context', table => {
      table.increments();
      table.string('name', 32).notNullable();
    })
    .createTable('action_context', table => {
      table.increments();
      table.integer('action_id')
        .unsigned()
        .references('id')
        .inTable('action')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('context_id')
        .unsigned()
        .references('id')
        .inTable('context')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('action_context')
    .dropTableIfExists('context');
};
