import {recipesPageFactory} from "../factories/recipesPageFactory.js";


const bigSearchBar = document.getElementById("searchTerm");


// fonction pour afficher message d'erreur, si recherche d'une recette n'a pas de correspondance
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

        // fonction pour controler si la recherche n'a aucun résultat
        function isEmpty(value){
            return (value == null || value.length === 0);
          }
        //   let testListIng = [];
        //    testListIng = recipesList.ingredients;

        if(value.length >= 3){
            resultResearchInPage = recipesList.filter(recipesList => recipesList.name.toLowerCase().includes(value.toLowerCase()) 
            || recipesList.description.toLowerCase().includes(value.toLowerCase()) 
            // || testListIng.ingredient.toLowerCase().includes(value.toLowerCase()) )
            || recipesList.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(value.toLowerCase())));
            // || recipesList.filter(x => x.ingredients.every(y => y.ingredient.toLowerCase().includes(value.toLowerCase()))));

            // || recipesList.ingredients.ingredient.filter(containsDeep(value)));
            
        //    resultResearchInPage = recipesList.filter(containsDeep(value));
        //    resultResearchInPage = recipesList.filter(recipesList => recipesList.name(containsDeep(value))
        //    || recipesList.description(containsDeep(value)));

            
            recipesList = resultResearchInPage;
            // appeler fonction pour mettre à jour la section avec les résultats de la recherche
            updateRecipesSection(recipesList);

            // si la recherche n'a aucun résultat, appeler la fonction qui affiche message d'erreur
            if(isEmpty(recipesList)){
                nullableRecipesSection()
            } 
            
        } else if (value.length < 3){
            recipesList = "";
            recipesList = JSON.parse(localStorage.getItem("recipesList"));
            updateRecipesSection(recipesList);
        }

    })


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


function gestureBtn1(){
    let numberIteration = 0;
    let tabIngredients = [];
    // remplacement du bouton par l'input, avec retouche design 
    btn1.style.display = "none";
    realInput1.style.display = "flex";
    input1.style.width = "40vw";
    // récupération de la liste des recettes
    let dataRecipes = "";
     dataRecipes = JSON.parse(localStorage.getItem("recipesList"));
    // vider la liste du sous menu de l'input
    ulBtn1.innerHTML = "";

    // itérer la liste de recettes pour rrécupérer chaque ingrédient et les placer dans le sous menu
    dataRecipes.forEach((recipeItem) => {
        for ( let i = 0; i < recipeItem.ingredients.length; i++) {
            // if (i > 30) { break; }
            const li = document.createElement('li');
            tabIngredients = recipeItem.ingredients[i].ingredient;
                li.innerHTML = tabIngredients;
                ulBtn1.appendChild(li);
                numberIteration++
                if (numberIteration > 30) { 
                    li.innerHTML = "";
                    break; 
                }
                
                
            }
    })
}

btn1.addEventListener('click', () => {
    // initialisation du sous menu et de l'input avec la fonction gestureBtn1
    gestureBtn1();

        input1.addEventListener("input", (e) => {
            // récupération de la valeur saisie par l'utilisateur
            let value = e.target.value;
            // récupération de la liste des ingrédients
            let tabIngredients = JSON.parse(localStorage.getItem("ingredientsList"));
            // design par défaut de l'input et du sous menu
            ulBtn1.style.gridTemplateColumns = "repeat(3, 3fr)";
            ulBtn1.style.width = "40vw";
            input1.style.width = "40vw";
            
            if(value.length >= 3){
                ulBtn1.innerHTML = ""; 
                input1.style.width = "40vw";
                        let resultResearch = [];
                        // filtrer et récupérer les éléments correspondants à la saisie utilisateur
                        resultResearch = tabIngredients.filter(tabIngredients =>  tabIngredients.toLowerCase().includes(value.toLowerCase()));
                    
                        // inscrire chaque résultat sous forme de li, dans l'élément "ul"
                        for(let i = 0; i < resultResearch.length; i++){
                            const li = document.createElement('li');  
                            li.innerHTML = resultResearch[i];
                            ulBtn1.appendChild(li);
                        }
                    // comportement visuel de l'input et du sous menu "ul"
                    if( resultResearch.length <= 10){
                        ulBtn1.style.gridTemplateColumns = "repeat(1, 1fr)";
                        ulBtn1.style.width = "13vw";
                        input1.style.width = "13vw";
                    } else if(resultResearch.length >= 11 && resultResearch.length <= 20){
                        ulBtn1.style.gridTemplateColumns = "repeat(2, 2fr)";
                        ulBtn1.style.width = "25vw";
                        input1.style.width = "25vw";
                    } else if (resultResearch.length >= 21 && resultResearch.length <= 30){
                        ulBtn1.style.gridTemplateColumns = "repeat(3, 3fr)";
                        ulBtn1.style.width = "40vw";
                        input1.style.width = "40vw";
                    } 
                }  else {
                    // réinitialisation du sous menu et de l'input avec la fonction gestureBtn1
                    gestureBtn1();
                    }
            })

    ulBtn1.classList.remove('hidden');
    
})
 

// réinitialisation du bouton ingredients, quand on click ailleurs
input1.addEventListener('focusout', () => {
    realInput1.style.display = "none";
    btn1.style.display = "flex";
    ulBtn1.classList.add('hidden');
    // numberIteration = 0;
})



// const list = ['apple', 'banana', 'orange', 'strawberry']
// const size = 3
// const items = list.slice(0, size) // res: ['apple', 'banana', 'orange']

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////