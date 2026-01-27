let basketRef = document.getElementById("basket");
let basket = [];


function generateMenu() {
  document.getElementById("menu_container").innerHTML = "";
  for (let i = 0; i < myDishes.length; i++) {
    document.getElementById("menu_container").innerHTML += generateMenuHtml(i);
  }
}

function addToBasket(i) {
    let dish = myDishes[i];
    let found = false;

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        if (basket[indexBasket].name === dish.name) {
            basket[indexBasket].amount++;
            found = true;
            break;
        }
    }

    if (!found) {
        basket.push({
            name: dish.name,
            price: dish.price,
            amount: 1
        });
    }
  
    renderBasket();

}

function renderBasket() {
    let basketDiv = document.getElementById("basket");
    basketDiv.innerHTML = "<h3 class= your-basket-color > Your Basket </h3>";

     if (basket.length === 0) {
        basketDiv.innerHTML += "<p> Warenkorb Leer </p>";
        return;
    }

    let totalPrice = 0;

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {

        let itemTotal = basket[indexBasket].amount * basket[indexBasket].price;

        totalPrice += itemTotal;

         let minusButton = "";
         let deleteButton = `
         <button onclick="deletItemFromBasket(${indexBasket})"> <img src="./assets/icons/delete.png" alt="delete button"></button>
         `;

    if (basket[indexBasket].amount >= 2) {
        minusButton = `
        <button onclick="removeFromBasket(${indexBasket})">-</button>
        `;}

        basketDiv.innerHTML += `
            <div    class="basket-items">
            <div >
            <span>${basket[indexBasket].amount} x ${basket[indexBasket].name}</span><br>

            <span>
               ${basket[indexBasket].price.toFixed(2)}€ 
            = ${itemTotal.toFixed(2)}€
            </span>

            <button onclick="increaseAmount(${indexBasket})">+</button>
            ${minusButton}
            ${deleteButton}
            </div>
            </div>`;
    } 
    
    basketDiv.innerHTML += `
     <hr>
     <h3>Total: ${totalPrice.toFixed(2)}€</h3>
    <button onclick="clearBasket()">Warenkorb leeren </button>
    `;
}

function increaseAmount(indexBasket) {
    basket[indexBasket].amount++;
    renderBasket();
}

function removeFromBasket(indexBasket) {
    basket[indexBasket].amount--;

    if (basket[indexBasket].amount === 0) {
        basket.splice(indexBasket, 1);
    }

    renderBasket();
}

function deletItemFromBasket(indexBasket) {
    basket.splice(indexBasket, 1);
    renderBasket();
}

function clearBasket() {
    basket = [];
   
    renderBasket();
}