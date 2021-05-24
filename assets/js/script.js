products = JSON.parse(localStorage["panier"]);
console.log(products);

let panier = document.querySelector("div#cart");
console.log(panier);
let resultat = 0;

products.forEach(element => {
    resultat += parseInt(element["quantitée"]);
});
panier.textContent = resultat;

const burger = document.querySelector('#burger');
const panelHeader2 = document.querySelector('#panelHeader2');

burger.addEventListener("click", () => {
    if(panelHeader2.style.display == "block"){
        panelHeader2.style.display = "none";
    }else{
        panelHeader2.style.display = "block";
    }
})