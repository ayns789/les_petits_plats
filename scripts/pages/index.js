const input1 = document.getElementById("inpBtn1");
const input2 = document.getElementById("inpBtn2");
const input3 = document.getElementById("inpBtn3");

input1.addEventListener("mousedown", () => {
    document.getElementById("arrBtn1").src="./assets/icones/arrowUp.svg";
    input1.addEventListener("focusout", () => {
        document.getElementById("arrBtn1").src="./assets/icones/arrowDown.svg";
    })
})
input2.addEventListener("mousedown", () => {
    document.getElementById("arrBtn2").src="./assets/icones/arrowUp.svg";
    input2.addEventListener("focusout", () => {
        document.getElementById("arrBtn2").src="./assets/icones/arrowDown.svg";
    })
})
input3.addEventListener("mousedown", () => {
    document.getElementById("arrBtn3").src="./assets/icones/arrowUp.svg";
    input3.addEventListener("focusout", () => {
        document.getElementById("arrBtn3").src="./assets/icones/arrowDown.svg";
    })
})