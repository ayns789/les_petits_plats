let recipesFile = [];
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

        // console.log(recipesFile.recipes[0]);

        return recipes;
    }

    // getRecipes()

    // // fonction pour recalculer une hauteur d'un textarea :
    // let textarea = document.querySelector(".resize-ta");
    // textarea.addEventListener("keyup", () => {
    //   textarea.style.height = calcHeight(textarea.value) + "px";
    // });

    // let inputs = document.querySelector(".inpBtn");
    // inputs.addEventListener("keyup", () => {
    //     inputs.style.width = calcWidth(inputs.value) + "px";
    // });



const input1 = document.getElementById("inpBtn1");
const input2 = document.getElementById("inpBtn2");
const input3 = document.getElementById("inpBtn3");

// ['mousemove', 'touchmove'].forEach(function(event) { window.addEventListener(event, handler);});

input1.addEventListener("focusin", () => {
    document.getElementById("arrBtn1").src="./assets/icones/arrowUp.svg";
    // input1.addEventListener("keyup", () => {
    //     input1.style.width = calcWidth(input1.value) + "px";
    // });
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