function generateMenuHtml(i){
    return`
    <div class="">
    <h3>${myDishes[i].name}</h3>
    
    <img class="" src="./assets/img/${myDishes[i].img}"  alt="${myDishes[i].alt}"</div>

    <p> ${myDishes[i].price.toFixed(2)} </p>
    
    <p> ${myDishes[i].description}</p>
    
    `
}