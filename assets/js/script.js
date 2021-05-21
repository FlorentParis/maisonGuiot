products = JSON.parse(localStorage["panier"]);
console.log(products);

let panier = document.querySelector("div#cart");
console.log(panier);
let resultat = 0;

products.forEach(element => {
    resultat += parseInt(element["quantitée"]);
});
panier.textContent = resultat;