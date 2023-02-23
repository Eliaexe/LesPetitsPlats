//search based on user input
function search (data) {
    document.getElementById('big-search').addEventListener('input', (event) => { 
        let searchString = event.target.value.toLowerCase().trim()
        let recepiesMapping = data.map((food) => {
            const {id, name, time, description, ingredients, appliance, ustensils} = food 
            if (!(name.toLowerCase().includes(searchString) ||
                description.toLowerCase().includes(searchString) ||
                ingredients.find(o => o.ingredient.toLowerCase().includes(searchString)))){
                    return food                                   
            }                    
        })
        if (searchString.length >= 3) {
            resetRecepies(recepiesMapping)
            displayResoult(recepiesMapping)
        } else if (searchString.length <= 3) {
            resetRecepies(recepiesMapping)
        }
    })
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