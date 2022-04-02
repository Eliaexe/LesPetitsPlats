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
let newData = []


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
    if (searchString.length >= 3) {
        let z = []

        const food = data.filter((food) => {
            let x = food.ingredients
            let y = []

            x.forEach(e => {
                y.push(e.ingredient.toLowerCase())
            });
    
            for (let i in y) {
                if (!blueList.innerText.toLocaleLowerCase().includes(x[i].ingredient.toLocaleLowerCase())) {
                    if (x[i].ingredient.toLowerCase().includes(searchString)){
                        z.push(x[i].ingredient)
                        addTag(searchBlue, blueList, 'blue')
                        blueList.innerHTML += 
                            `
                                <button class="singleSort blue">${x[i].ingredient}</button>                    
                            `        
                    }
                }
            };
        });
    } else if (searchString < 3){
        blueList.innerHTML = ''
    }

});

searchGreen.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    let y = []    
    
    const food = data.filter((food) => {
        let x = food.appliance
        let z = [...new Set(y)]

        if (!z.includes(x.toLowerCase())) {
            y.push(x.toLowerCase())
        }

        if (searchString.length >= 3) {
            for (let i = 0; i < z.length; i++) {
                const el = z[i];
                if (el.includes(searchString)) {
                    if (!greenList.innerText.includes(el)) {
                        addTag(searchGreen, greenList, 'green')
                        greenList.innerHTML += 
                        `
                            <p>${el}</p>                    
                        `
                    }
                }
            }
        }  else if (searchString < 3){
            greenList.innerHTML = ''
        }
        return (
            food.appliance.toLowerCase().includes(searchString)
        )
    })
})

searchRed.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    let y = [] 

    const food = data.filter((food) => {
        let x = food.ustensils
        let z = [...new Set(y.sort())]

        for (let i = 0; i < x.length; i++) {
            const el = x[i];
            y.push(el.toLowerCase())
        }
        if (searchString.length >= 3) {
            for (let i = 0; i < z.length; i++) {
                const el = z[i];
                if (el.includes(searchString)) {
                    console.log(el.includes(searchString)   );
                    if (!redList.innerText.includes(el)) {
                        addTag(searchRed, redList, 'red')
                        redList.innerHTML += 
                        `
                            <p>${el}</p>                    
                        `
                    }
                }
            }
        }  else if (searchString < 3){
            redList.innerHTML = ''
        }
        //console.log(z.includes(searchString))        
    })
})

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
    /*if(searchFound !== null){
        let foundArr = []
        for (let i = 0; i < searchFound.length; i++) {
            const e = searchFound[i];
            console.log(e);
            if (!foundArr.includes(e.outerText)) {
                
                foundArr.push(e.outerText);
            }
            //console.log(foundArr);
        }
        
    }*/
}

// Take the list of specific item and sort the recepies whit that items 
function specificSort(sorted) {
    let asd = document.getElementsByClassName('tag')
    let x = data
    if (newData != '') {
        x = newData
    }
    Array.from(asd).forEach(function(e) {
        console.log(e.id)
    });
//console.log(x.id);
    for (let i = 0; i < asd.length; i++) {
        const el = asd[i];
        const item = sorted
        const type = el.title

        
        const food = x.filter((food) => {
            const {id ,ingredients, appliance, ustensils} = food
            if (type == 'blue') {
                ingredients.forEach(e => {
                    if (e.ingredient.includes(item) && !newData.includes(food)) {
                        newData.push(food)
                    }
                });

            }
            if (type == 'green' && appliance.toLowerCase().includes(item)) {
                newData.push(food)                
            }
            if (type == 'red' && ustensils.includes(item)) {
                newData.push(food)                  
            }
        });
        console.log(newData);
        displayfoods(newData)
    }
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
        //console.log(ingredients);
        function putIngredient() {
            for (let i = 0; i < ingredients.length; i++) {
                const e = ingredients[i];
                var {ingredient, quantity, unit } = e
            }
        }
        
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
};

loadfoods();
