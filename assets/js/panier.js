let products = JSON.parse(localStorage["panier"]);

let cartLeft = document.getElementById('cartLeft');
let panier = document.querySelector("div#cart");
let nbrArticle = document.getElementById("nbrArticle");
let totalCommande = document.getElementById("totalCommande");
const cross = document.querySelector('#cross');
const modal = document.querySelector('#modalContainer');
const btnCo = document.querySelector('#btnCo');
const btnFinal = document.querySelector('#btnFinal');
const livraisons = document.querySelector('#livraisons');
const recapArt = document.querySelector('#recapArt');
const repcapTotal = document.querySelector('#repcapTotal');
let prixLiv = 0;

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

livraisons.addEventListener('change', (e) =>{
    let choice = e.target.value;
    const recapLiv = document.querySelector('#recapLiv');
    if(choice == "Prio"){
        recapLiv.textContent = "LIVRAISON : 5€";
        prixLiv = 5;
    }else if(choice == "Stand"){
        recapLiv.textContent = "LIVRAISON : 3€";
        prixLiv = 3;
    }else if(choice == "1j"){
        recapLiv.textContent = "LIVRAISON : 7€";
        prixLiv = 7;
    }else{
        console.log("bug");
    }
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
    let total = prixTotal + prixLiv;
    repcapTotal.textContent = "MONTANT TOTAL : " + total.toFixed(2) + "€";
})



cross.addEventListener("click", () =>{
    modal.style.display = "none";
})

btnCo.addEventListener("click", () =>{
    modal.style.display = "flex";
    if(prixLiv != 0){
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
        let total = prixTotal + prixLiv;
        repcapTotal.textContent = "MONTANT TOTAL : " + total.toFixed(2) + "€";
    }else{
        let resultat = 0;
        products.forEach(element => {
            resultat += parseInt(element["quantitée"]);
        });
        recapArt.textContent = "ARTICLES : " + resultat;
    }
})

btnFinal.addEventListener("click", () =>{
    let name = document.querySelector('#name').value;
    let numVoie = document.querySelector('#numVoie').value;
    let typeVoie = document.querySelector('#typeVoie').value;
    let voie = document.querySelector('#voie').value;
    let cp = document.querySelector('#cp').value;
    let city = document.querySelector('#city').value;
    let tel = document.querySelector('#tel').value;
    let infos = document.querySelector('#infos').value;
    let livraisons = document.querySelector('#livraisons').value;
    console.log(name, numVoie, typeVoie, voie, cp, city, tel, infos, livraisons);
    const commandes = {
        "name": name,
        "numVoie": numVoie,
        "typeVoie": typeVoie,
        "voie": voie,
        "cp": cp,
        "city": city,
        "tel": tel,
        "infos": infos,
        "livraisons": livraisons
    };

    /* Envoie */
    fetch("http://unefausseadresse/quinexistepas.dev", {
	method: "POST",
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
        body: JSON.stringify(commandes)
    })
});

const burger = document.querySelector('#burger');
const panelHeader2 = document.querySelector('#panelHeader2');

burger.addEventListener("click", () => {
    if(panelHeader2.style.display == "block"){
        panelHeader2.style.display = "none";
    }else{
        panelHeader2.style.display = "block";
    }
})