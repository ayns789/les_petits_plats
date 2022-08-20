import { recipesPageFactory } from '../factories/recipesPageFactory.js';

let recipesFile = [];
let recipes = [];
let recipesList = [];

async function getRecipes() {
  try {
    let response = await fetch('../../data/recipesFile.json');
    if (response.ok) {
      let data = await response.json();
      recipesFile = data;
    } else {
      console.error('retour du serveur : ', response.statut);
    }
  } catch (e) {
    console.log(e);
  }

  recipes = recipesFile.recipes;
  localStorage.setItem('recipesList', JSON.stringify(recipes));

  return recipes;
}

async function displayData(recipesList) {
  // récupération de la section html à travailler
  const recipesSection = document.getElementById('recipes-section');

  // itération pour sélectionner chaque recette de la liste des recettes
  recipesList.forEach((recipe) => {
    // récupération du design pattern factory
    const recipeModel = recipesPageFactory();
    // récupération de méthode du design pattern factory avec l'objet recette en argument
    const recipeBody = recipeModel.getRecipeCard(recipe);
    // injection des éléments créés dans la section des recettes
    recipesSection.appendChild(recipeBody);
  });
}

//////////////////////////////////////////////////////

async function init() {
  // récupérer le résultat de la fonction qui récupère la liste des recettes
  recipesList = await getRecipes(recipes);

  displayData(recipesList);
}

init();
