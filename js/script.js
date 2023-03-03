// fetch
const loadfoods = async () => {
    try {
        const res = await fetch('recipes.json');
        let data = await res.json();
        let food = data.recipes;
        showRecipes(food)
        search(food)      
        dropDown(food)
    } catch (err) {
        console.error(err);
    }
};

loadfoods()