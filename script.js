let basket = [];

const dialog = document.getElementById("orderDialog");

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

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
      amount: 1,
    });
  }

  renderBasket();
}

function renderBasket() {
  let basketDiv = document.getElementById("basket");
  basketDiv.innerHTML = "<h3 class='your-basket-color'> Your Basket </h3>";

  if (basket.length === 0) {
    basketDiv.innerHTML += "<p> Warenkorb Leer </p>";
    return;
  }

  let deliveryPrice = 4.99;
  let totalPrice = 0;

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    let itemTotal = basket[indexBasket].amount * basket[indexBasket].price;

    totalPrice += itemTotal;

    let minusButton = "";
    let deleteButton = `
         <button onclick="deleteItemFromBasket(${indexBasket})"> <img src="./assets/icons/delete.png" alt="delete button"></button>
         `;

    if (basket[indexBasket].amount >= 2) {
      minusButton = `
        <button onclick="removeFromBasket(${indexBasket})"> <img src="./assets/icons/minus_button.png" alt="minus button"></button>
        `;
    }

    basketDiv.innerHTML += `
       
    <div class="basket-item-card">
    <div class="basket-item-title">
      ${basket[indexBasket].amount} x ${basket[indexBasket].name}
    </div>

    <div class="basket-item-bottom">
      <div class="basket-item-actions">
        <button onclick="deleteItemFromBasket(${indexBasket})">
          <img src="./assets/icons/delete.png">
        </button>

        ${basket[indexBasket].amount >= 2 ? `
          <button onclick="removeFromBasket(${indexBasket})">
            <img src="./assets/icons/minus_button.png">
          </button>
        ` : ""}

        <button onclick="increaseAmount(${indexBasket})">
          <img src="./assets/icons/plus_button.png">
        </button>
      </div>

      <div class="basket-item-price">
        ${itemTotal.toFixed(2)}€
      </div>
    </div>
  </div>`;
  }

  let finalPrice = totalPrice + deliveryPrice;

  basketDiv.innerHTML += `
   <div class="basket-summary">
    <div class="summary-row">
      <span>Subtotal</span>
      <span>${totalPrice.toFixed(2)}€</span>
    </div>

    <div class="summary-row">
      <span>Delivery fee</span>
      <span>${deliveryPrice.toFixed(2)}€</span>
    </div>

    <hr>

    <div class="summary-row total">
      <span>Total</span>
      <span>${finalPrice.toFixed(2)}€</span>
    </div>
  </div>
  `;

  basketDiv.innerHTML +=`
  <button class="buy-now-btn" onclick="placeOrder(${finalPrice.toFixed(2)})">
    Bestellen (${finalPrice.toFixed(2)}€)
  </button>
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

function deleteItemFromBasket(indexBasket) {
  basket.splice(indexBasket, 1);
  renderBasket();
}

function placeOrder(finalPrice) {
    dialog.showModal();
    basket = [];
    renderBasket();
}

function closeOrderDialog() {
    document.getElementById("orderDialog").close();
}