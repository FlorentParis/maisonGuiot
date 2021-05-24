/* Sources : */
/* https://www.youtube.com/watch?v=vKrdqbBK_tE */


/* params généraux + déclaration de var */
container = document.querySelector('.shopContainer');
let panier = document.querySelector("#cart");


var requestURL = './assets/js/products.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    if(localStorage["panier"]){
        products = JSON.parse(localStorage["panier"]);
        let resultat = 0;
        products.forEach(element => {
            resultat += parseInt(element["quantitée"]);
        });
        panier.textContent = resultat;
    }else{
    var products = request.response;
    }
    showProducts(products);
}


/* Creation et affichage de tout les articles */
function showProducts(products){
    for(let i = 0; i < products.length; i++){
        products[i]["id"] = i;
        let shopBlock = document.createElement("div");
        shopBlock.className = "shopBlock";
        shopBlock.id = i;
        let img = document.createElement("img");
        img.src = products[i]["src"]; 
        shopBlock.appendChild(img);
        container.append(shopBlock);
        let blockLine = document.createElement("div");
        blockLine.className = "blockLine";
        shopBlock.appendChild(blockLine);
        let name = document.createElement('span');
        name.className = "title10";
        name.textContent = products[i]['name'];
        blockLine.appendChild(name);
        var blockLine2 = document.createElement('div');
        blockLine2.className = "blockLine2";
        blockLine.appendChild(blockLine2);
        let linePrice = document.createElement("div");
        linePrice.className = "linePrice";
        blockLine2.appendChild(linePrice);
        let price = document.createElement('span');
        let Lprice = document.createElement('span');
        price.textContent = products[i]["price"] + "€";
        Lprice.textContent = products[i]["Lprice"] + "€/L";
        linePrice.appendChild(price);
        linePrice.appendChild(Lprice);
        let cartContainer = document.createElement('div');
        cartContainer.className = "cartContainer";
        let cart = document.createElement('img');
        cart.className = "cart";
        cart.src = "assets/icons/cart.svg";
        blockLine2.appendChild(cartContainer);
        cartContainer.appendChild(cart);
    
        /* Creation des selecteurs d'unités */
        let choiceListUl = document.createElement('ul');
        choiceListUl.className = "choiceListUl";
        cartContainer.appendChild(choiceListUl);
        for(let i = 1; i < 11; i++){
            if(i < 10){
                let choiceListLi = document.createElement('li');
                choiceListLi.className = "choiceListLi";
                choiceListLi.value = i;
                choiceListLi.textContent = i;
                choiceListUl.prepend(choiceListLi);
            }else{
                let choiceListLi = document.createElement('li');
                choiceListLi.className = "choiceListLi";
                let choiceImg = document.createElement('img');
                choiceImg.src = "assets/icons/delete.svg";
                choiceListUl.prepend(choiceListLi);
                choiceListLi.appendChild(choiceImg);
            }
        }
        choiceListUl.style.visibility = "hidden";
    }
    verifColoration();

    /* Interaction avec les selecteurs d'unités */
    let cart = document.querySelectorAll('.cart');

    cart.forEach(element =>{
        element.addEventListener("click", () => {
            if(element.parentNode.querySelector(".choiceListUl").style.visibility == "hidden"){
                element.parentNode.querySelector(".choiceListUl").style.visibility = "visible";
                cart.forEach(ele =>{
                    if(ele != element){
                        ele.parentNode.querySelector(".choiceListUl").style.visibility = "hidden";
                    }
                });
            }else{
                element.parentNode.querySelector(".choiceListUl").style.visibility = "hidden";
            }
        });
    });

    var choiceListLi = document.querySelectorAll('li.choiceListLi');
    choiceListLi.forEach(li => {
        li.addEventListener("click", () =>{
            shopBlockSelecId = li.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            colorationLi(li);
            if(li.textContent){
                products[shopBlockSelecId]["quantitée"] = li.textContent;
            }else{
                products[shopBlockSelecId]["quantitée"] = 0;
            }
            verifPanier();
        });
    });

    function verifPanier(){
        let resultat = 0;
        products.forEach(element => {
            resultat += parseInt(element["quantitée"]);
        });
        panier.textContent = resultat;
        localStorage.setItem('panier', JSON.stringify(products));
    }

    function colorationLi(li){
        /* .style.backgroundColor = "none"; */
        var test = li.parentNode.querySelectorAll('li');
        test.forEach(element => {
            element.style.backgroundColor = "white";
            element.style.color = "black";
        });
        li.style.backgroundColor = "#5B9F27";
        li.style.color = "white";
    }

    function verifColoration(){
        let listUl = document.querySelectorAll('.choiceListUl');
        for(let i = 0; i < products.length; i++){
            if(products[i]["quantitée"] != 0){
                let nbr = 10 - listUl[products[i]["id"]].childNodes[parseInt(products[i]["quantitée"])].value;
                if(10 - listUl[products[i]["id"]].childNodes[parseInt(products[i]["quantitée"])].value == parseInt(products[i]["quantitée"])){
                    console.log("work");
                    listUl[products[i]["id"]].childNodes[10 - nbr].style.backgroundColor = "#5B9F27";
                    listUl[products[i]["id"]].childNodes[10 - nbr].style.color = "#fff";
                }
            }
        }
    }

    const burger = document.querySelector('#burger');
    const panelHeader2 = document.querySelector('#panelHeader2');

    burger.addEventListener("click", () => {
        if(panelHeader2.style.display == "block"){
            panelHeader2.style.display = "none";
        }else{
            panelHeader2.style.display = "block";
        }
    })
}