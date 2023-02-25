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
            let place = icon.parentElement.parentElement.children[0].children[0].placeholder
            icon.click()
            icon.click()
            let allSpecific = Array.from(dropResoult.childNodes, x => x.innerText.toLowerCase())
            let container = e.parentElement.parentElement
            let detailDisplayer = writeDrop.parentNode.parentNode
            container.classList.add('wrt')
            displayRes.style.display = 'block'
            displayRes.classList.add('dropDownClickable')
            let singleFind = allSpecific.find(o => o.toLowerCase().includes(userSearch))
            if (singleFind != undefined) {
                displayRes.innerHTML = `${singleFind}`
            }

            if (userSearch.length == 0 || container.classList.contains('disponible')) {
                container.classList.remove('wrt')
                displayRes.style.display = 'none'
            }

            if (detailDisplayer.classList.contains('disponible')) {
                refreshDropDown(allSpecific.filter(e => e.includes(userSearch)), place, food)
            }
        })
    }
}

//display the specific item in dropdown list
function refreshDropDown(arr, place, food) {
    let putHere = document.querySelector(`[placeholder=${place}]`).parentNode.parentNode.children[1]
    putHere.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        putHere.innerHTML += `<li class="dropDownClickable">${e}</li>`
    }
    addAndSearch(putHere, food, place)
}

//find the dropdown name
function findTheDrop(background) {
    let input = document.getElementsByClassName('input');
    for (let i = 0; i < input.length; i++) {
        const e = input[i];
        if (e.classList.contains(background)) {
            return e.placeholder
        }
    }
}

function dropDownRefresced(food) {
    data = food.filter(Boolean)
    let filterInput = document.getElementsByClassName('filter--search')
    for (let i = 0; i < filterInput.length; i++) {
        const element = filterInput[i].placeholder;
        sortSpecific(data, element)
    }
}

//take the dropdown element clicked and copy to the top list for sort
function addAndSearch(place, food, type) {
    let listToListen = document.querySelectorAll('.dropDownClickable')
    let background = place.parentElement.classList[1]
    let listForSearch = document.getElementById('specificSelected')
    for (let i = 0; i < listToListen.length; i++) {
        const e = listToListen[i];
        e.addEventListener('click', (event) => {
            if (listForSearch.innerText.includes(e.innerHTML) == false) {
                listForSearch.innerHTML += `<li class="${background}" data-type="${type}">${e.innerHTML}<img src="./img/remove-icon.png"></img></li>`
                menageFilter(food);
            }
        })
    }
}
