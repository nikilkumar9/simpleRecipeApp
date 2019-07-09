import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Fried Chicken',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chicken-tandori-1526595014.jpg',
      ingredients: ['Chicken', 'Spices']
    },
    {
      id: 'r2',
      title: 'Spagetti',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg',
      ingredients: ['Tomato', 'Noodles']
    },
  ];

  // Functions to allow data to be pushed out.
  getAllrecipies() {
    return [...this.recipes];
  }

  getRecipe(recipeID: string) {
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeID;
    })};
  }

  // Functions to data manipulation.
  deleteRecipe(recipeID: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeID;
    });
  }

  constructor() { }
}
