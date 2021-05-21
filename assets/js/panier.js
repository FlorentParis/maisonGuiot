let products = JSON.parse(localStorage["panier"]);

let cartLeft = document.getElementById('cartLeft');
let panier = document.querySelector("div#cart");
let nbrArticle = document.getElementById("nbrArticle");
let totalCommande = document.getElementById("totalCommande");

displayNbrCart();

function displayNbrCart(){
    let resultat = 0;
    let prixTotal = 0;
    products.forEach(element => {
        resultat += parseInt(element["quantitée"]);
        if(parseInt(element["quantitée"]) !== 0){
            for(let i = 0; i < element["quantitée"]; i++){
                prixTotal += element["price"];
            }
        }
    });
    panier.textContent = resultat;
    nbrArticle.textContent = resultat + " " + nbrArticle.textContent;
    totalCommande.textContent += " " + prixTotal.toFixed(2) + "€";
}

products.forEach(element => {
    if(element["quantitée"] != 0){
        createBlockCart(element);
    }
});

function createBlockCart(product){
    let blockCart = document.createElement("div");
    blockCart.className = "blockCart";
    cartLeft.appendChild(blockCart);
    let img = document.createElement("img");
    img.src = product["src"];
    blockCart.appendChild(img);
    let blockRight = document.createElement('div');
    blockRight.className = "blockRight";
    blockCart.appendChild(blockRight);
    let nameProduct = document.createElement("span");
    nameProduct.textContent = product["name"];
    nameProduct.className = "title5";
    blockRight.appendChild(nameProduct);
    let descProduct = document.createElement("p");
    descProduct.textContent = product["desc"];
    blockRight.appendChild(descProduct);
    let blockBottom = document.createElement('div');
    blockBottom.className = "blockBottom";
    blockRight.appendChild(blockBottom);
    let blockPrice = document.createElement('div');
    blockPrice.className = "blockPrice";
    blockBottom.appendChild(blockPrice);
    let priceProduct = document.createElement("div");
    priceProduct.textContent = product["price"] + "€/unitée";
    blockPrice.appendChild(priceProduct);
    let lPriceProduct = document.createElement("div");
    lPriceProduct.textContent = product["Lprice"] + "€/L";
    blockPrice.appendChild(lPriceProduct);
    let cartButton = document.createElement("div");
    cartButton.className = "cartButton";
    blockBottom.appendChild(cartButton);
    let proQuantBlock = document.createElement('div');
    proQuantBlock.className = "proQuantBlock";
    cartButton.appendChild(proQuantBlock);
    let proQuant = document.createElement("span");
    proQuant.textContent = product["quantitée"];
    proQuantBlock.appendChild(proQuant);
    let cartButtonLeft = document.createElement("div");
    cartButtonLeft.className = "left";
    cartButtonLeft.textContent = '+';
    cartButton.appendChild(cartButtonLeft);
    let cartButtonRight = document.createElement("div");
    cartButtonRight.className = "right";
    cartButtonRight.textContent = '-';
    cartButton.appendChild(cartButtonRight);
}

let moreBtn = document.querySelectorAll(".left");
let lessBtn = document.querySelectorAll('.right');

for(let i = 0; i < moreBtn.length; i++){
    moreBtn[i].addEventListener("click", () => {
        let nameProduct = moreBtn[i].parentNode.parentNode.parentNode.querySelector(".title5").textContent;
        products.forEach(element => {
            if(element["name"] == nameProduct){
                if(parseInt(element["quantitée"]) < 9){
                    element["quantitée"]++;
                    moreBtn[i].parentNode.querySelector(".proQuantBlock").querySelector('span').textContent = element["quantitée"];
                    changementRight();
                    localStorage.setItem('panier', JSON.stringify(products));
                }else{
                    alert("Limite la plus haute, déjà atteinte.");
                }
            }
        })
    })
}

for(let i = 0; i < lessBtn.length; i++){
    lessBtn[i].addEventListener("click", () => {
        let nameProduct = moreBtn[i].parentNode.parentNode.parentNode.querySelector(".title5").textContent;
        products.forEach(element => {
            if(element["name"] == nameProduct){
                if(parseInt(element["quantitée"]) > 0){
                    element["quantitée"]--;
                    lessBtn[i].parentNode.querySelector(".proQuantBlock").querySelector('span').textContent = element["quantitée"];
                    changementRight();
                    localStorage.setItem('panier', JSON.stringify(products));
                }else{
                    alert("Limite la plus basse, déjà atteinte.");
                }
            }
        })
    })
}


function changementRight(){
    let resultat = 0;
    let prixTotal = 0;
    products.forEach(element => {
        resultat += parseInt(element["quantitée"]);
        if(parseInt(element["quantitée"]) !== 0){
            for(let i = 0; i < element["quantitée"]; i++){
                prixTotal += element["price"];
            }
        }
    });
    panier.textContent = resultat;
    nbrArticle.textContent = resultat + " ARTICLES DANS LE PANIER.";
    totalCommande.textContent = "TOTAL DE LA COMMANDE : " + prixTotal.toFixed(2) + "€";
}