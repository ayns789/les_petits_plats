import { recipesPageFactory } from '../factories/recipesPageFactory.js';

const bigSearchBar = document.getElementById('searchTerm');
let recipesListOriginal = JSON.parse(localStorage.getItem('recipesList'));
let actualizedRecipesList = [];

const recipesSection = document.getElementById('recipes-section');

// fonction pour afficher message d'erreur, si recherche d'une recette n'a pas de correspondance
function nullableRecipesSection() {
  const messageError = document.createElement('p');
  messageError.textContent =
    ' Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
  messageError.style.display = 'flex';
  messageError.style.fontSize = '36px';
  messageError.style.width = '80vw';
  messageError.style.flexDirection = 'row';
  messageError.style.alignItems = 'center';
  messageError.style.color = 'black';
  messageError.style.marginTop = '2em';
  recipesSection.appendChild(messageError);
}

// fonction pour mettre à jour la liste à afficher sur la page
function updateRecipesSection(recipesList) {
  // vider la section
  recipesSection.textContent = '';

  // itération pour sélectionner chaque recette de la liste des recettes à afficher dans la page
  recipesList.forEach((recipe) => {
    // récupération du design pattern factory global
    const recipeModel = recipesPageFactory();
    // récupération de méthode du design pattern factory avec l'objet recette en argument
    const recipeBody = recipeModel.getRecipeCard(recipe);
    // injection des éléments créés dans la section des recettes
    recipesSection.appendChild(recipeBody);
  });

  actualizedRecipesList = [...recipesList];
  // console.log(actualizedRecipesList);
  // majDataUlByListRecipes(actualizedRecipesList);
  // actualizDataUnderFilters();
}
// console.log(actualizedRecipesList);
// fonction pour controler si la recherche n'a aucun résultat
function isEmpty(value) {
  return !value || value.length === 0;
}

// fonction pour fournir plusieurs attributs à un élément
function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// ------------------- gestion recherche de l'input principal ---------------------
bigSearchBar.addEventListener('input', (e) => {
  // bigSearchBar.addEventListener("input", filterRecipes(recipesList))
  let value = e.target.value;

  let resultResearchInPage = [];
  let recipesList = [];
  recipesList = [...recipesListOriginal];

  if (value.length >= 3) {
    // resultResearchInPage = recipesList.filter(
    //   (recipe) =>
    //     recipe.name.toLowerCase().includes(value.toLowerCase()) ||
    //     recipe.description.toLowerCase().includes(value.toLowerCase()) ||
    //     recipe.ingredients.some((ingredient) =>
    //       ingredient.ingredient.toString().toLowerCase().includes(value.toString().toLowerCase())
    //     )
    // );
    function myIncludes(container, value) {
      let returnValue = false;
      // si l'élément est présent, il renvoie la valeur de position
      let testing = container.indexOf(value);
      if (testing >= 0) {
        returnValue = true;
      }
      return returnValue;
    }

    let tabTakeRecipes = [];
    for (let i = 0; i < recipesList.length; i++) {
      if (
        myIncludes(recipesList[i].name.toString().toLowerCase(), value.toString().toLowerCase()) ||
        myIncludes(
          recipesList[i].description.toString().toLowerCase(),
          value.toString().toLowerCase()
        )
      ) {
        tabTakeRecipes.push(recipesList[i]);
      }
      let ingredientsTab = recipesList[i].ingredients;
      for (let j = 0; j < ingredientsTab.length; j++) {
        if (
          myIncludes(
            ingredientsTab[j].ingredient.toString().toLowerCase(),
            value.toString().toLowerCase()
          )
        ) {
          tabTakeRecipes.push(recipesList[i]);
        }
      }
    }
    resultResearchInPage = Array.from(new Set([...tabTakeRecipes]));

    // console.log(Array.from(new Set(resultResearchInPage)));
    // console.log(resultResearchInPage);
    // appeler fonction pour mettre à jour la section avec les résultats de la recherche
    updateRecipesSection(resultResearchInPage);

    // si la recherche n'a aucun résultat, appeler la fonction qui affiche message d'erreur
    if (isEmpty(resultResearchInPage)) {
      nullableRecipesSection();
    }
  } else if (value.length < 3) {
    recipesList = '';
    recipesList = [...recipesListOriginal];
    updateRecipesSection(recipesList);
    // actualizedRecipesList = recipesList;
  }
});

// ------------------- les 3 inputs spécifiques ---------------------

const btn1 = document.getElementById('visualBtn1');
const btn2 = document.getElementById('visualBtn2');
const btn3 = document.getElementById('visualBtn3');
const contentInput1 = document.getElementById('contentInput1');
const contentInput2 = document.getElementById('contentInput2');
const contentInput3 = document.getElementById('contentInput3');
const input1 = document.getElementById('inpBtn1');
const input2 = document.getElementById('inpBtn2');
const input3 = document.getElementById('inpBtn3');
const ulBtn1 = document.getElementById('ulBtn1');
const ulBtn2 = document.getElementById('ulBtn2');
const ulBtn3 = document.getElementById('ulBtn3');
// const parentTagSection = document.getElementById('tagSection');
const tagSection = document.getElementById('tags');

// tableaux pour travailler les diverses listes liées aux boutons de filtres
let arrIngredientsOnPage = [];
let arrUstensilesOnPage = [];
let arrAppareilsOnPage = [];

// ------------------- fonction pour actualiser les listes ul, par les tags ou l'input ---------------------
function filterTabsForUl(value, stringId) {
  let dataRecipes = [];
  dataRecipes = [...actualizedRecipesList];

  let specificlyS = [];
  let specificly = [];
  let matchValue = [];
  let finalResult = [];

  if (stringId === 'ing') {
    specificlyS = dataRecipes.map((recipe) => recipe.ingredients);
    let ingSconcat = [].concat(...specificlyS);
    specificly = ingSconcat.map((ingredients) => ingredients.ingredient);
    arrIngredientsOnPage = Array.from(new Set(specificly));
  }
  if (stringId === 'app') {
    specificly = recipesList.map((recipe) => recipe.appliance);
    arrAppareilsOnPage = Array.from(new Set(specificly));
  }
  if (stringId === 'ust') {
    specificlyS = recipesList.map((recipe) =>
      recipe.ustensils.map((ustensil) => ustensil.toString().toLowerCase())
    );
    specificly = [].concat(...specificlyS);
    arrUstensilesOnPage = Array.from(new Set(specificly));
  }

  // filtrer la liste avec les résultats
  for (let i = 0; i < specificly.length; ++i) {
    if (specificly[i].toString().toLowerCase().includes(value.toLowerCase())) {
      matchValue.push(specificly[i]);
    }
  }

  //   supprimer les doublons
  let triArr = matchValue.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  finalResult = Array.from(new Set(triArr));
  return finalResult;
}

// ------------------- gestion des clicks sur les "li" ---------------------

ulBtn1.addEventListener('click', (e) => {
  let value = '';
  let stringId = '';
  if (e.target.matches('li')) {
    value = e.target.getAttribute('id').replace(/-/g, ' ');
    stringId = 'ing';
    addTags(value, stringId);
    displayListByTag(value, stringId);
  }
});

ulBtn2.addEventListener('click', (e) => {
  let value = '';
  let stringId = '';
  if (e.target.matches('li')) {
    value = e.target.getAttribute('id').replace(/-/g, ' ');
    stringId = 'app';
    addTags(value, stringId);
    displayListByTag(value, stringId);
  }
});

ulBtn3.addEventListener('click', (e) => {
  let value = '';
  let stringId = '';
  if (e.target.matches('li')) {
    value = e.target.getAttribute('id').replace(/-/g, ' ');
    stringId = 'ust';
    addTags(value, stringId);
    displayListByTag(value, stringId);
  }
});

// ------------------- fonction pour ajouter des tags ---------------------

function addTags(e, stringId) {
  // contrôle si l'élément est déjà présent, si c'est le cas, on arrête la fonction, sinon on construit le tag
  let tagsExist = [...document.querySelectorAll('#tags [id]')].map((elm) => elm.id);

  for (let i = 0; i < tagsExist.length; i++) {
    if (tagsExist[i] === e) {
      return;
    }
  }

  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const btnClose = document.createElement('button');
  const imgCross = document.createElement('img');

  div.className = 'tagLi';
  div.id = e;
  if (stringId === 'ing') div.classList.add('tagLi-ing');
  if (stringId === 'app') div.classList.add('tagLi-app');
  if (stringId === 'ust') div.classList.add('tagLi-ust');

  h3.innerHTML = e;
  setAttributes(imgCross, {
    src: '../../assets/icones/cross.svg',
    'aria-label': 'cross to close the tag selected',
  });
  imgCross.className = 'icnCross';
  btnClose.className = 'btnCloseTags';

  btnClose.appendChild(imgCross);
  div.appendChild(h3);
  div.appendChild(btnClose);
  tagSection.appendChild(div);
}

// ------------------- supprimer des tags ---------------------

document.addEventListener('click', function (e) {
  const div = document.getElementById(e.target.parentElement.parentElement.id);
  let stringId = '';
  if (e.target.classList == 'icnCross') {
    // removeTags(e);
    if (div.classList.contains('tagLi-ing')) {
      stringId = 'ing';
      removeTags(e, stringId);
    } else if (div.classList.contains('tagLi-app')) {
      stringId = 'app';
      removeTags(e, stringId);
    } else if (div.classList.contains('tagLi-ust')) {
      stringId = 'ust';
      removeTags(e, stringId);
    }
  }
});

function removeTags(e, stringId) {
  // on récupère sa div parente ( icone croix, casée dans un bouton, lui même casé dans une div )
  const tagToRemove = document.getElementById(e.target.parentElement.parentElement.id);
  // on la supprime
  tagToRemove.remove();
  // on retrouve la totalité des tags restants pour la suite
  let tagsExist = [...document.querySelectorAll('#tags [id]')].map((elm) => elm.id);
  // console.log(tagsExist);
  let calledByRemoveTags = 'calledByRemoveTags';
  let isEmptyString = 'true';

  for (let i = 0; i < tagsExist.length; i++) {
    displayListByTag(tagsExist[i], stringId, calledByRemoveTags);
  }
  if (isEmpty(tagsExist)) displayListByTag(e, stringId, calledByRemoveTags, isEmptyString);
}

// -------------- fonction pour trier la liste à afficher sur page en fonction des tags cliqués -------------

function displayListByTag(value, stringId, calledByRemoveTags, isEmptyString) {
  let resultResearchInPage = [];
  let recipesList = [];
  recipesList = [...actualizedRecipesList];
  if (isEmpty(recipesList)) recipesList = [...recipesListOriginal];
  if (!isEmpty(calledByRemoveTags)) {
    recipesList = [];
    recipesList = [...recipesListOriginal];
  }

  // // on retrouve la totalité des tags restants pour la suite
  let tagsExist = [...document.querySelectorAll('#tags [id]')].map((elm) => elm.id);

  resultResearchInPage = recipesList.filter((element) =>
    tagsExist.every(
      (x) =>
        element.ustensils.toString().toLowerCase().includes(x) ||
        element.appliance.toString().toLowerCase().includes(x) ||
        element.ingredients.some((ingredients) =>
          ingredients.ingredient.toString().toLowerCase().includes(x)
        )
    )
  );

  // si la fonction a été appelée par la fonction removeTags et que les tags sont vides
  if (!isEmpty(calledByRemoveTags)) {
    if (isEmptyString) {
      resultResearchInPage = [...recipesListOriginal];
    }
  }
  // appeler fonction pour mettre à jour la section avec les résultats de la recherche
  updateRecipesSection(resultResearchInPage);

  // si la recherche n'a aucun résultat, appeler la fonction qui affiche message d'erreur
  if (isEmpty(resultResearchInPage)) {
    nullableRecipesSection();
  }
}

// ------------------- fonction appelée au click sur bouton ---------------------

function ulComportement(arg1, arg2, arg3, arg4) {
  if (arg3.length <= 10) {
    arg1.style.gridTemplateColumns = 'repeat(1, 1fr)';
    arg1.style.width = '15vw';
    arg2.style.width = '15vw';
    arg2.removeAttribute('placeholder');
  } else if (arg3.length >= 11 && arg3.length <= 20) {
    arg1.style.gridTemplateColumns = 'repeat(2, 2fr)';
    arg1.style.width = '28vw';
    arg2.style.width = '28vw';
    if (!arg2.hasAttribute('placeholder'))
      arg2.setAttribute('placeholder', `Rechercher un ${arg4}`);
  } else if (arg3.length >= 21 && arg3.length <= 30) {
    arg1.style.gridTemplateColumns = 'repeat(3, 3fr)';
    arg1.style.width = '45vw';
    arg2.style.width = '45vw';
    if (!arg2.hasAttribute('placeholder'))
      arg2.setAttribute('placeholder', `Rechercher un ${arg4}`);
  }
}
function gestureBtn1() {
  ulBtn1.innerHTML = '';
  // mettre à jour les données ingredients, appareils, ustensiles
  let dataRecipesList = [...actualizedRecipesList];
  if (isEmpty(dataRecipesList)) dataRecipesList = [...recipesListOriginal];
  let tabEx = [];
  dataRecipesList.forEach((recipe) => {
    // on fait les tableaux nécessaires
    recipe.ingredients.map((ingredients) => {
      tabEx.push(ingredients.ingredient);
    });
  });
  // suppression des doublons, prenant en compte majuscules / minuscules
  let triArrIngredients = tabEx.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrIngredientsOnPage = Array.from(new Set(triArrIngredients));

  // remplacement du bouton par l'input, avec retouche design
  btn1.style.display = 'none';
  contentInput1.style.display = 'flex';
  input1.style.width = '40vw';
  ulBtn1.style.width = '40vw';
  ulBtn1.style.gridTemplateColumns = 'repeat(3, 3fr)';
  // construction du sous menu UL
  for (let i = 0; i < arrIngredientsOnPage.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = arrIngredientsOnPage[i];
    // li.setAttribute('id', i);
    li.setAttribute('id', arrIngredientsOnPage[i].toLowerCase().trim().replace(/\s/g, '-'));
    // li.setAttribute(
    //   'id',
    //   tabIngcompleteSorted[i].toLowerCase().trim().replace(/\s/g, '-') + '-' + i
    // );
    if (i < 30) ulBtn1.appendChild(li);
  }
  // comportement visuel de l'input et du sous menu "ul"
  ulComportement(ulBtn1, input1, arrIngredientsOnPage, 'ingrédient');
}

//////////////////////

function gestureBtn2() {
  ulBtn2.innerHTML = '';
  // mettre à jour les données ingredients, appareils, ustensiles
  let dataRecipesList = [...actualizedRecipesList];
  if (isEmpty(dataRecipesList)) dataRecipesList = [...recipesListOriginal];
  let tabEx = [];
  dataRecipesList.forEach((recipe) => {
    tabEx.push(recipe.appliance);
  });
  // suppression des doublons, prenant en compte majuscules / minuscules
  let triArrAppareils = tabEx.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrAppareilsOnPage = Array.from(new Set(triArrAppareils));

  // remplacement du bouton par l'input, avec retouche design
  btn2.style.display = 'none';
  contentInput2.style.display = 'flex';
  input2.style.width = '40vw';
  ulBtn2.style.width = '40vw';
  ulBtn2.style.gridTemplateColumns = 'repeat(3, 3fr)';
  // construction du sous menu UL
  for (let i = 0; i < arrAppareilsOnPage.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = arrAppareilsOnPage[i];
    li.setAttribute('id', arrAppareilsOnPage[i].toLowerCase().trim().replace(/\s/g, '-'));
    if (i < 30) ulBtn2.appendChild(li);
  }
  //   // comportement visuel de l'input et du sous menu "ul"
  ulComportement(ulBtn2, input2, arrAppareilsOnPage, 'appareil');
}

///////////////////

function gestureBtn3() {
  ulBtn3.innerHTML = '';
  // mettre à jour les données ingredients, appareils, ustensiles
  let dataRecipesList = [...actualizedRecipesList];
  if (isEmpty(dataRecipesList)) dataRecipesList = [...recipesListOriginal];
  let tabEx = [];
  dataRecipesList.forEach((recipe) => {
    // on fait les tableaux nécessaires
    recipe.ustensils.map((ustensile) => {
      tabEx.push(ustensile);
    });
  });
  // suppression des doublons, prenant en compte majuscules / minuscules
  let triArrUstensiles = tabEx.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrUstensilesOnPage = Array.from(new Set(triArrUstensiles));

  // remplacement du bouton par l'input, avec retouche design
  btn3.style.display = 'none';
  contentInput3.style.display = 'flex';
  input3.style.width = '40vw';
  ulBtn3.style.width = '40vw';
  ulBtn3.style.gridTemplateColumns = 'repeat(3, 3fr)';
  // construction du sous menu UL
  for (let i = 0; i < arrUstensilesOnPage.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = arrUstensilesOnPage[i];
    // li.setAttribute('id', i);
    li.setAttribute('id', arrUstensilesOnPage[i].toLowerCase().trim().replace(/\s/g, '-'));
    // li.setAttribute(
    //   'id',
    //   tabIngcompleteSorted[i].toLowerCase().trim().replace(/\s/g, '-') + '-' + i
    // );
    if (i < 30) ulBtn3.appendChild(li);
  }
  //   // comportement visuel de l'input et du sous menu "ul"
  ulComportement(ulBtn3, input3, arrUstensilesOnPage, 'ustensile');
}

// ------------------- input  ---------------------

btn1.addEventListener('click', () => {
  // initialisation du sous menu et de l'input avec la fonction gestureBtn1
  gestureBtn1();
  input1.focus();
  input1.addEventListener('input', (e) => {
    // récupération de la valeur saisie par l'utilisateur
    let value = e.target.value;
    let recipesList = [...actualizedRecipesList];
    if (isEmpty(actualizedRecipesList)) {
      recipesList = [];
      recipesList = [...recipesListOriginal];
    }

    // O(n^2) ou O(n²)
    //////////////////////////////////////
    if (value.length >= 3) {
      ulBtn1.innerHTML = '';
      // filtrer les résultats sur la page
      let stringId = 'ing';
      let result = filterTabsForUl(value, stringId);

      // construire le sous menu
      for (let i = 0; i < result.length; i++) {
        const li = document.createElement('li');

        let nameIngredient = result[i];

        li.setAttribute('id', result[i].toLowerCase().trim().replace(/\s/g, '-'));
        li.innerHTML = nameIngredient;
        li.className = 'btnLi';

        if (i < 30) ulBtn1.appendChild(li);
      }

      // comportement visuel de l'input et du sous menu "ul"
      ulComportement(ulBtn1, input1, result, 'ingrédient');
    } else if (isEmpty(actualizedRecipesList)) {
      // réinitialisation de la liste sur la page
      recipesList = [];
      recipesList = [...recipesListOriginal];
      updateRecipesSection(recipesList);
      // réinitialisation du sous menu et de l'input avec la fonction gestureBtn1
      gestureBtn1();
    }
  });

  ulBtn1.classList.remove('hidden');
});

////////////////////

btn2.addEventListener('click', () => {
  // initialisation du sous menu et de l'input avec la fonction gestureBtn1
  gestureBtn2();
  input2.focus();
  input2.addEventListener('input', (e) => {
    // récupération de la valeur saisie par l'utilisateur
    let value = e.target.value;
    let recipesList = [...actualizedRecipesList];
    if (isEmpty(actualizedRecipesList)) {
      recipesList = [];
      recipesList = [...recipesListOriginal];
    }

    if (value.length >= 3) {
      ulBtn2.innerHTML = '';
      // filtrer les résultats sur la page
      let stringId = 'app';
      let result = filterTabsForUl(value, stringId);

      // construire le sous menu
      for (let i = 0; i < result.length; i++) {
        const li = document.createElement('li');

        let nameAppareil = result[i];

        li.setAttribute('id', result[i].toLowerCase().trim().replace(/\s/g, '-'));
        li.innerHTML = nameAppareil;
        li.className = 'btnLi';

        if (i < 30) ulBtn2.appendChild(li);
      }

      // comportement visuel de l'input et du sous menu "ul"
      ulComportement(ulBtn2, input2, result, 'appareil');
    } else if (isEmpty(actualizedRecipesList)) {
      // réinitialisation de la liste sur la page
      recipesList = [];
      recipesList = [...recipesListOriginal];
      updateRecipesSection(recipesList);
      // réinitialisation du sous menu et de l'input avec la fonction gestureBtn1
      gestureBtn2();
    }
  });

  ulBtn2.classList.remove('hidden');
});

////////////////

btn3.addEventListener('click', () => {
  // initialisation du sous menu et de l'input avec la fonction gestureBtn1
  gestureBtn3();
  input3.focus();
  input3.addEventListener('input', (e) => {
    // récupération de la valeur saisie par l'utilisateur
    let value = e.target.value;
    let recipesList = [...actualizedRecipesList];
    if (isEmpty(actualizedRecipesList)) {
      recipesList = [];
      recipesList = [...recipesListOriginal];
    }

    if (value.length >= 3) {
      ulBtn3.innerHTML = '';
      // filtrer les résultats sur la page
      let stringId = 'ust';
      let result = filterTabsForUl(value, stringId);

      // construire le sous menu
      for (let i = 0; i < result.length; i++) {
        const li = document.createElement('li');

        let nameUstensil = result[i];

        li.setAttribute('id', result[i].toLowerCase().trim().replace(/\s/g, '-'));
        li.innerHTML = nameUstensil;
        li.className = 'btnLi';

        if (i < 30) ulBtn3.appendChild(li);
      }

      // comportement visuel de l'input et du sous menu "ul"
      ulComportement(ulBtn3, input3, result, 'ustensile');
    } else if (isEmpty(actualizedRecipesList)) {
      // réinitialisation de la liste sur la page
      recipesList = [];
      recipesList = [...recipesListOriginal];
      updateRecipesSection(recipesList);
      // réinitialisation du sous menu et de l'input avec la fonction gestureBtn1
      gestureBtn3();
    }
  });

  ulBtn3.classList.remove('hidden');
});

// ------------------- fonction pour refermer input "ingredients" ---------------------
document.addEventListener('mouseup', (event) => {
  // if (!ulBtn1.classList.contains('hidden') && event.target !== document.querySelectorAll('li')) {
  if (!ulBtn1.classList.contains('hidden') && event.target !== ulBtn1) {
    // if (!ulBtn1.classList.contains('hidden')) {
    ulBtn1.classList.add('hidden');
    contentInput1.style.display = 'none';
    btn1.style.display = 'flex';
  }
  if (!ulBtn2.classList.contains('hidden') && event.target !== ulBtn2) {
    // if (!ulBtn1.classList.contains('hidden')) {
    ulBtn2.classList.add('hidden');
    contentInput2.style.display = 'none';
    btn2.style.display = 'flex';
  }
  if (!ulBtn3.classList.contains('hidden') && event.target !== ulBtn3) {
    // if (!ulBtn1.classList.contains('hidden')) {
    ulBtn3.classList.add('hidden');
    contentInput3.style.display = 'none';
    btn3.style.display = 'flex';
  }
});
///////////////////////////////////
