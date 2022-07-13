// Place where the recepies are create
const foodsList = document.getElementById('main');
// Main search bar
const searchBar = document.getElementById('search');
// Child search bar
const searchBlue = document.getElementById('blue');
const searchGreen = document.getElementById('green');
const searchRed = document.getElementById('red');
// All search bars
const searchInput = document.getElementsByClassName('searchInput')
// Where to display child resoult
const blueList = document.getElementById('blueRow');
const greenList = document.getElementById('greenRow');
const redList = document.getElementById('redRow');
// Where to display result for single search
let multicolor = document.getElementById('colorSort');
let dropDown = document.getElementsByClassName('dropDown');
// Dropdown items
const specificSearch = document.getElementsByClassName('placeholder');
const specificItem = document.getElementsByClassName('specificItem');
const specificPlace = document.getElementById('specificSelected');

// user search in the data 
for (let i = 0; i < searchInput.length; i++) {
    const input = searchInput[i];
    input.addEventListener('keyup', () => {
        let searchString = input.value.toLowerCase()
            const foods = data.filter((food) => {
                const {id, name, time, description, ingredients, appliance, ustensils} = food
                for (let i = 0; i < foodsList.children.length; i++) {
                    const cardIndex = foodsList.children[i].classList[1];
                    if (id == cardIndex) {
                        let ingredient = ingredients.map((x) => {
                            return x.ingredient
                        })

                        if (input.name == 'ingredients') {
                            return (
                                ingredient.join(',').toLowerCase().includes(searchString)
                            );
                        } else if (input.name == 'appareils') {
                            return (
                                appliance.toLowerCase().includes(searchString)
                            );
                        } else if (input.name == 'utensiles') {
                            return (
                                ustensils.join(',').toLowerCase().includes(searchString)
                            );
                        } else if (input.name == 'mainSearch') {
                            return (
                                food.name.toLowerCase().includes(searchString) ||
                                food.description.toLowerCase().includes(searchString) ||
                                ingredients.find(o => o.ingredient.toLowerCase().includes(searchString))
                            );
                        }
                    }
                }
            })
        if (searchString.length >= 3) {
            displayfoods(foods)   
        }
    })
}

// fetch
const loadfoods = async () => {
    try {
        const res = await fetch('data.json');
        data = await res.json();
        displayfoods(data);
    } catch (err) {
        console.error(err);
    }
};

// display all the data 
const displayfoods = (foods) => {
    const htmlString = foods
        .map((food) => {
            const {id, name, time, description, ingredients, appliance, ustensils} = food
            return`
            <div class="post ${id}">
                <div class="top_post"></div>
                <div class="pad">
                    <div class="middle_post">
                        <div class="post_title">${name}</div>
                        <div class="post_time">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>
                            <p class="post_number">${time}</p>
                        </div>
                    </div>
                    <div class="bottom_post">
                        <ul class="ul_post" id="${id}">

                        </ul>
                        <p class="description">${description}</p>
                    </div>
                </div>
            </div>`;
        }).join('');
    foodsList.innerHTML = htmlString;

    //display the specific data on recepies card
    let ingDisponible = []
    let appDisponible = []
    let uteDisponible = []
    foods.forEach(e => {
        let post = document.getElementById(e.id)
        const {id, name, time, description, ingredients, appliance, ustensils} = e
        let ingrTLC = ingredients.map(function (ingredient) {
            ingDisponible.push(ingredient.ingredient)
            return ingredient.ingredient.toLowerCase()
        })
        appDisponible.push(appliance)
        for (let i = 0; i < ustensils.length; i++) {
            const e = ustensils[i];
            uteDisponible.push(e)
        }
        let ingrQuantity = ingredients.map(function (ingredient) {
            return ingredient.quantity || ingredient.quantite
        })
        let ingrUnit = ingredients.map(function (ingredient) {
            return ingredient.unit
        })
        for (let i = 0; i < ingrTLC.length; i++) {
            const iName = ingrTLC[i];
            let iQuant = `: ${ingrQuantity[i]}`
            let iUnit = ingrUnit[i]
            if (ingrQuantity[i] === undefined) {
                iQuant = ``
            }
            if (iUnit === undefined) {
                iUnit = ``
            }
            post.innerHTML += `<li>${iName} ${iQuant} ${iUnit}</li>`
        }
    });

    // display the element in the search bar
    let childList = document.getElementsByClassName('listed');
    blueList.innerHTML = ``
    greenList.innerHTML = ``
    redList.innerHTML = ``
    new Set(ingDisponible).forEach(element => {
        blueList.innerHTML += `<button class='specificItem'>${element}</button>`
    });
    new Set(appDisponible).forEach(element => {
        greenList.innerHTML += `<button class='specificItem'>${element}</button>`
    });
    new Set(uteDisponible).forEach(element => {
        redList.innerHTML += `<button class='specificItem'>${element}</button>`
    });

    // display and use the specific dropdown menu
    for (let i = 0; i < dropDown.length; i++) {
        const element = dropDown[i];
        element.addEventListener('click', () =>{
            let subElement = document.querySelector(`[name=${element.previousElementSibling.id}]`).parentElement;
            subElement.classList.toggle("d-none");
            for (let i = 0; i < specificItem.length; i++) {
                const el = specificItem[i];
                el.addEventListener('click', () => {
                    let color = el.parentElement.attributes[0].value
                    let spec = el.innerText
                    let elDuplicate = document.querySelectorAll(`[name='${spec}']`)
                    if (elDuplicate.length == 0) {
                        specificPlace.innerHTML += `
                        <div class="tag ${color}" title="${color}" name="${spec}" >
                            <p>${spec}</p>
                            <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
                        </div>
                        `
                    } else {
                        return
                    }
                })
            }
        })
    }

    // eliminate the specific element not searched
    for (let i = 0; i < specificSearch.length; i++) {
        const e = specificSearch[i];
        let input = e.value.toLowerCase();
        let list = document.querySelector(`[name=${e.id}]`);
        for (let i = 0; i < list.childNodes.length; i++) {
            const el = list.childNodes[i];
            if (!el.innerText.toLowerCase().includes(input)) {
                el.classList.add("d-none")
            }
        }
    }

    if (foodsList.childNodes.length == 0) {
        foodsList.innerHTML += `<div class="not-found"><p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p></div>`
    }
};

loadfoods();
