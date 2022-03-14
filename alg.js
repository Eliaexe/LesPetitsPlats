const foodsList = document.getElementById('main');
const searchBar = document.getElementById('search');

const searchBlue = document.getElementById('blue');
const searchGreen = document.getElementById('green');
const searchRed = document.getElementById('red');

const blueList = document.getElementById('blueRow');

let data = [];




searchBlue.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    let allingredients = [];

    const food = data.filter((food) => {
        const ingredientsList = food.ingredients.map(e => e.ingredient);

        ingredientsList.forEach(e => {
            allingredients.push(e.toLowerCase());
        });

        return (          
            allingredients.includes(searchString)
        );
    });
    console.log(allingredients);

    console.log();
    displayfoods(food);
})


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const food = data.filter((food) => {
        return (
            food.name.toLowerCase().includes(searchString)
        );
    });
    displayfoods(food);
});



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
        const ing = food.ingredients;

        let x = foods.map(e => e.ingredients)
        let y = []
        let z = []

            for (let u = 0; u < x.length; u++) {
                const el = x[u];
                y.push(el)
            }

            y.forEach(ele => {
                for (let i = 0; i < ele.length; i++) {
                    const elem = ele[i];
                    
                    z.push(elem)
                }
            });

let ingredienti = x[2].map(e => e.ingredient)
//console.log(y);


            return `

    <div class="post">
        <div class="top_post"></div>
        <div class="pad">
            <div class="middle_post">
                <div class="post_title">${food.name}</div>
                <div class="post_time">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>
                    <p class="post_number">${food.time}</p>
                </div>
            </div>
            <div class="bottom_post">
                <ul class="ul_post">
                ${food.id}

                ${food.ingredients}
                ${ing.quantity}
                ${ing.unit}


                    <li><h2>Glaçons:</h2> <p>2</p></li>
                </ul>
                <p class="description">${food.description}</p>
            </div>
        </div>
    </div>

        `;
        })
        .join('');
    foodsList.innerHTML = htmlString;
};

const displaysingle = (single) => {
    //console.log(single.ingredients);

    const html = single
        .map((single) => {

            return `
            <p>${single.ingredients}</p>
        `;
        })
        .join('');
    blueList.innerHTML = html;
}


loadfoods();
