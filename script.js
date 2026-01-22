function generateMenu(){
    document.getElementById("menu_container"). innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        
        
    document.getElementById("menu_container").innerHTML += generateMenuHtml(i);
    }
}