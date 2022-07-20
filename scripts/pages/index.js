import {recipesPageFactory} from "../factories/recipesPageFactory.js";

let recipesFile = [];
let recipes = [];
let recipesList = [];
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
    
    // function updateData(data) {
    //     // récupérer la liste des photographies du DOM
    //     const photographiesSection = document.querySelector(".photographies-section");
    
    //     // let selectedWorksPhotograph = data;
    //     // console.log(selectedWorksPhotograph)
    //     // localStorage.setItem('selectedWorksPhotograph', JSON.stringify(data));
    //     // vider la liste
    //     photographiesSection.textContent = "";
    //     data.forEach((media) => {
    //         // récupération des articles html à travailler
    //         const filterPhotographieModel = photographerPageFactory();
    //         // récupération des méthodes du design pattern factory
    //         const filterUserPhotoBody = filterPhotographieModel.getUserPhotoBody(media);
    //         // injection des éléments créés dans les éléments html récupérés
    //         photographiesSection.appendChild(filterUserPhotoBody);
    //     });
    
    // }
    
    // function btnDropdownFilter(selectedWorksPhotograph){
    //     // récupérer l'ensemble du dropdown
    //     const dropdowns = document.querySelectorAll('.dropdownBlockDrop');
            
    //     // faire une boucle sur les éléments du dropdown
    //     dropdowns.forEach(dropdown => {
    //         // récupérer chaque élément du dropdown
    //         const select = dropdown.querySelector(".selectBtnDrop");
    //         const caret = dropdown.querySelector(".caretDrop");
    //         const menu = dropdown.querySelector(".menuDrop");
    //         const options = dropdown.querySelectorAll(".menuDrop a");
    //         const selected = dropdown.querySelector(".selectedDrop");
    //         // const dropdown1 = dropdown.querySelector(".sectionDrop");
        
    
    //         // fonction pour ouvrir le dropdown             
    //         function addMenuDrop(){
    //             select.classList.add('selectBtnDrop-clicked');
    //             // ajout classe pour rotation de la flèche du bouton dropdown
    //             caret.classList.add('caretDrop-rotate');
    //             // ajout d'une classe de style pour le menu déroulant ouvert
    //             menu.classList.add('menuDrop-open');
    //             // on change l'état de la aria-expended 
    //             select.ariaExpanded = "true";
    //         }
            
    //         // fonction pour fermer le dropdown
    //         function initializDropdown() {
    //             menu.classList.remove('menuDrop-open');
    //             caret.classList.remove('caretDrop-rotate');
    //             select.classList.remove('selectBtnDrop-clicked');
    //             select.ariaExpanded = "false";
    //         }
    
    //         if(mainHidden.ariaHidden == "false") { 
    
    //         // ajout d'un event au click sur le bouton du dropdown
    //         select.addEventListener('click', () => {
    //             // ajout d'une classe de style pour des effets sur le bouton dropdown
    //             select.classList.toggle('selectBtnDrop-clicked');
    //             // ajout classe pour rotation de la flèche du bouton dropdown
    //             caret.classList.toggle('caretDrop-rotate');
    //             // ajout d'une classe de style pour le menu déroulant ouvert
    //             menu.classList.toggle('menuDrop-open');
    //             // on change l'état de la aria-expended 
    //             select.ariaExpanded = "true";
    //         })
    
    //         // select.addEventListener('focusin', () => {
    //         //     select.style.background = "#DB8876";
                
    //         // })
    //         // select.addEventListener('focusout', () => {
    //         //     select.style.background = "#901C1C";
    //         // })  
            
        
    //         // si le menu dropdown est ouvert et qu'on clique ailleurs, il se ferme et le caret du bouton reprend sa position 
    //         document.addEventListener("mouseup", (event) => {
    //                 if(menu.classList.contains('menuDrop-open') && !event.target.classList.contains('selectBtnDrop')){
    //                 // if(!event.target.classList.contains('selectBtnDrop')){
    //                     initializDropdown();
    //                 };  
    //         });
    
            
    //         // on écoute le menu, si le keyboard arrive dessus, on l'ouvre, si on en sort, on le referme
    //                 options.forEach(option =>{
    //                     // ajout d'un event au click du clavier sur une option du menu sélectionnée
    //                     option.addEventListener('keydown', (e) => {
    //                         addMenuDrop();
    //                         if (e.code == "Enter") {
    //                             initializDropdown();
    //                             option.style.background = "#901C1C";
    //                         }
    //                         option.addEventListener('focusout', () => {
    //                             initializDropdown();
    //                             option.style.background = "#901C1C";
    //                         })
    //                         option.addEventListener('focusin', () => {
    //                             addMenuDrop();
    //                             option.style.background = "#DB8876";
    //                         })
    //                     })
    
    //                     option.addEventListener('focusin', (e) => {
    //                         addMenuDrop(); 
    //                         option.style.background = "#DB8876";
    //                         option.style.width = "10.2em";
    //                         // option.style.marginRight = "-1em";
    //                     })          
                        
    //                 })
    //             }
                    
    
    //         function filtersGesture(){
    //         // création d'un tableau vide à objectif de prendre la valeur du filtre sélectionné
    //         let resultFilters = [];
    //         if(mainHidden.ariaHidden == "false") {
    //         // boucle sur tous les éléments de la liste
    //         options.forEach(option =>{
    //             // ajout d'un event au click sur une option du menu sélectionnée
    //             option.addEventListener('click', () => {
    //                 // affecter la valeur texte de l'option cliquée à la valeur du texte du bouton dropdown
    //                 selected.innerText = option.innerText;
    //                 option.style.background = "#901C1C";
    //                 // filtre en fonction de l'élément sélectionné du menu + réécriture des éléments du menu
    //                 if (selected.innerText == 'Popularité') {
    //                     resultFilters = selectedWorksPhotograph.sort((a, b) => (a.likes > b.likes ? 1 : -1));
    //                     options[0].innerText = 'Date';
    //                     options[1].innerText = 'Titre';
    //                     // select.ariaExpanded = "false";
    //                 } else if (selected.innerText == 'Date') {
    //                     resultFilters = selectedWorksPhotograph.sort((a, b) => (a.date > b.date ? 1 : -1));
    //                     options[0].innerText = 'Popularité';
    //                     options[1].innerText = 'Titre';
    //                     // select.ariaExpanded = "false";
    //                 } else if (selected.innerText == 'Titre') {
    //                     resultFilters = selectedWorksPhotograph.sort((a, b) => (a.title > b.title ? 1 : -1));
    //                     options[0].innerText = 'Popularité';
    //                     options[1].innerText = 'Date';
    //                     // select.ariaExpanded = "false";
    //                 }
    
    //                 // on inscrit la liste filtrée dans le storage pour la lightbox
    //                 localStorage.setItem('selectedWorksPhotograph', JSON.stringify(resultFilters));
        
    //                 // envoi de la liste filtrée en fonction de la sélection faite, à la fonction qui 
    //                 updateData(resultFilters);
                    
    //                 })
    //             })
                
    //         }
    
    //     }
    
    //     filtersGesture();
    
    //     })
    // }
    
    async function init() {
        // récupérer le résultat de la fonction qui récupère la liste des recettes
        recipesList = await getRecipes(recipes);
        // // appeler la fonction pour détecter le bouton dropdown et gérer les filtres de la liste des photographies
        // btnDropdownFilter(selectedWorksPhotograph);
        // envoyer par défaut la liste triée sur les likes au design pattern factory via la fonction displayData 
        displayData(recipesList);
    };
    
    init();

    // getRecipes()

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



const input1 = document.getElementById("inpBtn1");
const input2 = document.getElementById("inpBtn2");
const input3 = document.getElementById("inpBtn3");



input1.addEventListener("focusin", () => {
    document.getElementById("arrBtn1").src="./assets/icones/arrowUp.svg";
    
    input1.addEventListener("focusout", () => {
        document.getElementById("arrBtn1").src="./assets/icones/arrowDown.svg";
    })
})
input2.addEventListener("focusin", () => {
    document.getElementById("arrBtn2").src="./assets/icones/arrowUp.svg";
    input2.addEventListener("focusout", () => {
        document.getElementById("arrBtn2").src="./assets/icones/arrowDown.svg";
    })
})
input3.addEventListener("focusin", () => {
    document.getElementById("arrBtn3").src="./assets/icones/arrowUp.svg";
    input3.addEventListener("focusout", () => {
        document.getElementById("arrBtn3").src="./assets/icones/arrowDown.svg";
    })
})