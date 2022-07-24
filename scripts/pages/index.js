import {recipesPageFactory} from "../factories/recipesPageFactory.js";
// import {gestureSomeButtons} from "../component/searchButtons.js";

// gestureSomeButtons;

let recipesFile = [];
let recipes = [];
let recipesList = [];
// tableaux pour travailler les diverses listes liées aux boutons de filtres
let arr1 = [];
let arr2 = [];
let arr3 = [];
let arrIngredients = [];
let arrUstensiles = [];
let arrAppareils = [];

    async function getRecipes() {
        
        try{
            let response = await fetch("../../data/recipesFile.json")
                if(response.ok){
                    let data = await response.json()
                    recipesFile = data;
                } else {
                    console.error('retour du serveur : ', response.statut);
                } 
        } catch(e){
            console.log(e);
        }

        recipes = recipesFile.recipes;
        // console.log(recipes)
        localStorage.setItem('recipesList', JSON.stringify(recipes));
        

        recipes.forEach(recipe => {
            // on fait les tableaux nécessaires
            recipe.ingredients.map((ingredient) => {
                arr1.push(ingredient.ingredient);
            });
            recipe.ustensils.map((ustensile) => {
                arr2.push(ustensile);
            });
            arr3.push(recipe.appliance);
        });

           
        // suppression des doublons, prenant en compte majuscules / minuscules 
        let triArrIngredients = arr1.map(x => typeof x === 'string' ? x.toLowerCase() : x);
         arrIngredients =  Array.from(new Set(triArrIngredients));
        let triArrUstensiles = arr2.map(x => typeof x === 'string' ? x.toLowerCase() : x);
        arrUstensiles =  Array.from(new Set(triArrUstensiles));
        let triArrAppareils = arr3.map(x => typeof x === 'string' ? x.toLowerCase() : x);
        arrAppareils =  Array.from(new Set(triArrAppareils));

        // enregistrement des tableaux dans le localstorage
        localStorage.setItem('ingredientsList', JSON.stringify(arrIngredients));
        localStorage.setItem('ustensilesList', JSON.stringify(arrUstensiles));
        localStorage.setItem('appareilsList', JSON.stringify(arrAppareils));

        return recipes;
    }

    // ['mousemove', 'touchmove'].forEach(function(event) { window.addEventListener(event, handler);});

    // "mousemove touchmove".split(" ").forEach(function(e){
    //     window.addEventListener(e,mouseMoveHandler,false);
    //   });

    async function displayData(recipesList) {
        // récupération de la section html à travailler
        const recipesSection = document.getElementById("recipes-section");
    
        // itération pour sélectionner chaque recette de la liste des recettes
        recipesList.forEach((recipe) => {
            // récupération du design pattern factory
            const recipeModel = recipesPageFactory();
            // récupération de méthode du design pattern factory avec l'objet recette en argument
            const recipeBody = recipeModel.getRecipeCard(recipe);
            // injection des éléments créés dans la section des recettes
            recipesSection.appendChild(recipeBody);
        });
    };
    
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    async function init() {
        // récupérer le résultat de la fonction qui récupère la liste des recettes
        recipesList = await getRecipes(recipes);
        
        displayData(recipesList);
    };
    
    init();



