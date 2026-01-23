function generateMenuHtml(i){
    return`
    <div class="style_menu_box">

    <img class="" src="./assets/img/${myDishes[i].img}"  alt="${myDishes[i].alt}"
    
    <div>
   <div> <h3>${myDishes[i].name}</h3>
    <span> ${myDishes[i].description}</span> </div>

    <div class="prices"> <span> ${myDishes[i].price.toFixed(2)} </span> </div>
    
    
    
    </div>
    `
}