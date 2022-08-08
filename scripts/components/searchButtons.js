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
  majDataUlByListRecipes(actualizedRecipesList);
  // actualizDataUnderFilters();
}

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
function changeX(num) {
  let numGlobal = '';
  numGlobal = num;
  console.log(numGlobal);
}
// ------------------- gestion recherche de l'input principal ---------------------
bigSearchBar.addEventListener('input', (e) => {
  changeX(2);
  // bigSearchBar.addEventListener("input", filterRecipes(recipesList))
  let value = e.target.value;

  let resultResearchInPage = [];
  let recipesList = '';
  recipesList = [...recipesListOriginal];

  if (value.length >= 3) {
    resultResearchInPage = recipesList.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toString().toLowerCase().includes(value.toString().toLowerCase())
        )
    );

    for (let i = 0; i < recipesList.length; i++) {}

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
const parentTagSection = document.getElementById('tagSection');
const tagSection = document.getElementById('tags');

// tableaux pour travailler les diverses listes liées aux boutons de filtres
let arr1 = [];
let arr2 = [];
let arr3 = [];
let arrIngredientsOnPage = [];
let arrUstensilesOnPage = [];
let arrAppareilsOnPage = [];

// ------------------- fonction pour actualiser les listes ul, de la fonction de construction de liste des recettes ---------------------
function majDataUlByListRecipes(data) {
  let dataRecipesList = [];

  if (data) dataRecipesList = data;
  else if (!data) dataRecipesList = [...actualizedRecipesList];

  if (isEmpty(dataRecipesList)) {
    // console.log('not recipes');
    // ulBtn1.innerHTML = 'recettes non trouvées';
    dataRecipesList = JSON.parse(localStorage.getItem('recipesList'));
  }

  dataRecipesList.forEach((recipe) => {
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
  let triArrIngredients = arr1.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrIngredientsOnPage = Array.from(new Set(triArrIngredients));
  let triArrUstensiles = arr2.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrUstensilesOnPage = Array.from(new Set(triArrUstensiles));
  let triArrAppareils = arr3.map((x) => (typeof x === 'string' ? x.toLowerCase() : x));
  arrAppareilsOnPage = Array.from(new Set(triArrAppareils));
}

// ------------------- fonction pour actualiser les listes ul, par les tags ou l'input ---------------------
function filterTabsForUl(value, stringId) {
  let dataRecipes = [];
  dataRecipes = [...actualizedRecipesList];

  // if (isEmpty(dataRecipes)) {
  //   // console.log('not recipes');
  //   // ulBtn1.innerHTML = 'recettes non trouvées';
  //   dataRecipes = recipesListOriginal;
  // }

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

// function setIdLi() {
ulBtn1.addEventListener('click', (e) => {
  let value = '';
  let stringId = '';
  if (e.target.matches('li')) {
    value = e.target.getAttribute('id').replace(/-/g, ' ');
    stringId = 'ing';
    addTags(value, stringId);
    displayListByTag(value, stringId);
    majDataUlByListRecipes();
  }
});
// }

// ------------------- fonction pour ajouter des tags ---------------------
function addTags(e, stringId) {
  // let ulList = document.querySelectorAll('.btnLi');
  // for (let i = 0; i < ulList.length; i++) {
  //   ulList[i].onclick = function () {

  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const btnClose = document.createElement('button');
  const imgCross = document.createElement('img');

  div.className = 'tagLi';
  div.id = e;
  if (stringId === 'ing') div.classList.add('tagLi-ing');
  if (stringId === 'app') div.classList.add('tagLi-app');
  if (stringId === 'ust') div.classList.add('tagLi-ust');

  // let tab = ulList[i];
  h3.innerHTML = e;
  setAttributes(imgCross, {
    src: '../../assets/icones/cross.svg',
    'aria-label': 'cross to close the tag selected',
    // onclick: 'removeTags(this)',
  });
  imgCross.className = 'icnCross';
  btnClose.className = 'btnCloseTags';
  // btnClose.setAttribute('onclick', 'removeTags(this)');
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
  const tagToRemove = document.getElementById(e.target.parentElement.parentElement.id);
  tagToRemove.remove();
  let tagsExist = [...document.querySelectorAll('#tags [id]')].map((elm) => elm.id);
  console.log(tagsExist);
  let calledByRemoveTags = 'calledByRemoveTags';
  let isEmptyString = 'true';
  // tagsExist.forEach((value) => displayListByTag(value, stringId));
  // for (let item of tagsExist) {
  //   displayListByTag(item, stringId, calledByRemoveTags);
  // }
  for (let i = 0; i < tagsExist.length; i++) {
    displayListByTag(tagsExist[i], stringId, calledByRemoveTags);
  }
  if (isEmpty(tagsExist)) displayListByTag(e, stringId, calledByRemoveTags, isEmptyString);
}

// ------------------- fonctionnalités à tester ---------------------

// function test() {

//   let recipesList = recipesListOriginal;

// }

// test();
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

  if (stringId === 'ing') {
    // filtrer les résultats sur la page
    resultResearchInPage = recipesList.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toString().toLowerCase().includes(value.toString().toLowerCase())
      )
    );
  }
  if (stringId === 'app') {
    resultResearchInPage = recipesList.filter((element) => {
      return element.appliance.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  }
  if (stringId === 'ust') {
    resultResearchInPage = recipesList.filter((recipe) =>
      recipe.ustensils.some((ustensil) =>
        ustensil.toString().toLowerCase().includes(value.toString().toLowerCase())
      )
    );
  }
  // si la fonction a été appelée par la fonction removeTags et que les tags sont vides
  if (!isEmpty(calledByRemoveTags)) {
    if (isEmptyString) {
      resultResearchInPage = [...recipesListOriginal];
    }
  }
  // appeler fonction pour mettre à jour la section avec les résultats de la recherche
  updateRecipesSection(resultResearchInPage);

  majDataUlByListRecipes();

  // si la recherche n'a aucun résultat, appeler la fonction qui affiche message d'erreur
  if (isEmpty(resultResearchInPage)) {
    nullableRecipesSection();
  }
}

// window.onkeydown = () => {
//   // if (actualizedRecipesList.length <= 49) console.log(actualizedRecipesList);
//   console.log(actualizedRecipesList);
// };

// ------------------- fonction appelée au click sur bouton ---------------------
function gestureBtn1() {
  ulBtn1.innerHTML = '';
  // mettre à jour les données ingredients, appareils, ustensiles
  majDataUlByListRecipes();
  // remplacement du bouton par l'input, avec retouche design
  btn1.style.display = 'none';
  contentInput1.style.display = 'flex';
  input1.style.width = '40vw';
  ulBtn1.style.width = '40vw';
  ulBtn1.style.gridTemplateColumns = 'repeat(3, 3fr)';
  // inscrire chaque résultat sous forme de li, dans l'élément "ul"
  let tabIngcompleteSorted = '';
  tabIngcompleteSorted = [...arrIngredientsOnPage];
  for (let i = 0; i < tabIngcompleteSorted.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = tabIngcompleteSorted[i];
    // li.setAttribute('id', i);
    li.setAttribute('id', tabIngcompleteSorted[i].toLowerCase().trim().replace(/\s/g, '-'));
    // li.setAttribute(
    //   'id',
    //   tabIngcompleteSorted[i].toLowerCase().trim().replace(/\s/g, '-') + '-' + i
    // );
    if (i < 30) ulBtn1.appendChild(li);
  }
}

// ------------------- input "ingredients" ---------------------
btn1.addEventListener('click', () => {
  // initialisation du sous menu et de l'input avec la fonction gestureBtn1
  gestureBtn1();
  input1.focus();

  input1.addEventListener('input', (e) => {
    // récupération de la valeur saisie par l'utilisateur
    let value = e.target.value;
    // console.log('actualizedRecipesList :', actualizedRecipesList);
    let recipesList = [...actualizedRecipesList];
    // if (!isEmpty(recipesList)) {
    //   ulBtn1.innerHTML = '';
    //   // // filtrer les résultats sur la page
    //   let stringId = 'ing';
    //   let result = filterTabsForUl(value, stringId);
    //   console.log('result ', result);
    //   displayListByTag(value, stringId);

    //   // construire le sous menu
    //   for (let i = 0; i < recipesList.length && i < 30; i++) {
    //     const li = document.createElement('li');
    //     const div = document.createElement('div');
    //     const h3 = document.createElement('h3');

    //     let nameIngredient = recipesList[i].name;
    //     h3.innerHTML = nameIngredient;

    //     div.className = 'btnLi';

    //     div.appendChild(h3);
    //     li.appendChild(div);
    //     ulBtn1.appendChild(li);
    //   }

    //   // comportement visuel de l'input et du sous menu "ul"
    //   if (result.length <= 10) {
    //     ulBtn1.style.gridTemplateColumns = 'repeat(1, 1fr)';
    //     ulBtn1.style.width = '15vw';
    //     input1.style.width = '15vw';
    //   } else if (result.length >= 11 && result.length <= 20) {
    //     ulBtn1.style.gridTemplateColumns = 'repeat(2, 2fr)';
    //     ulBtn1.style.width = '28vw';
    //     input1.style.width = '28vw';
    //   } else if (result.length >= 21 && result.length <= 30) {
    //     ulBtn1.style.gridTemplateColumns = 'repeat(3, 3fr)';
    //     ulBtn1.style.width = '45vw';
    //     input1.style.width = '45vw';
    //   }
    //   return;
    // }

    // vider la liste du sous menu de l'input
    ulBtn1.innerHTML = '';
    // O(n^2) ou O(n²)
    //////////////////////////////////////
    if (value.length >= 3) {
      ulBtn1.innerHTML = '';
      // filtrer les résultats sur la page
      let stringId = 'ing';
      let result = filterTabsForUl(value, stringId);
      displayListByTag(value, stringId);

      // construire le sous menu
      for (let i = 0; i < result.length && i < 30; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        let nameIngredient = result[i];
        h3.innerHTML = nameIngredient;

        div.className = 'btnLi';

        div.appendChild(h3);
        li.appendChild(div);
        ulBtn1.appendChild(li);
      }

      // comportement visuel de l'input et du sous menu "ul"
      if (result.length <= 10) {
        ulBtn1.style.gridTemplateColumns = 'repeat(1, 1fr)';
        ulBtn1.style.width = '15vw';
        input1.style.width = '15vw';
      } else if (result.length >= 11 && result.length <= 20) {
        ulBtn1.style.gridTemplateColumns = 'repeat(2, 2fr)';
        ulBtn1.style.width = '28vw';
        input1.style.width = '28vw';
      } else if (result.length >= 21 && result.length <= 30) {
        ulBtn1.style.gridTemplateColumns = 'repeat(3, 3fr)';
        ulBtn1.style.width = '45vw';
        input1.style.width = '45vw';
      }

      // } else {
      //   ulBtn1.innerHTML = 'aucune recette';
      // }

      //////////////

      // document.addEventListener('click', function (e) {
      //   if (e.target && e.target.class == '.btnLi') {
      //     console.log('clicked element');
      //   }
      // });

      ////////////////////////////////////////////////////////

      // addTags();
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

// ------------------- fonction pour refermer input "ingredients" ---------------------
document.addEventListener('mouseup', (event) => {
  // if (!ulBtn1.classList.contains('hidden') && event.target !== document.querySelectorAll('li')) {
  if (!ulBtn1.classList.contains('hidden') && event.target !== ulBtn1) {
    // if (!ulBtn1.classList.contains('hidden')) {
    ulBtn1.classList.add('hidden');
    contentInput1.style.display = 'none';
    btn1.style.display = 'flex';
  }
});
// });
// ulBtn1.addEventListener('focusout', () => {
//   ulBtn1.classList.add('hidden');
//   contentInput1.style.display = 'none';
//   btn1.style.display = 'flex';

//   // e.target.value = '';
// });
