//get all the single recepies and display
function showRecipes(e){
    for (let i = 0; i < e.length; i++) {
        const el = e[i];
        displayCard(el)
    }
    removeUndefined()
}

//display the UI of the card
function displayCard(obj) {
    let cardContainer = document.getElementById('cardContainer');
    let card = `
    <article class="post" id="${obj.id}">
        <div class="top_post"></div>
        <div class="pad">
            <div class="middle_post">
                <div class="post_title">${obj.name}</div>
                <div class="post_time">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>
                    <p class="post_number">${obj.time}</p>
                </div>
            </div>
            <div class="bottom_post">
                <ul class="ul_post" >
                <div class="prova"></div>
                </ul>
                <p class="description scrollBar">${obj.description}</p>
            </div>
        </div>
    </article>
    `
    cardContainer.innerHTML += card
    //display single ingredients in his card
    let ingredients = obj.ingredients
    for (let i = 0; i < ingredients.length; i++) {
        const ele = ingredients[i];
        document.getElementById(obj.id).querySelector('.ul_post').innerHTML += `<li class="singleIngredient">${ele.ingredient}: ${ele.quantity} ${ele.unit}</li>`
    }
}

// remove undefined from the ingredient
function removeUndefined() {
    let lines = document.querySelectorAll('.singleIngredient')
    lines.forEach(e => {
        if (e.innerHTML.includes('undefined')) {
            let nuovaStr = e.innerHTML.replace(/\bundefined\b/g, "");
            e.innerText = nuovaStr
        }
    });
}

function changeDisplay(data) {
    let showThis = data.filter(Boolean)
    let idToDisplay = showThis.map(x => x.id)
    let recepies = document.querySelectorAll('.post')
    recepies.forEach(e => {
        if (idToDisplay.includes(Number(e.id)) == false) {
            document.getElementById(e.id).classList.add('d-none')
        } else if (idToDisplay.includes(Number(e.id)) == true || 
                   document.getElementById(e.id).classList.contains('d-none')) {
            document.getElementById(e.id).classList.remove('d-none')
        }
    });
    let type = ['Ingredients' , 'Appareils', 'Utensiles']
    type.forEach(e => {
        sortSpecific(data.filter(Boolean), e)
    });
}
