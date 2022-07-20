export function recipesPageFactory( ) {

    function getRecipeCard(recipe) {

        // console.log(recipe.ingredients[0].ingredient)
        // console.log(recipe.ingredients[0])
        // console.log(recipe)
        
        
    /////////////////////////////////////////////////



    // let line = [];
    //     for (let i = 0; i < recipe.ingredients.length; i++) {
    //          line += recipe.ingredients[i].ingredient;
    //          if(recipe.ingredients[i].quantity)line += ": " + recipe.ingredients[i].quantity;
    //          if(recipe.ingredients[i].unit)line += " " + recipe.ingredients[i].unit
    //     }
    // console.log(line)
    // let paragIngredients = document.createElement("p");
    // // let line = [];
    //     for (let i = 0; i < recipe.ingredients.length; i++) {
    //         if(!recipe.ingredients[i].quantity)paragIngredients += recipe.ingredients[i].ingredient + "</br>";
    //         if(recipe.ingredients[i].quantity && !recipe.ingredients[i].unit)paragIngredients += recipe.ingredients[i].ingredient + ": " + recipe.ingredients[i].quantity + "</br>";
    //         if(recipe.ingredients[i].unit)paragIngredients += recipe.ingredients[i].ingredient + ": " + recipe.ingredients[i].quantity + " " + recipe.ingredients[i].unit + "</br>"
    //     }
    //     // console.log(line)
    //     console.log(paragIngredients)
        

    
        /////////////////////////////////////////////////////////
            // let text;
            // for (let i = 0; i < recipe.ingredients.length; i++) {
            //     text +=  recipe.ingredients[i].ingredient + " : " + 
            //     recipe.ingredients[i].quantity + " " +  recipe.ingredients[i].unit 
            // }
            // // text += "</ul>";
            // console.log(text)

            //////////////

            

        // création des éléments nécessaires pour les données

        // div qui va tout englober
        const cardContent = document.createElement("div");

        // div qui représente l'image des cartes
        const imgCards = document.createElement('div');

        // partie header de la carte avec nom recette et durée
        const subcardContent = document.createElement('div');
        const contentHeader = document.createElement("div");
        const blockNameHeader = document.createElement("div");
        const recipeName = document.createElement("h2");
        const blockTimeRecipe = document.createElement("div");
        const imgHorloge = document.createElement('img');
        const timeHeader = document.createElement("p");

        
        // seconde partie, sous header, contenant les informations recette
        const blockParagSubCard = document.createElement('div');
        const blockListIngredients = document.createElement("div");
        const blockRecipeDescription = document.createElement("div");
        const recipeDescription = document.createElement("p");
        const paragIngredients = document.createElement('p');

        // affectation des classes
        cardContent.classList.add("cardContent");
        imgCards.classList.add("imgCards");
        contentHeader.classList.add("contentHeader");
        blockNameHeader.classList.add("blockNameHeader");
        recipeName.classList.add("recipeName");
        blockTimeRecipe.classList.add("blockTimeRecipe");
        // imgHorloge.classList.add("imgHorloge");
        timeHeader.classList.add("timeHeader");
        blockListIngredients.classList.add("blockListIngredients");
        blockRecipeDescription.classList.add("blockRecipeDescription");
        recipeDescription.classList.add("recipeDescription");
        paragIngredients.classList.add("paragIngredients");
        subcardContent.classList.add("subcardContent");
        blockParagSubCard.classList.add("blockParagSubCard");



        // affectation des valeurs

        // fonction pour fournir plusieurs attributs à un élément
        function setAttributes(el, attrs) {
            for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
            }
        }

        recipeName.textContent = recipe.name;

        setAttributes(imgHorloge, {
            "src": "../../assets/icones/horloge.svg",
            "alt": "icone d'une horloge",
            "class": "icnHorloge"
        })

        timeHeader.textContent = recipe.time + " min";

        let testParag;
        
        // const testParag = "";
        // function getValParag(){
            // recipe.ingredients[3][0].style.fontWeight = "900";
            // recipe.ingredients[i].ingredient.style.fontWeight = "900";
            for (let i = 0; i < recipe.ingredients.length; i++) {
                // recipe.ingredients[i].ingredient.style.fontWeight = "900";
                // recipe.ingredients[3][0].style.fontWeight = "900";
                if(!recipe.ingredients[i].quantity)testParag += recipe.ingredients[i].ingredient + "<br />";
                if(recipe.ingredients[i].quantity && !recipe.ingredients[i].unit)testParag += recipe.ingredients[i].ingredient + ": " + recipe.ingredients[i].quantity + "<br />";
                if(recipe.ingredients[i].unit){
                    if(recipe.ingredients[i].unit == "g" || recipe.ingredients[i].unit == "cl" || recipe.ingredients[i].unit == "ml"){
                        testParag += recipe.ingredients[i].ingredient + ": " + recipe.ingredients[i].quantity + recipe.ingredients[i].unit + "<br />";
                    } else {
                        testParag += recipe.ingredients[i].ingredient + ": " + recipe.ingredients[i].quantity + " " + recipe.ingredients[i].unit + "<br />";
                    }
                }
            
            }
            // return testParag;
        // }
     

        // .substring(14, 140)
        // paragIngredients.innerHTML = getValParag();
         paragIngredients.innerHTML = testParag.substring(9, 300);
        //  testParag.substring(9, 200)
        

        // console.log(testParag.substring(9, 200))
        // console.log(paragIngredients)

        recipeDescription.textContent = recipe.description;
        
 


        // placement des contenus dans les contenants
        blockTimeRecipe.appendChild(imgHorloge);
        blockTimeRecipe.appendChild(timeHeader);
        blockNameHeader.appendChild(recipeName);
        contentHeader.appendChild(blockNameHeader);
        contentHeader.appendChild(blockTimeRecipe);

        blockListIngredients.appendChild(paragIngredients);
        blockRecipeDescription.appendChild(recipeDescription);
        blockParagSubCard.appendChild(blockListIngredients);
        blockParagSubCard.appendChild(blockRecipeDescription);

        subcardContent.appendChild(contentHeader);
        subcardContent.appendChild(blockParagSubCard);

        cardContent.appendChild(imgCards);
        cardContent.appendChild(subcardContent);

        return cardContent;
        
    }
    
    // function getHeaderRecipeCard(){

    // }
    // function getIngredientsRecipeCard(){

    // }
    // function getDescriptionRecipeCard(){

    // }

    return { getRecipeCard };
}