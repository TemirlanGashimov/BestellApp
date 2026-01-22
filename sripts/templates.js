function generateMenuHtml(i){
    return`
    <div class="">
    <h3>${myDishes[i].name}</h3>
    
    <p> ${myDishes[i].price.toFixed(2)} </p>
    
    <p> ${myDishes[i].description}</p>
    
    `
}