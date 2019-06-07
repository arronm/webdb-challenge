exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('project', table => {
      table.increments();
      table.string('name', 64).notNullable();
      table.string('description', 128);
      table.boolean('complete').defaultTo(false);
    })
    .createTable('action', table => {
      table.increments();
      table.string('description', 128).notNullable();
      table.string('notes', 256);
      table.boolean('complete').defaultTo(false);
      table.integer('project_id')
        .unsigned()
        .references('id')
        .inTable('project')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('action')
    .dropTableIfExists('project');
};
