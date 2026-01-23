let menuListContainer = document.getElementById('menu-list');

function generateMenu(){
    document.getElementById("menu_container"). innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        
        
    document.getElementById("menu_container").innerHTML += generateMenuHtml(i);
    }
}

// myDishes.forEach((myDishes,i) => {
//     menuListContainer.innerHTML += `<li>${myDishes}</li>`;
//     if((i +1) % 4 === 0) {
//         menuListContainer.innerHTML += `<h3>Neuer Kategorie</h3>`
//     }
//     });


