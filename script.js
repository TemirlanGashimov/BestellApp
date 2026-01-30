let basket = []; // Hier speichern wir alle Produkte, die im Warenkorb sind, Jedes Produkt ist ein Objekt: { name, price, amount }

const dialog = document.getElementById("orderDialog"); // Wir holen uns das <dialog>-Element aus dem HTML

dialog.addEventListener("click", (event) => { // Wenn man auf den dunklen Hintergrund klickt, soll sich der Dialog schließen
  if (event.target === dialog) {
    dialog.close();
  }
});

function generateMenu() {
  document.getElementById("menu_container").innerHTML = ""; // Menü-Container zuerst leeren (wichtig bei erneutem Rendern)
  for (let i = 0; i < myDishes.length; i++) { // Schleife durch alle Gerichte aus db.js (myDishes)
    document.getElementById("menu_container").innerHTML += generateMenuHtml(i);  // Für jedes Gericht HTML erzeugen und anhängen
  }
}

function addToBasket(i) {
  let dish = myDishes[i]; // Das ausgewählte Gericht aus der Liste holen
  let found = false; // Merker: Ist das Gericht schon im Warenkorb?

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) { // Durch den Warenkorb gehen
    if (basket[indexBasket].name === dish.name) { // Wenn ein Gericht mit gleichem Namen gefunden wird
      basket[indexBasket].amount++; // Menge erhöhen
      found = true;
      break;  //Schleife abbrechen
    }
  }
  if (!found) { // Wenn das Gericht NOCH NICHT im Warenkorb war
    basket.push({
      name: dish.name,
      price: dish.price,
      amount: 1, // Startmenge
    });
  }
  renderBasket(); // Warenkorb neu anzeigen
}

function renderBasket() {
  let basketDiv = document.getElementById("basket"); // Warenkorb-DIV aus dem HTML holen
 
  // Kopfbereich des Warenkorbs (Titel + X-Button)
  basketDiv.innerHTML = ` 
  <div class="basket-header">
    <h3 class="your-basket-color">Warenkorb</h3>
    <button class="basket-close-btn" onclick="closeBasketMobile()">✕</button>
  </div>
`;

  if (basket.length === 0) {  // Wenn keine Produkte im Warenkorb sind
    basketDiv.innerHTML +=
      "<p class='shopping-cart-empty'> Warenkorb ist leer  </p>";
    return; // Funktion beenden
  }

  let deliveryPrice = 4.99; // Fester Lieferpreis
  let totalPrice = 0; // Zwischensumme aller Produkte

basketDiv.innerHTML += "<div class='overflow-y' id='items'> </div>"  // Container für die einzelnen Warenkorb-Items

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    let itemTotal = basket[indexBasket].amount * basket[indexBasket].price; // Preis für dieses einzelne Produkt (Menge × Preis)
    totalPrice += itemTotal; // Zur Gesamtsumme addieren

    let minusButton = "";
    let deleteButton = `
         <button onclick="deleteItemFromBasket(${indexBasket})"> <img src="./assets/icons/delete.png" alt="delete button"></button>
         `;

    if (basket[indexBasket].amount >= 2) { //Minus Button nur ab Menge >= 2
      minusButton = `
        <button onclick="removeFromBasket(${indexBasket})"> <img src="./assets/icons/minus_button.png" alt="minus button"></button>
        `;
    }

    document.getElementById("items").innerHTML+= `
    
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
  </div>`;
  }

  let finalPrice = totalPrice + deliveryPrice; // Endpreis = Zwischensumme + Lieferung

  basketDiv.innerHTML += `
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

  basketDiv.innerHTML += `
  <div class="btn-position"> 
  <button class="buy-now-btn" onclick="placeOrder(${finalPrice.toFixed(2)})">
    Bestellen (${finalPrice.toFixed(2)}€)
  </button>
  </div>
  `;
}

function increaseAmount(indexBasket) { //Funktion für Hochzählen bei plusdrücken 
  basket[indexBasket].amount++;
  renderBasket();
}

function removeFromBasket(indexBasket) { //Funktion runter zählen bei minusdrücken 
  basket[indexBasket].amount--;

  if (basket[indexBasket].amount === 0) {
    basket.splice(indexBasket, 1);
  }

  renderBasket();
}

function deleteItemFromBasket(indexBasket) { //Funktion die ausgewählte ware direkt löschen egal wie viele Menze/Anzahl usw
  basket.splice(indexBasket, 1);
  renderBasket();
}

function placeOrder(finalPrice) {
  dialog.showModal(); // Bestell-Dialog anzeigen
  basket = []; // Warenkorb leeren
  renderBasket(); // UI aktualisieren
  closeBasketMobile(); // Mobile-Warenkorb schließen
}

function closeOrderDialog() { //Dialog Schließen 
  document.getElementById("orderDialog").close();
}

function openBasketMobile() { // Mobiles Warenkorb öffnen
  document.querySelector(".basket_wrapper").classList.add("overlay");
  document.body.classList.add("no-scroll");
}

function closeBasketMobile(){ //Mobiles Warenkorb schließen
    document.querySelector(".basket_wrapper").classList.remove("overlay");
    document.body.classList.remove("no-scroll");
}

function handleBasketClick() {
  if (basket.length === 0) { // Wenn der Warenkorb leer ist → nichts öffnen
    return;
  }

  openBasketMobile();
}
