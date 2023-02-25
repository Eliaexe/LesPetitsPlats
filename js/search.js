//eventListener for big search
function search (data) {
    document.getElementById('big-search').addEventListener('input', (event) => { 
        let processedData = processingData(data)
        let searchString = event.target.value.toLowerCase().trim()      
        let recepiesMapping = bigSearch(processedData, searchString)
        if (searchString.length >= 3) {
            changeDisplay(recepiesMapping)
        } else if (searchString.length <= 3) {
            changeDisplay(recepiesMapping)
        }
    })
}

//actual algo for sorting stuff
function bigSearch(data, str) {
    let processedData = processingData(data)
    let recepiesMapping = processedData.filter(Boolean).map((food) => {
        const {id, name, time, description, ingredients, appliance, ustensils} = food 
        if ((name.toLowerCase().includes(str) ||
            description.toLowerCase().includes(str) ||
            ingredients.find(o => o.ingredient.toLowerCase().includes(str)))){
                return food                                   
        }                    
    })
    return recepiesMapping
}

//prepare data whit the tags sorting
function processingData(data) {
    let tags = document.getElementById('specificSelected')
    let tagsCounter = document.getElementById('specificSelected').children.length
    if (tagsCounter > 0) { 
        let type = tags.lastChild.getAttribute('data-type')
        let ofWhat = tags.lastChild.innerText
        console.log(type, ofWhat);
        return findRecepiesFromSpecs(data, type, ofWhat) 
    } 
    else if (tagsCounter <= 0){ return data }
}

// find the recepies that have the spec requested
function findRecepiesFromSpecs(data, from, search) {
    let res = data.filter(Boolean).map((rece) => {
        const {ingredients, appliance, ustensils} = rece 
        if (from == 'Ingredients' && ingredients.find(o => o.ingredient.toLowerCase().includes(search.toLowerCase()))) {
            return rece
        }  else if (from.toLowerCase() == 'appareils' && appliance == search.toLowerCase()){
            return rece
        } else if (from.toLowerCase() == 'utensiles' && ustensils.includes(search.toLowerCase())){
            return rece
        }
    })
    return res
}

function relevantRecepies(food) {
    let relevant = document.querySelectorAll('article:not(.d-none)')
    let relevantId = Array.from(relevant, x => x.id)
    let lookingFor = relevantId.map((x) => { return food.find(element => element.id == x) })
    return lookingFor
}

function searchWhitTags(foods, action) {
    let listForSearch = document.getElementById('specificSelected')
    let existingTags = listForSearch.children
    for (let i = 0; i < existingTags.length; i++) {
        const e = existingTags[i];
        let background = e.classList.value
        let element = e.innerText
        let mapping = foods.map((food) => {
            const {id, name, time, description, ingredients, appliance, ustensils} = food 
            if (document.getElementById(food.id).classList.contains('d-none') == false) {
                if (background == 'blue--bg' && ingredients.find(o => o.ingredient.toLowerCase().includes(element.toLowerCase()))) {
                    return food
                } else if (background == 'green--bg' && (appliance.toLowerCase() == element.toLowerCase())){
                    return food 
                } else if (background == 'red--bg' && ustensils.includes(element)){
                    return food 
                }
            }
        })
        let data = mapping.filter(Boolean)
        if (action == 'remove') { 
            changeDisplay(data)
            searchWhitTags(foods, 'add')
        } else if (action == 'add'){
            changeDisplay(data)
        }
    }
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
