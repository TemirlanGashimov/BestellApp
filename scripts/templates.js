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

