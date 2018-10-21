export class MockRecipeEntity {
  save(recipe) {
    return recipe;
  }

  create(recipe) {
    return recipe;
  }

  findOne() {}

  merge(recipe, data) {
    return Object.assign(recipe, data);
  }

  delete() {}
}
