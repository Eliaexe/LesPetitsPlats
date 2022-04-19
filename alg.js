// Place where the recepies are create
const foodsList = document.getElementById('main');
// Main search bar
const searchBar = document.getElementById('search');
// Child search bar
const searchBlue = document.getElementById('blue');
const searchGreen = document.getElementById('green');
const searchRed = document.getElementById('red');
// Where to display child resoult
const blueList = document.getElementById('blueRow');
const greenList = document.getElementById('greenRow');
const redList = document.getElementById('redRow');
// Where to display result for single search
let multicolor = document.getElementById('colorSort');
// All data fetched
let data = [];
let newData = [];
let uniqueArr = []      

function findIngredient(food) {
    const {id, name, time, description, ingredients, appliance, ustensils} = food
    let fff = ingredients.map(function (ingredient) {
        return ingredient.ingredient
    })
    let ggg = fff.join(',')
    for (let i = 0; i < food.length; i++) {
        const e = food[i];
    }
    return ggg
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const food = data.filter((food) => {
        return (
            food.name.toLowerCase().includes(searchString)
        );
    });
    displayfoods(food);
});

searchBlue.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const food = data.filter((food) => {
    
        return (
            findIngredient(food).toLowerCase().includes(searchString)
        );
    });
    displayfoods(food);
});


let searchs = {
    blue: [searchBlue, blueList],
    green: [searchGreen, greenList],
    red: [searchRed, redList]
}

function addTag(search, list, colore) {
    //Single sort oo child resoult
    const searchFound = document.querySelectorAll('.singleSort');
    for (const key in searchs) {
        if (Object.hasOwnProperty.call(searchs, key)) {
            const e = searchs[key];
            e[0].addEventListener('keydown', () =>{
                //console.log(e[1]);
            } )
        }
    }
    function model (text, color) {
        return (
        `
            <div class="tag ${color}" title="${color}" id="${text}" >
                <p>${text}</p>
                <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>    
            </div>
        `
        )
    }
    search.addEventListener('keypress', function (e) {
        let listItem = list.innerText
        if (e.key === 'Enter' && !multicolor.innerText.includes(listItem)) {
            
            multicolor.insertAdjacentHTML("beforeend", model(listItem, colore))
            search.value = ''
            specificSort(listItem)
        }
    });
}

// se il risultato equivale a zero chiama a senno chiama b
const loadfoods = async () => {
    try {
        const res = await fetch('data.json');
        data = await res.json();
        displayfoods(data);
    } catch (err) {
        console.error(err);
    }
};

const displayfoods = (foods) => {
    const htmlString = foods
        .map((food) => {
            const {id, name, time, description, ingredients, appliance, ustensils} = food
            let qqq = ingredients.map(function (ingredient) {
                return ingredient.ingredient
            })

            return`
            <div class="post">
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

    foods.forEach(e => {
        let x = document.getElementById(e.id)
        const {id, name, time, description, ingredients, appliance, ustensils} = e
        let qqq = ingredients.map(function (ingredient) {
            return ingredient.ingredient
        })
        for (let i = 0; i < qqq.length; i++) {
            const el = qqq[i];
            x.innerHTML += `<li>${el}</li>`
        }
    });
};

function putIngredient(eccolo) {
    let sector = document.getElementsByClassName('ul_post');
    for (let i = 0; i < sector.length; i++) {
        const e = sector[i];
        console.log(eccolo);
    }
}



loadfoods();
