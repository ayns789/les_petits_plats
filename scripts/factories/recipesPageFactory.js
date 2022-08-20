export function recipesPageFactory() {
  // création des éléments nécessaires pour les données
  function getRecipeCard(recipe) {
    // div qui va tout englober
    const cardContent = document.createElement('div');

    // div qui représente l'image des cartes
    const imgCards = document.createElement('div');

    // partie header de la carte avec nom recette et durée
    const subcardContent = document.createElement('div');
    const contentHeader = document.createElement('div');
    const blockNameHeader = document.createElement('div');
    const recipeName = document.createElement('h2');
    const blockTimeRecipe = document.createElement('div');
    const imgHorloge = document.createElement('img');
    const timeHeader = document.createElement('p');

    // seconde partie, sous header, contenant les informations recette
    const blockParagSubCard = document.createElement('div');
    const blockListIngredients = document.createElement('div');
    const blockRecipeDescription = document.createElement('div');
    const recipeDescription = document.createElement('p');
    const paragIngredients = document.createElement('p');

    // affectation des classes
    cardContent.classList.add('cardContent');
    imgCards.classList.add('imgCards');
    contentHeader.classList.add('contentHeader');
    blockNameHeader.classList.add('blockNameHeader');
    recipeName.classList.add('recipeName');
    blockTimeRecipe.classList.add('blockTimeRecipe');
    timeHeader.classList.add('timeHeader');
    blockListIngredients.classList.add('blockListIngredients');
    blockRecipeDescription.classList.add('blockRecipeDescription');
    recipeDescription.classList.add('recipeDescription');
    paragIngredients.classList.add('paragIngredients');
    subcardContent.classList.add('subcardContent');
    blockParagSubCard.classList.add('blockParagSubCard');

    // affectation des valeurs

    // fonction pour fournir plusieurs attributs à un élément
    function setAttributes(el, attrs) {
      for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    }

    recipeName.textContent = recipe.name;

    setAttributes(imgHorloge, {
      src: '../../assets/icones/horloge.svg',
      alt: "icone d'une horloge",
      class: 'icnHorloge',
    });

    timeHeader.textContent = recipe.time + ' min';

    let testParag = [];

    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (!recipe.ingredients[i].quantity)
        testParag +=
          '<span class="namesIng">' + recipe.ingredients[i].ingredient + '</span>' + '<br />';
      if (recipe.ingredients[i].quantity && !recipe.ingredients[i].unit)
        testParag +=
          '<span class="namesIng">' +
          recipe.ingredients[i].ingredient +
          '</span>' +
          ': ' +
          recipe.ingredients[i].quantity +
          '<br />';
      if (recipe.ingredients[i].unit) {
        if (
          recipe.ingredients[i].unit == 'g' ||
          recipe.ingredients[i].unit == 'cl' ||
          recipe.ingredients[i].unit == 'ml'
        ) {
          testParag +=
            '<span class="namesIng">' +
            recipe.ingredients[i].ingredient +
            '</span>' +
            ': ' +
            recipe.ingredients[i].quantity +
            recipe.ingredients[i].unit +
            '<br />';
        } else if (
          recipe.ingredients[i].unit == 'grammes' ||
          recipe.ingredients[i].unit == 'gramme'
        ) {
          recipe.ingredients[i].unit = 'g';
          testParag +=
            '<span class="namesIng">' +
            recipe.ingredients[i].ingredient +
            '</span>' +
            ': ' +
            recipe.ingredients[i].quantity +
            recipe.ingredients[i].unit +
            '<br />';
        } else {
          testParag +=
            '<span class="namesIng">' +
            recipe.ingredients[i].ingredient +
            '</span>' +
            ': ' +
            recipe.ingredients[i].quantity +
            ' ' +
            recipe.ingredients[i].unit +
            '<br />';
        }
      }
    }

    paragIngredients.innerHTML = testParag;
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

    cardContent.setAttribute('id', recipeName.textContent.toLowerCase().replace(/\s/g, '-'));
    cardContent.appendChild(imgCards);
    cardContent.appendChild(subcardContent);

    return cardContent;
  }

  return { getRecipeCard };
}
