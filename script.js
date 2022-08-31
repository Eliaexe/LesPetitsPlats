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
        e.addEventListener('click', () => {
            let dropContainer = e.parentElement.parentElement
            let place = dropContainer.children[0].children[0].placeholder
            dropContainer.classList.toggle('disponible')
            if (dropContainer.classList.contains('disponible') == true) {
                dropContainer.children[1].style.display = 'block'
                // randomSelection(food, dropContainer.children[0].children[0].placeholder)         
                sortSpecific(food, place)
            } else if (dropContainer.classList.contains('disponible') == false) {
                dropContainer.children[1].style.display = 'none'                
            }
        })
    }
}

//return the specific item in dropdown list
function sortSpecific(food, place) {
    let relevant = document.querySelectorAll('article:not(.d-none)')
    let relevantId = Array.from(relevant, x => x.id)
    let lookingFor = relevantId.map((x) => { return food.find(element => element.id == x) })
    if (place == 'Ingredients') {
        let ingrObj = Array.from(lookingFor, x => x.ingredients)
        let ingrArr = ingrObj.map((x) => {return Array.from(x, y => y.ingredient)})
        let allIngredient = ingrArr.flatMap(x => x)
        return refreshDropDown([...new Set(allIngredient)], place)       
    } else if (place == 'Appareils') {
        let applianceArr = Array.from(lookingFor, x => x.appliance)
        return refreshDropDown([...new Set(applianceArr)], place)
    } else if (place == 'Utensiles') {
        let utensilesArr = Array.from(lookingFor, x => x.ustensils)
        let allUtensiles = utensilesArr.flatMap(x => x)
        return refreshDropDown([...new Set(allUtensiles)], place)
    }
}

//display the specific item in dropdown list
function refreshDropDown(arr, place) {
    let putHere = document.querySelector(`[placeholder=${place}]`).parentNode.parentNode.children[1]
    putHere.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        putHere.innerHTML += `<li>${e}</li>`
    }
    addAndSearch(putHere, place)
}

//take the dropdown element clicked and copy to the top list for sort
function addAndSearch(place, name) {
    let listToListen = place.children
    let background = place.parentElement.classList[1]
    for (let i = 0; i < listToListen.length; i++) {
        const e = listToListen[i];
        e.addEventListener('click', (event) => {
            if (listForSearch.innerText.includes(e.innerHTML) == false) {
                listForSearch.innerHTML += `<li class="${background}">${e.innerHTML}<img src="./img/remove-icon.png"></img></li>`
                // console.log(name, e.innerHTML);
            }
        })
    }
    menageFilter();
}

//all recepies must be visible
function resetRecepies() {
    for (let index = 0; index < document.getElementsByClassName('post').length; index++) {
        const element = document.getElementsByClassName('post')[index];
        if (element.classList.contains('d-none') == true) {
            element.classList.remove('d-none')
        }
    } 
}

//search based on user input
function search (e) {
    for (let i = 0; i < input.length; i++) {
        const el = input[i];
        el.addEventListener('input', (event) => { 
            let searchString = event.target.value.toLowerCase().trim()
            let recepiesMapping = e.map((food) => {
                const {id, name, time, description, ingredients, appliance, ustensils} = food 
                if (el.placeholder == 'Rechercher un ingredient, une recette, etc...' && !(
                    name.toLowerCase().includes(searchString) ||
                    description.toLowerCase().includes(searchString) ||
                    ingredients.find(o => o.ingredient.toLowerCase().includes(searchString)))){
                        return food                                   
                }                    
            })
            resetRecepies()
            let showThis = recepiesMapping.filter((x) => { return x !== undefined }) 
            for (let i = 0; i < showThis.length; i++) {
                const ele = showThis[i];
                let recepiesDisplaied = document.getElementById(ele.id);
                if (ele.id != undefined && recepiesDisplaied != null) {
                    recepiesDisplaied.classList.add('d-none')                
                }
            }            
        })
    }
}
