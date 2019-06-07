const db = require('./models')('recipe');

// const getRecipe = id => {
//   return db.cb(async (db) => {
//     const ingredients = await db('recipe_ingredients as ri')
//       .join('recipe', 'recipe.id', 'ri.recipe_id')
//       .join('ingredient', 'ingredient.id', 'ri.ingredient_id')
//       .select('ingredient.name', 'ingredient.quantity', 'ingredient.unit')
//       .where('ri.id', id);
//     const recipe = await db('recipe')
//       .join('dish', 'dish.id', 'recipe.dish_id')
//       .select('dish.name as dish', 'recipe.name as recipe')
//       .where('recipe.id', id)
//       .first();
//     return {
//       ...recipe,
//       ingredients,
//     };
//   });
// }

module.exports = {
  ...db,
  // getRecipe,
};
