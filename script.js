let menuListContainer = document.getElementById("menu-list");
let basketRef = document.getElementById("basket");

function generateMenu() {
  document.getElementById("menu_container").innerHTML = "";
  for (let i = 0; i < myDishes.length; i++) {
    document.getElementById("menu_container").innerHTML += generateMenuHtml(i);
  }
}

function addToBasket(i) {
  myDishes[i].amount++;

  myDishes.push()
}