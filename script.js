let cardContainer = document.getElementById('cardContainer');
let input = document.getElementsByClassName('input');
let listForSearch = document.getElementById('specificSelected')

// fetch
const loadfoods = async () => {
    try {
        const res = await fetch('recipes.json');
        let data = await res.json();
        let food = data.recipes;
        search(food)      
        showRecipes(food)
        dropDown(food)
    } catch (err) {
        console.error(err);
    }
};

loadfoods()

//get all the single recepies
function showRecipes(e){
    for (let i = 0; i < e.length; i++) {
        const el = e[i];
        displayCard(el)
    }
}

//display all the card disponible
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
                <p class="description">${obj.description}</p>
            </div>
        </div>
    </article>
    `
    cardContainer.innerHTML += card
    //display single ingredients in his card
    let ingredients = obj.ingredients
    for (let i = 0; i < ingredients.length; i++) {
        const ele = ingredients[i];
        document.getElementById(obj.id).querySelector('.ul_post').innerHTML += `<li>${ele.ingredient}: ${ele.quantity} ${ele.unit}</li>`
    }
}

//dropdown open and close
function dropDown(food){
    let dropIcon = document.querySelectorAll('span')
    for (let i = 0; i < dropIcon.length; i++) {
        const e = dropIcon[i];
        let displayRes = e.parentElement.parentElement.childNodes[5]
        e.addEventListener('click', () => {
            let dropContainer = e.parentElement.parentElement
            let place = dropContainer.children[0].children[0].placeholder
            sortSpecific(food, place)
            dropContainer.classList.toggle('disponible')
            if (dropContainer.classList.contains('disponible') == true) {
                dropContainer.children[1].style.display = 'block'
                if (dropContainer.classList.contains('wrt') == true) {
                    dropContainer.classList.remove('wrt')
                    displayRes.style.display = 'none'
                }
                // randomSelection(food, dropContainer.children[0].children[0].placeholder)         
            } else if (dropContainer.classList.contains('disponible') == false) {
                dropContainer.children[1].style.display = 'none'                
            }
        })
        
        let writeDrop = e.previousElementSibling
        writeDrop.addEventListener('input', (event) => {
            let userSearch = event.target.value.toLowerCase().trim()
            let dropResoult = writeDrop.parentNode.parentNode.childNodes[3]
            let icon = writeDrop.parentNode.lastElementChild;
            icon.click()
            icon.click()
            let allSpecific = Array.from(dropResoult.childNodes, x => x.innerText.toLowerCase())
            let container = e.parentElement.parentElement
            
            container.classList.add('wrt')
            displayRes.style.display = 'block'
            displayRes.innerHTML = `${allSpecific.find(o => o.toLowerCase().includes(userSearch))}`
            if (userSearch.length == 0) {
                container.classList.remove('wrt')
                displayRes.style.display = 'none'
            }
        })
    }
}

function relevantRecepies(food) {
    let relevant = document.querySelectorAll('article:not(.d-none)')
    let relevantId = Array.from(relevant, x => x.id)
    let lookingFor = relevantId.map((x) => { return food.find(element => element.id == x) })
    return lookingFor
}

//return the specific item in dropdown list
function sortSpecific(food, place) {
    let iFindThis = relevantRecepies(food).filter(Boolean)
    if (place == 'Ingredients') {
        let ingrObj = Array.from(iFindThis, x => x.ingredients)
        let ingrArr = ingrObj.map((x) => {return Array.from(x, y => y.ingredient)})
        let allIngredient = ingrArr.flatMap(x => x)
        return refreshDropDown([...new Set(allIngredient)], place, food)       
    } else if (place == 'Appareils') {
        let applianceArr = Array.from(iFindThis, x => x.appliance)
        return refreshDropDown([...new Set(applianceArr)], place, food)
    } else if (place == 'Utensiles') {
        let utensilesArr = Array.from(iFindThis, x => x.ustensils)
        let allUtensiles = utensilesArr.flatMap(x => x)
        return refreshDropDown([...new Set(allUtensiles)], place, food)
    }
}

//display the specific item in dropdown list
function refreshDropDown(arr, place, food) {
    let putHere = document.querySelector(`[placeholder=${place}]`).parentNode.parentNode.children[1]
    putHere.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        putHere.innerHTML += `<li>${e}</li>`
    }
    addAndSearch(putHere, food)
}

//take the dropdown element clicked and copy to the top list for sort
function addAndSearch(place, food) {
    let listToListen = place.children
    let background = place.parentElement.classList[1]
    for (let i = 0; i < listToListen.length; i++) {
        const e = listToListen[i];
        e.addEventListener('click', (event) => {
            if (listForSearch.innerText.includes(e.innerHTML) == false) {
                listForSearch.innerHTML += `<li class="${background}">${e.innerHTML}<img src="./img/remove-icon.png"></img></li>`
                menageFilter(food);
            }
        })
    }
}

//find the dropdown name
function findTheDrop(background) {
    for (let i = 0; i < input.length; i++) {
        const e = input[i];
        if (e.classList.contains(background)) {
            return e.placeholder
        }
    }
}

// remove tag if click on x img
function menageFilter(data) {
    let tags = listForSearch.childNodes
    for (let i = 0; i < tags.length; i++) {
        const e = tags[i].childNodes[1];
        const bkg = e.parentNode.classList.value
        let group = findTheDrop(bkg)
        searchWhitTags(data, 'add'); 
        sortSpecific(data, group)
        e.addEventListener('click', () =>{
            if (tags.length == 1) {
                resetRecepies(data)
            }
            e.parentElement.remove()
            searchWhitTags(data, 'remove'); 
            sortSpecific(data, group)
        })
    }
}

//all recepies must be visible
function resetRecepies(food) {
    let posts = document.getElementsByClassName('post')
    for (let i = 0; i < posts.length; i++) {
        const e = posts[i];
        if (e.classList.contains('d-none') == true) {
            e.classList.remove('d-none')
        }
    } 
    dropDownRefresced(food)
}

function dropDownRefresced(food) {
    data = food.filter(Boolean)
    let filterInput = document.getElementsByClassName('filter--search')
    for (let i = 0; i < filterInput.length; i++) {
        const element = filterInput[i].placeholder;
        sortSpecific(data, element)
    }
}

//log the recepies we need to show
function searchWhitTags(foods, action) {
    let existingTags = listForSearch.children
    for (let i = 0; i < existingTags.length; i++) {
        const e = existingTags[i];
        let background = e.classList.value
        let element = e.innerText
        let mapping = foods.map((food) => {
            const {id, name, time, description, ingredients, appliance, ustensils} = food 
            if (document.getElementById(food.id).classList.contains('d-none') == false) {
                if (background == 'blue--bg' && !ingredients.find(o => o.ingredient.toLowerCase().includes(element.toLowerCase()))) {
                    return food
                } else if (background == 'green--bg' && !(appliance.toLowerCase() == element.toLowerCase())){
                    return food 
                } else if (background == 'red--bg' && !ustensils.includes(element)){
                    return food 
                }
            }
        })
        let data = mapping.filter(Boolean)
        if (action == 'remove') { 
            console.clear()
            resetRecepies(data)
            searchWhitTags(foods, 'add')
        } else if (action == 'add'){
            displayResoult(mapping)
        }
    }
}

//search based on user input
function search (data) {
    let mainSearchBar = document.querySelector('.placeholder--dark-grey')
    mainSearchBar.addEventListener('input', (event) => { 
        console.clear()
        let searchString = event.target.value.toLowerCase().trim()
        let recepiesMapping = []
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let ingr = []
            for (let i = 0; i < e.ingredients.length; i++) {
                const el = e.ingredients[i].ingredient;
                ingr.push(el.toLowerCase())
            }
            if (!e.name.toLowerCase().includes(searchString)  && !e.description.toLowerCase().includes(searchString) && !ingr.includes(searchString)) {
                recepiesMapping.push(e)
            }
        }
        


        // let recepiesMapping = data.map((food) => {
        //     const {id, name, time, description, ingredients, appliance, ustensils} = food 
        //     if (!(name.toLowerCase().includes(searchString) ||
        //         description.toLowerCase().includes(searchString) ||
        //         ingredients.find(o => o.ingredient.toLowerCase().includes(searchString)))){
        //             return food                                   
        //     }                    
        // })
        resetRecepies(recepiesMapping)
        displayResoult(recepiesMapping)
    })
}

//display the sorted recepies
function displayResoult(recepiesMapping) {
    let showThis = recepiesMapping.filter((x) => { return x !== undefined }) 
    let message = document.getElementsByClassName('not-found')[0]
    for (let i = 0; i < showThis.length; i++) {
        const ele = showThis[i];
        let recepiesDisplaied = document.getElementById(ele.id);
        if (ele.id != undefined && recepiesDisplaied != null) {
            recepiesDisplaied.classList.add('d-none')                
        }
    }  
    if (showThis.length == 50) {
        message.style.display = "block"
    } else if (showThis.length < 50){
        message.style.display = "none"
    }
}