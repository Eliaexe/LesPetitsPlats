//eventListener for big search
function search(data) {
    document.getElementById('big-search').addEventListener('input', (event) => { 
        let processedData = processingData(data)
        let searchString = event.target.value.toLowerCase().trim()      
        let recepiesMapping = bigSearch(processedData, searchString)
        if (searchString.length >= 3) {
            changeDisplay(recepiesMapping)
        } else if (searchString.length < 3) {
            changeDisplay(processedData)
        }
    })
}

//actual algo for sorting stuff BUT WHIT LOOPS
function bigSearch(data, str) {
    const processedData = processingData(data);
    const printThis = [];
  
    for (let i = 0; i < processedData.length; i++) {
      const { name, description, ingredients } = processedData[i];
      if (
        name.toLowerCase().includes(str) ||
        description.toLowerCase().includes(str) ||
        ingredients.find(
          (ingredient) => ingredient.ingredient.toLowerCase().includes(str)
        )
      ) {
        printThis.push({ ...processedData[i] });
      }
    }
  
    return printThis;
}

//prepare data whit the tags sorting
function processingData(data) {
    const tags = document.getElementById("specificSelected");
    const tagsCounter = tags.children.length;
    if (tagsCounter > 0) {
      const type = tags.lastChild.getAttribute("data-type");
      const ofWhat = tags.lastChild.innerText;
      return findRecepiesFromSpecs(data, type, ofWhat);
    } else {
      return data;
    }
}

// find the recepies that have the spec requested
function findRecepiesFromSpecs(data, from, search) {
    return data.filter(rece => {
      const { ingredients, appliance, ustensils } = rece;
      switch (from.toLowerCase()) {
        case 'ingredients':
          return ingredients.some(o => o.ingredient.toLowerCase().includes(search.toLowerCase()));
        case 'appareils':
          return appliance.toLowerCase() === search.toLowerCase();
        case 'utensiles':
          return ustensils.some(u => u.toLowerCase() === search.toLowerCase());
        default:
          return false;
      }
    });
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
            search(data)
            changeDisplay(data)
            searchWhitTags(foods, 'add')
        } else if (action == 'add'){
            changeDisplay(data)
            search(data)
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
