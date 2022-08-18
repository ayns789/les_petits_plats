// Les méthodes de tableaux en Javascript permettent de réaliser des opérations complexes en écrivant
// moins de code.

// Voici 8 méthodes :

// .forEach() :
// forEach permet de faire une boucle simplement dans un tableau sans passer par une boucle de type "for" ou
// "while".

// .map() :
// map permet de prendre un tableau et de le convertir en un autre tableau. Il est bien entendu possible de
// réaliser des changements au niveau des valeurs.

// .filter() :
// filter permet de filtrer un tableau selon une certaine condition. Si la condition vaut vraie, alors
// l'élément actuellement inspecté dans le tableau se retrouvera dans le tableau final filtré, sinon non.

// .find() :
// find permet de trouver un élément dans un tableau. Ce sera juste le 1er élément que la condition trouvera

// .some() :
// some renvoie true si un élément respectant une certaine condition a été trouvé dans un tableau,
// false sinon.

// .every() :
// every est semblable à some, seulement que cette méthode renvoie true si tous les éléments dans un tableau
// respectent une certaine condition, false sinon.

// .reduce() :
// reduce permet de faire des opérations sur un tableau et de renvoyer une combinaison de ces opérations. Elle
// prend aussi en paramètre une valeur de départ.

// .includes() :
// includes ne prend pas une fonction mais un simple argument. Elle retourne vrai si l'argument est présent
// dans le tableau, false si cette valeur n'est pas présente.

let tabPersonnages = [
  { nom: 'Zeus', puissance: 300, prix: 10000 },
  { nom: 'Hadès', puissance: 200, prix: 6000 },
  { nom: 'Poséidon', puissance: 175, prix: 5000 },
  { nom: 'Achille', puissance: 165, prix: 4500 },
  { nom: 'Cyclope', puissance: 100, prix: 3000 },
  { nom: 'Titan', puissance: 250, prix: 8000 },
  { nom: 'Dragon noir', puissance: 220, prix: 6800 },
  { nom: 'Chevalier', puissance: 65, prix: 1800 },
];

tabPersonnages.forEach((element) => {
  console.log(element.nom);
});
////////////
let persos = tabPersonnages.map((element) => {
  return element.nom;
});
///////////////
let reduction = tabPersonnages.map((element) => {
  // réduction de 30% sur le prix
  return element.prix - 0.3 * element.prix;
});
//////////////////
let puissants = tabPersonnages.filter((element) => {
  return element.puissance > 150;
});
//////////////////////
// find pour trouver un element dans un tableau - retourne une donnee dans son integralite
let achille = tabPersonnages.find((element) => {
  return element.nom === 'Achille';
});
///////////////////////
let chers = tabPersonnages.some((element) => {
  return element.prix > 6000;
});
//////////////////////////
let ensembleFort = tabPersonnages.every((element) => {
  return element.puissance > 100;
});
///////////////////////////
// ici 0 = valeur de départ de l'accumulateur
let sommePrix = tabPersonnages.reduce((accumulateur, element) => {
  return accumulateur + element.prix;
}, 0);
////////////////////////////
let notes = [1, 4, 5, 20];
let estPresent = notes.includes(20);
//////////////////////////////
/////////////////////////////
const listOfNumber = [1, 2, 4, 7, 14, 18, 24];
const result = listOfNumber.find((nbr) => nbr > 6);
// result est égal à la valeur 7.
const resultIndex = listOfNumber.findIndex((nbr) => nbr > 6);
// resultIndex est égal à 3, car 4e element dans le tableau ( 0, 1, 2, 3)
listOfNumber[resultIndex] += 4;
// listOfNumber est égal à [1, 2, 4, 11, 14, 18, 24], sert donc à faire un traitement à un élément dans
// le tableau de par sa position dans ce tableau
///////////////////////////////////
///////////////////////////////////
let myCar = cars.filter(function (car) {
  if (car.vitesse > 200) {
  }
});
let ings = recipesList.filter(function (recipe) {
  if (recipe.ingredients > 200) {
    return recipe.ingredients;
  }
});
///////////////////////////////////
///////////////////////////////////
let s = 'it was a dark night';
let words = s.split('');
// words est égal à ["it", "was", "a", "dark", "night"]
let s2 = 'it was  a dark night';
let words2 = s2.split('');
// words2 est égal à ["it", "was", "", "a", "dark", "night"]
let s3 = 'it was a dark night';
let words3 = s3.split(/\W+/).filter((world) => words.length);
// words3 est égal à ["it", "was", "a", "dark", "night"]
let s4 = 'it was a dark night';
let words4 = s4.split(/\W+/).filter((world) => words.length > 3);
// words4 est égal à ["dark", "night"]
///////////////////////////////////////////
///////////////////////////////////////////
const arrayOfString = ['kiwi', 'cerise', 'carote', 'banane', 'fraise'];
arrayOfString.sort();
// arrayOfString est égal à ["banane", "carote", "cerise", "fraise", "kiwi"] // ca trie par ordre alphabétique par défaut
arrayOfString.sort((a, b) => a.toLowerCase().length - b.toLowerCase().length);
// arrayOfString est trié par longueur de mots = ["kiwi", "cerise", "carote", "banane", "fraise"]

///////////////////////////////////////////////
///////////////////////////////////////////////
const someArr = [1, 2, 3, 4, 5];

// doubler toutes les données dans ce tableau :
const doubleArr = someArr.map((e) => e * 2);

// filtrer et trouver tous les nombres pairs  et impairs grace au modulo :
const pairArr = someArr.filter((e) => e % 2 == 0);
const impairArr = someArr.filter((e) => e % 2 != 0);

// trouver la plus grande ou petite valeur dans le tableau, ca va comparer les données 2 à 2 et conserver à chaque fois la + grande valeur :
const maxValueArr = someArr.reduce((valMax, element) => Math.max(valMax, element));
const minValueArr = someArr.reduce((valMin, element) => Math.min(valMin, element));

// faire une somme totale avec les valeurs du tableau :
const sumValueArr = someArr.reduce((sum, element) => sum + element);

// obtenir un boolean pour si nous avons au moins une des valeurs impaire dans le tableau :
const isImpairArr = someArr.filter((e) => e % 2 != 0).length != 0;

// choisir entre map, filter et reduce :
// _ map : si on doit obtenir un autre tableau qui contient des elements differents mais de meme longueur que le tableau initial.
// _ filter : si on doit obtenir un tableau de meme longueur ou plus petit que le tableau d'origine.
// _ reduce : transformer un tableau en un nombre ou boolean suite à un traitement, si la sortie est une valeur ou une boolean.

// Exo : combien les hommes gagneraient-ils au total s'ils étaient augmentés de 1000 euros chacun ?
const userList = [
  { name: 'John', gender: 'M', salary: 35000 },
  { name: 'Jade', gender: 'F', salary: 42000 },
  { name: 'Joe', gender: 'M', salary: 32000 },
  { name: 'Jacky', gender: 'F', salary: 38000 },
];

const menSalaryTotal = userList
  .filter((user) => user.gender == 'M') // on filtre les genres
  .map((user) => (user.salary += 1000)) // sur les genres filtrés, on augmente le salaire de 1000 euros
  .reduce((salaryTotal, menSalary) => salaryTotal + menSalary); // accumulateur salaryTotal, qui va accumuler tous les sailaires via la propriété menSalary

// checker dans un tableau d'utilisateurs ceux qui ont coché le choix de recevoir des notifs :
function getUncheckedNotifs() {
  return notifs.filter((notif) => !notif.displayChecked);
}
// checker dans un tableau d'utilisateurs si au moins une personne a coché le choix de recevoir des notifs :
function isEveryNotifActive() {
  return notifs.reduce((isEveryNotifActive, notif) => {
    return isEveryNotifActive && notif.checked;
  }, true);
}
// cocher ou décocher toutes les cases des notifs :
function toggleNotifs() {
  return isEveryNotifActive
    ? notifs.map((notif) => (notif.checked = false))
    : notifs.map((notif) => (notif.checked = true));
}

///////////////////////////////////////
///////////////////////////////////////
//   var PATTERN = /bedroom/,
// filtered = myArray.filter(function (str) { return PATTERN.test(str); });
///////////////////////////////////////////
//     let digitalGoods =  products.filter(function(product) {
//         return product.company == 'Microsoft';
//     });
//     /////////////////////////////
//     let result = words.filter(word => word.length > 6);
//     ///////////////////////////
//     function filter_books(filters) {
//         const filteredBooks = [];
//         filters.forEach(filterValue => {
//             filteredBooks.push(...books.filter(val => val.areas.includes(filterValue)));
//         });
//         console.log(filteredBooks);
//     };
//     filter_books(["horror", "scifi"]);
//     //////////////////////////////////
//     var arr = [1,2,3,4],
//     brr = [2,4],
//     res = arr.filter(f => !brr.includes(f));
//     ///////////////////////////////////
//     if(obj.x && Array.isArray(obj.x)){
//         return obj.x.filter(filterByID).length>0
//       }
//       /////////////////////////////////
//       if(obj.x && Array.isArray(obj.x)){
//         obj.x = obj.x.filter(filterByID)
//         return true
//       }
//       /////////////////////////////////
//       /////////////////////////////////
//       //////////////////////////////////
// exemple avec cette donnée :
// var multi = [
//     {
//     "name": "test1",
//     "series": [
//       { "date": new Date("2018-01-01T01:10:00Z"), "value": 44
//       },...
//     ]
/////////////////////////////////
//       /////////////////////////////////
//       //////////////////////////////////
//       data.series = data.series.filter((item: any) => {
//         return item.date.getTime() >= fromDate.getTime() &&
//                item.date.getTime() <= toDate.getTime();
//     });
//     //////////////////////////////////////
//     data.series = data.series.filter((item: any) =>
//      item.date.getTime() >= fromDate.getTime() && item.date.getTime() <= toDate.getTime()
//  );
//  //////////////////////////////////////////
//  obj.forEach(data =>
//     { console.log(data.name);
//     data.series = data.series.filter((item: any) =>
//     {
//     item.date.getTime() >= fromDate.getTime() &&
//     item.date.getTime() <= toDate.getTime();
//     });
//       });
//       //////////////////////////////////////////
//       data.series = data.series.filter((item: any) =>
// {
// return item.date.getTime() >= fromDate.getTime() &&item.date.getTime() <= toDate.getTime();
// });
// ////////////////////////////////////////////
// data.series = data.series.filter((item: any) =>
// item.date.getTime() >= fromDate.getTime() &&
// item.date.getTime() <= toDate.getTime() );
// /////////////////////////////////////////////
// let start = new Date(this.min);
// let end   = new Date(this.max);
//  return items.filter(item =>
// {    let date = new Date(item.created_at);
//    return date >= start &&
// date <= end;
// } )
// //////////////////////////////////////
// const start =  new Date().getTime() const end=new Date() end.setHours(23,59,59,999) end.getTime()  return items.filter(item =>
//     {    let date = new Date(item.created_at).getTime();
//        return date >= start &&
//     date <= end;
//     }
/////////////////////////////////////
//   const filteredNumbers = numbers.filter((number) => number > 20);
/////////////////////////////////////
// const list = ['apple', 'banana', 'orange', 'strawberry']
// const size = 3
// const items = list.slice(0, size) // res: ['apple', 'banana', 'orange']
////////////////////////////////////////////////////
// this.employees = emp.filter(item => !this.data.some(d => d.QID === item.QID))
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
// ---------------- fonction gestureBtn1 -----------------
// } else {
//   // inscrire chaque résultat sous forme de li, dans l'élément "ul"
//   for (let i = 0; i < finalResultIng.length; i++) {
//     const li = document.createElement('li');
//     li.innerHTML = finalResultIng[i];
//     // li.setAttribute('id', i);
//     // li.setAttribute('id', tabIngredients[i].toLowerCase().trim().replace(/\s/g, '-') + '-' + i);
//     // li.addEventListener('click', () => console.log('cliked'));
//     if (i < 30) ulBtn1.appendChild(li);
//   }
// }

// ulBtn1.addEventListener('click', (e) =>
//   console.log(
//     'clicked on li : ',
//     e.target.getAttribute('id')
//     // Array.prototype.indexOf.call(ulBtn1.children, e.target.parentNode)
//   )
// );
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// -------------------- fonctions testées avec jsbench ------------------
// let specificlyS = [];
// let specificly = [];

//   specificlyS = dataRecipes.map((recipe) => {
//     return recipe.ingredients;
//   });
//   specificlyS = specificlyS.flat();
//   specificly = specificlyS.map((ings) => {
//     return ings.ingredient;
//   });
// return specificly;
// //////////////////////////////////////////////
// //////////////////////////////////////////////
// let ingScollection = recipesList.map((recipe) => recipe.ingredients);
// let ingSconcat = [].concat(...ingScollection);
// let ingcollection = ingSconcat.map((ingredients) => ingredients.ingredient);
// return ingcollection;
///////////////////
const test = [1, 2, 3];
const azerty = test;
azerty[0] = 1996;

console.log(test, azerty);
/////////////////////
// spread le tableau pour travailler avec, le copier pour ne pas affecter l'original
const azerty = [...test];

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
// homogeneous array ( homogène )
// heterogeneous array ( hétérogène )
// multidimensional array ( multidimensionnel ) ( 2d )
// jagged array ( irrégulier )

// **************

// homogène data : string, int ou boolean.

// homogène exemple :
let arr20 = ['Matthew', 'Simon', 'Luke'];
let arr21 = [27, 24, 30];
let arr22 = [true, false, true];

// **************

// hétérogène data : mix de types de données.

// hétérogène exemple :
let arr23 = ['Matthew', 27, true];

// ***************

// multidimensionnel data : tableau de tableaux.

// multidimensionnel exemple :
let arr24 = [
  ['Matthew', '27'],
  ['Simon', '24'],
  ['Luke', '30'],
];

// ****************

// irrégulier data : des données non uniformes.

// irrégulier exemple :
let arr25 = [['Matthew', '27', 'Dev'], ['Simon', '24'], ['Luke']];
// ********************************
// ********************************
// ********************************
// traitement multidimensionnel :
let arr26 = [
  ['Matthew', '27'],
  ['Simon', '24'],
  ['Luke', '30'],
];

for (let i = 0; i < arr.lenght; i++) {
  let innerArr = arr[i].length;
  for (let j = 0; j < innerArr.length; j++) {
    document.write(arr[i][j]);
    document.write('<br>');
  }
}
/////////////////////////////////////
/////////////////////////////////////
const data = [
  { guid: 'j5Dc9Z', courses: [{ id: 3, name: 'foo' }] },
  {
    guid: 'a5gdfS',
    courses: [
      { id: 1, name: 'bar' },
      { id: 3, name: 'foo' },
    ],
  },
  { guid: 'jHab6i', courses: [{ id: 7, name: 'foobar' }] },
];
const courses = [1, 6, 3];

const r = data.filter((d) => d.courses.every((c) => courses.includes(c.id)));
console.log(r);
/////////////////////////////////////////
//   // resultResearchInPage = recipesList.filter((recipe) =>
//   //   recipe.ingredients.every((ingTab) =>
//   //     arrValues.toString().toLowerCase().includes(ingTab.ingredient.toString().toLowerCase())
//   //   )
//   // );

//   // resultResearchInPage = recipesList.map((recipe) => {
//   //   recipe.ingredients = recipe.ingredients.filter((ing) => arrValues.includes(ing.ingredient));
//   //   return recipe;
//   // });

//   // resultResearchInPage = recipesList.filter((d) =>
//   //   d.ingredients.some((c) => arrValues.includes(c.ingredient))
//   // );

//   // si le sous tableau ne contiendrait que des valeurs :
//   // resultResearchInPage = recipesList.filter((element) =>
//   //   arrValues.every((x) => element.ustensils.includes(x))
//   // );

//   resultResearchInPage = recipesList.filter((element) =>
//     arrValues.every(
//       (x) =>
//         element.ustensils.toString().toLowerCase().includes(x) ||
//         element.appliance.toString().toLowerCase().includes(x) ||
//         element.ingredients.some((ingredient) =>
//           ingredient.ingredient.toString().toLowerCase().includes(x)
//         )
//     )
//   );

//   // let tabEx = [];

//   // const filteredResults = recipesList.filter((item) =>
//   //   arrValues.every((val) => item.ingredients.indexOf(val) > -1)
//   // );

//   // console.log(filteredResults);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// version avec includes

function bigSearchBar1(e) {
  let value = e;

  let resultResearchInPage = [];

  let recipesList = [];
  recipesList = [...recipesListOriginal];

  if (value.length >= 3) {
    let tabTakeRecipes = [];
    for (let i = 0; i < recipesList.length; i++) {
      if (
        recipesList[i].name.toString().toLowerCase().includes(value.toString().toLowerCase()) ||
        recipesList[i].description.toString().toLowerCase().includes(value.toString().toLowerCase())
      ) {
        tabTakeRecipes.push(recipesList[i]);
      }
      let ingredientsTab = recipesList[i].ingredients;
      for (let j = 0; j < ingredientsTab.length; j++) {
        if (
          ingredientsTab[j].ingredient
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        ) {
          tabTakeRecipes.push(recipesList[i]);
        }
      }
    }
    resultResearchInPage = Array.from(new Set([...tabTakeRecipes]));
    return resultResearchInPage;
  }
}

bigSearchBar1('citron');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// version filter includes

function bigSearchBar2(e) {
  let value = e;

  let resultResearchInPage = [];

  let recipesList = [];
  recipesList = [dataJson]; // dataJson remplacé par données complètes des 50 reçettes )

  if (value.length >= 3) {
    resultResearchInPage = recipesList.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toString().toLowerCase().includes(value.toString().toLowerCase())
        )
    );
    return resultResearchInPage;
  }
}

bigSearchBar2('citron');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// version avec includes personnalisé

function bigSearchBar1(e) {
  let value = e;

  let resultResearchInPage = [];

  let recipesList = [];
  recipesList = [dataJson]; // dataJson remplacé par données complètes des 50 reçettes )

  if (value.length >= 3) {
    function myIncludes(container, value) {
      let returnValue = false;
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
    return resultResearchInPage;
  }
}

bigSearchBar1('citron');
// question sur stackoverflow
// #### Hi,
// ##### To filter various data at the same time in the following table,
// ##### I'm trying to find an simple alternative to avoid nested loops for this scenario :
// <pre>
// const carsList =
//   {
//       "id": 1,
//       "name" : "Fiat",
//       "description" : "blabla",
//       "options":
//           {
//               "option" : "electric windows",
//               "quantity" : 4
//           },
//           {
//               "option" : "air bags",
//               "quantity" : 2
//           }
//        ]
//       }
//     ]
// </pre>
//     // value = e.target.value;
// <pre>
// result = carsList.filter(
//   (car) =>
//     car.name.toLowerCase().includes(value.toLowerCase()) ||
//     car.description.toLowerCase().includes(value.toLowerCase()) ||
//     car.options.some((option) =>
//       option.option.toString().toLowerCase().includes(value.toString().toLowerCase())
//     )
// );
// </pre>
// ***********

// ##### also to filter with an array of values ( tagsExist ( the id's are the names ) ) ​​as follows :

// <pre>
// let tagsExist = [...document.querySelectorAll('#tags [id]')].map((elm) => elm.id);

// resultResearchInPage = carsList.filter((element) =>
//   tagsExist.every(
//     (x) =>
//       element.name.toString().toLowerCase().includes(x) ||
//       element.description.toString().toLowerCase().includes(x) ||
//       element.options.some((option) => option.option.toString().toLowerCase().includes(x))
//   )
// );
// </pre>

// ##### the "some" in the "filter" are problematic, could you help me, please ?

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
