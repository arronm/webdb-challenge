const faker = require('faker');

const newFakerProject = () => ({
  name: faker.lorem.sentence(1, 3),
  description: faker.lorem.sentence(8, 5),
  complete: faker.random.boolean(),
});

const newFakerAction = () => ({
  description: faker.lorem.sentence(2, 5),
  notes: faker.lorem.paragraph(3),
  complete: faker.random.boolean(),
});

exports.seed = function(knex, Promise) {
  fakeProjects = [];
  fakeActions = [];
  
  for (let i = 0; i < 50; i++) {
    numberOfActions = Math.floor(Math.random() * 5) + 1;
    fakeProjects.push(newFakerProject());

    for (let j = 0; j <= numberOfActions; j++) {
      fakeActions.push({
        ...newFakerAction(),
        project_id: i,
      })
    }
  }

  return knex('project').truncate()
    .then(() => {
      return knex('project').insert(fakeProjects);
    })
    .then(() => {
      return knex('action').truncate()
        .then(() => {
          return knex('action').insert(fakeActions);
        })
    })
}