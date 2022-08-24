let cardContainer = document.getElementById('cardContainer');

// fetch
const loadfoods = async () => {
  try {
      const res = await fetch('recipes.json');
      let data = await res.json();
      let food = data.recipes;
      //console.log(food); 
      showRecipes(food)
      search(food)
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

//clean the card container
function cleanRecepies() {
    cardContainer.innerHTML = ``
}

//display all the card disponible
function displayCard(obj) {
  let cardContainer = document.getElementById('cardContainer');
  let card = `
  <div class="post ${obj.id}">
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
              <ul class="ul_post" id="${obj.id}">

              </ul>
              <p class="description">${obj.description}</p>
          </div>
      </div>
  </div>
  `
  cardContainer.innerHTML += card
  //display single ingredients in his card
  let ingredients = obj.ingredients
  for (let i = 0; i < ingredients.length; i++) {
    const ele = ingredients[i];
    document.getElementById(obj.id).innerHTML += `<li>${ele.ingredient}: ${ele.quantity} ${ele.unit}</li>`
  }
}



function displayResoults(e, place, names) {

    let toListPosition = document.querySelectorAll(`[placeholder=${place}]`)[0].parentNode.parentNode; //.children
    let list = toListPosition.childNodes[3];
    let parentList = list.parentNode.classList;
    let allIcons = document.querySelectorAll("[alt='x-icon']")
    // let disponible = document.getElementsByClassName('disponible')
console.log(e);
    for (let i = 0; i < names.length; i++) {
        const e = names[i];
        // console.log(list.childNodes);
        if (list.innerHTML.includes(e) == false && list.childNodes.length < 30) {
            list.innerHTML += `<li>${e}</li>`
        }
        console.log();
    }

    for (let i = 0; i < list.childNodes.length; i++) {
        const singleResoult = list.childNodes[i];
        let icon = `<img src="/img/remove-icon.png" alt="x-icon">`
        
        
        // click on the list item
        singleResoult.addEventListener('click', () => {
            let selectedListed = document.getElementById('specificSelected')
            if (selectedListed.innerHTML.toLowerCase().includes(singleResoult) == false) {
                // give the bg color
                for (let i = 0; i < parentList.length; i++) {
                    const e = parentList[i];
                    if (e.includes('blue')) {
                        singleResoult.classList.add('blue--bg')
                    } else if (e.includes('green')){
                        singleResoult.classList.add('green--bg')
                    } else if (e.includes('red')){
                        singleResoult.classList.add('red--bg')
                    }
                }
                let clone = singleResoult.cloneNode(true)
                // transfer item to top
                selectedListed.appendChild(clone)  
                clone.innerHTML += icon
                //close item to top
                clone.childNodes[1].addEventListener('click', () => {
                    clone.remove()
                })
            }
        })
               
    } 
}

function dropDown(food){
    let dropIcon = document.querySelectorAll('span')
    for (let i = 0; i < dropIcon.length; i++) {
        const e = dropIcon[i];
        e.addEventListener('click', () => {
            let dropContainer = e.parentElement.parentElement
            dropContainer.classList.toggle('disponible')
            if (dropContainer.classList.contains('disponible') == true) {
                dropContainer.children[1].style.display = 'block'
                randomSelection(food, dropContainer.children[0].children[0].placeholder.toLowerCase())         
            } else if (dropContainer.classList.contains('disponible') == false) {
                dropContainer.children[1].style.display = 'none'                
            }
        })
    }
}

//take all the data in base of the user selection and store those in new set array
function randomSelection(foods, type) {
    let showIngredient = []
    let showAppareils = []
    let showUtensils = []

    foods.map((food) => {
        const {id, name, time, description, ingredients, appliance, ustensils} = food
        let ingredient = ingredients.map((x) => {
            return x.ingredient
        })
        if (document.getElementsByClassName(id).length == 1) {
            for (let i = 0; i < ingredient.length; i++) {
                const e = ingredient[i];
                showIngredient.push(e)
            }
            showAppareils.push(appliance)
            for (let i = 0; i < ustensils.length; i++) {
                const e = ustensils[i];
                showUtensils.push(e)    
            }
                
        }
    })
    
    if (type == 'ingredients') {
        console.log([...new Set(showIngredient)]);
    } else if (type == 'appareils') {
        console.log([...new Set(showAppareils)])
    } else if (type == 'utensiles') {
        console.log([...new Set(showUtensils)])
    }
}

function search (e) {
  e.map((food) => {
    const {id, name, time, description, ingredients, appliance, ustensils} = food
    let ingredient = ingredients.map((x) => {
        return x.ingredient
    })
    //console.log(id);
    let input = document.getElementsByClassName('input');
    //console.log(input);
        for (let i = 0; i < input.length; i++) {
            const el = input[i];
            el.addEventListener('keyup', () => {
                //console.log(el.value, el.placeholder);
                let searchString = el.value.toLowerCase().trim()
                //console.log(searchString);
                if (el.value.length >= 3) {
                    if (el.placeholder == 'Ingredients' && 
                        ingredient.join(',').toLowerCase().includes(searchString)) {
                        displayResoults(food, el.placeholder, ingredient)

                    } else if (el.placeholder == 'Appareils' && appliance.toLowerCase().includes(searchString)) {
                        displayResoults(food, el.placeholder, appliance);
                    } else if (el.placeholder == 'Utensiles' && ustensils.join(',').toLowerCase().includes(searchString)) {
                        displayResoults(food, el.placeholder, ustensils);

                    } else if (el.placeholder == 'Rechercher un ingredient, une recette, etc...' && (
                                food.name.toLowerCase().includes(searchString) ||
                                food.description.toLowerCase().includes(searchString) ||
                                ingredients.find(o => o.ingredient.toLowerCase().includes(searchString)))){
                        displayResoults(food);
                    }
                } else {
                    console.log('nope');
                }
            })
        }    
    })
}