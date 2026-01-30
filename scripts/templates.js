function generateMenuHtml(i) {
  return `
    <div class="style_menu_box">

    <img class="responsive-menu-img" src="./assets/img/${myDishes[i].img}"  alt="${myDishes[i].alt}">
    
    <div class="menu_style">
   <div> <h3>${myDishes[i].name}</h3>
    <span> ${myDishes[i].description}</span> </div>

    <div class= "prices"> <span> ${myDishes[i].price.toFixed(2)}€ </span> 
    <img  src="./assets/fonts/${myDishes[i].btn}"  alt="${myDishes[i].btnalt}" onclick="addToBasket(${i})"></div>
    </div>
    `;
}

function basketHeaderTemplates() {
  return ` 
  <div class="basket-header">
    <h3 class="your-basket-color">Warenkorb</h3>
    <button class="basket-close-btn" onclick="closeBasketMobile()">✕</button>
  </div>
`;
}

function basketItems(indexBasket, itemTotal) {
  return `
    <div class="basket-item-card">
    <div class="basket-item-title">
      ${basket[indexBasket].amount} x ${basket[indexBasket].name}
    </div>

    <div class="basket-item-bottom">
      <div class="basket-item-actions">
        <button onclick="deleteItemFromBasket(${indexBasket})">
          <img src="./assets/icons/delete.png">
        </button>

        ${basket[indexBasket].amount >= 2? `
          <button onclick="removeFromBasket(${indexBasket})">
            <img src="./assets/icons/minus_button.png">
          </button>
        `
        : ""
        }

        <button onclick="increaseAmount(${indexBasket})">
          <img src="./assets/icons/plus_button.png">
        </button>
      </div>

      <div class="basket-item-price">
        ${itemTotal.toFixed(2)}€
      </div>
    </div>
  </div>
  `;
}

function basketPrice(totalPrice,deliveryPrice,finalPrice){
  return `
   <div class="basket-summary">
    <div class="summary-row">
      <span>Zwischensumme</span>
      <span>${totalPrice.toFixed(2)}€</span>
    </div>

    <div class="summary-row">
      <span>Lieferkosten</span>
      <span>${deliveryPrice.toFixed(2)}€</span>
    </div>

    <hr>

    <div class="summary-row total">
      <span>Gesamtsumme</span>
      <span>${finalPrice.toFixed(2)}€</span>
    </div>
  `;
}

function finalPriceOfAll(finalPrice) {
  return `
  <div class="btn-position"> 
  <button class="buy-now-btn" onclick="placeOrder(${finalPrice.toFixed(2)})">
    Bestellen (${finalPrice.toFixed(2)}€)
  </button>
  </div>
  `;
}

