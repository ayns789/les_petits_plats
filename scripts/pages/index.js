import {recipesPageFactory} from "../factories/recipesPageFactory.js";

let recipesFile = [];
let recipes = [];
let recipesList = [];
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
        // arrIngredients = [...new Set (arrIngredients)].sort();
        // arrUstensiles = [...new Set (arrUstensiles)].sort();
        // arrAppareils = [...new Set (arrAppareils)].sort();

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
const bigSearchBar = document.getElementById("searchTerm");

function nullableRecipesSection(){
    const recipesSection = document.getElementById("recipes-section");
    const messageError = document.createElement("p");
    messageError.textContent = " Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    messageError.style.display = "flex";
    messageError.style.fontSize = "36px";
    messageError.style.width = "80vw";
    messageError.style.flexDirection = "row";
    messageError.style.alignItems = "center";
    messageError.style.color = "black";
    messageError.style.marginTop = "2em";
    recipesSection.appendChild(messageError);
    
}



function updateRecipesSection(recipesList){
        // récupération de la section html à travailler
        const recipesSection = document.getElementById("recipes-section");
    
        // vider la section
        recipesSection.textContent = "";

        // itération pour sélectionner chaque recette de la liste des recettes
        recipesList.forEach((recipe) => {
            // récupération du design pattern factory global
            const recipeModel = recipesPageFactory();
            // récupération de méthode du design pattern factory avec l'objet recette en argument
            const recipeBody = recipeModel.getRecipeCard(recipe);
            // injection des éléments créés dans la section des recettes
            recipesSection.appendChild(recipeBody);
        });

}


// function filterRecipes(event){
    bigSearchBar.addEventListener("input", (e) => {
        let recipesList = JSON.parse(localStorage.getItem("recipesList"));
    // bigSearchBar.addEventListener("input", filterRecipes(recipesList))
    let value = e.target.value;

        // // méthode 2 filtre générique
        // const containsDeep = (text) => (value) => {
        //     if(!value) return false;
        //     const valueType = typeof value;
            
        //     if(valueType === 'string') {
        //       return value.toLowerCase().indexOf(text.toLowerCase()) > -1;
        //     }
        //     if(Array.isArray(value)) {
        //       return value.some(containsDeep(text));
        //     }
        //     if(valueType === 'object') {
        //       return Object.values(value).some(containsDeep(text));
        //     }
        //     return false;
        //   };

        let resultResearchInPage = [];

        
        function isEmpty(value){
            return (value == null || value.length === 0);
          }

        if(value.length >= 3){
            resultResearchInPage = recipesList.filter(recipesList => recipesList.name.toLowerCase().includes(value.toLowerCase()) 
            || recipesList.description.toLowerCase().includes(value.toLowerCase()) 
            || recipesList.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(value.toLowerCase())));
            // || recipesList.ingredients.ingredient.filter(containsDeep(value)));

        //    resultResearchInPage = recipesList.filter(containsDeep(value));
        //    resultResearchInPage = recipesList.filter(recipesList => recipesList.name(containsDeep(value))
        //    || recipesList.description(containsDeep(value)));

            
            recipesList = resultResearchInPage;
            updateRecipesSection(recipesList);

            if(isEmpty(recipesList)){
                nullableRecipesSection()
            } 
            
        } else if (value.length < 3){
            recipesList = "";
            recipesList = JSON.parse(localStorage.getItem("recipesList"));
            updateRecipesSection(recipesList);
        }

    })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     const list = ['apple', 'banana', 'orange', 'strawberry']
// const size = 3
// const items = list.slice(0, size) // res: ['apple', 'banana', 'orange']
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function init() {
        // récupérer le résultat de la fonction qui récupère la liste des recettes
        recipesList = await getRecipes(recipes);
        
        displayData(recipesList);
    };
    
    init();


    // // fonction pour recalculer une hauteur d'un textarea :
    // let textarea = document.querySelector(".resize-ta");
    // textarea.addEventListener("keyup", () => {
    //   textarea.style.height = calcHeight(textarea.value) + "px";
    // });
    // // fonction recalcul width input
    // input1.addEventListener("keyup", () => {
    //     input1.style.width = calcWidth(input1.value) + "px";
    // });

    // let inputs = document.querySelector(".inpBtn");
    // inputs.addEventListener("keyup", () => {
    //     inputs.style.width = calcWidth(inputs.value) + "px";
    // });

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////



// ------------------- les 3 inputs spécifiques ---------------------

const btn1 = document.getElementById("visualBtn1");
const btn2 = document.getElementById("visualBtn2");
const btn3 = document.getElementById("visualBtn3");
const realInput1 = document.getElementById("realInput1");
const realInput2 = document.getElementById("realInput2");
const realInput3 = document.getElementById("realInput3");
const input1 = document.getElementById("inpBtn1");
const input2 = document.getElementById("inpBtn2");
const input3 = document.getElementById("inpBtn3");
const ulBtn1 = document.getElementById("ulBtn1");
// let li = document.createElement('li');

let numberIteration = 0;
let tabIngredients = [];
// let resultResearchInIngredients;

btn1.addEventListener('click', () => {
    btn1.style.display = "none";
    realInput1.style.display = "block";
    // input1.click();
    let dataRecipes = "";
     dataRecipes = JSON.parse(localStorage.getItem("recipesList"));
    ulBtn1.innerHTML = "";
    const li = document.createElement('li');

dataRecipes.forEach((recipeItem) => {
    for ( let i = 0; i < recipeItem.ingredients.length; i++) {
        // if (i > 30) { break; }
        const li = document.createElement('li');
         tabIngredients = recipeItem.ingredients[i].ingredient;
            li.innerHTML = tabIngredients;
            // console.log(tabIngredients)
            // li.innerHTML = recipeItem.ingredients[i].ingredient;
            ulBtn1.appendChild(li);
            numberIteration++
            if (numberIteration > 30) { 
                li.innerHTML = "";
                break; 
            }
            
            
        }
})
input1.addEventListener("input", (e) => {
    let value = e.target.value;
    let tabIngredients = JSON.parse(localStorage.getItem("ingredientsList"));
    // console.log(tabIngredients)
    if(value.length >= 3){
        ulBtn1.innerHTML = ""; 
                let resultResearch = [];
                // filtrer et récupérer les éléments correspondants à la saisie utilisateur
                resultResearch = tabIngredients.filter(tabIngredients =>  tabIngredients.toLowerCase().includes(value.toLowerCase()));
            
                // inscrire chaque résultat sous forme de li, dans l'élément "ul"
                for(let i = 0; i < resultResearch.length; i++){
                    const li = document.createElement('li');  
                    li.innerHTML = resultResearch[i];
                    ulBtn1.appendChild(li);
                    // arrIngred.push(result);
                }

                // comportement visuel de l'input et du sous menu "ul"
                if(resultResearch.length <= 10){
                    ulBtn1.style.gridTemplateColumns = "repeat(1, 1fr)";
                    ulBtn1.style.width = "15vw";
                    input1.style.width = "15vw !important";
                    // realInput1.style.width = "15vw !important";
                } else if(resultResearch.length >= 11 && resultResearch.length <= 20){
                    ulBtn1.style.gridTemplateColumns = "repeat(2, 2fr)";
                    ulBtn1.style.width = "28vw";
                    input1.style.width = "28vw";
                } else {
                    ulBtn1.style.gridTemplateColumns = "repeat(3, 3fr)";
                    ulBtn1.style.width = "40vw";
                    input1.style.width = "40vw";
                }

// console.log(result);

            }
            
    })

    ulBtn1.classList.remove('hidden');
    
})




// console.log(listIngredients.substring(9, 3000))
// console.log(ulBtn1)
 


input1.addEventListener('focusout', () => {
    realInput1.style.display = "none";
    btn1.style.display = "flex";
    ulBtn1.classList.add('hidden');
    numberIteration = 0;
})

// const list = ['apple', 'banana', 'orange', 'strawberry']
// const size = 3
// const items = list.slice(0, size) // res: ['apple', 'banana', 'orange']

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
