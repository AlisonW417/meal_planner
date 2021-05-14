class AppAdapter {

    // READ MEALS
    static getMeals() {
        fetch(`${url}/meals`)
        .then(resp => resp.json())
        .then(data => {
            data.forEach(meal => {
                new Meal(meal.name, meal.category, meal.ingredients);
                meals.push(meal);  
            })
        renderMeals();
        })
    }

    // CREATE MEAL
    static createNewMeal(event){
        event.preventDefault();
        fetch(`${url}/meals`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                category: event.target.category.value,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                alert(data.message)
            } else {
                new Meal(data.name, data.category, data.ingredients);
                meals.push(data);
                let form = document.getElementById('new-meal-form');
                form.reset();
                renderMeals();
            }
        })
    }

    // CREATE INGREDIENT
    static createNewIngredient(event) {
        event.preventDefault();
        fetch(`${url}/ingredients`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                amount: event.target.amount.value,
                meal_id: event.target.meal.value
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                alert(data.message)
            } else {
                let meal = meals.find(meal => {return meal.id === data.meal_id});
                meal.ingredients.push(data);
                let ingredient = document.createElement('li');
                ingredient.innerText = `${data.name} - ${data.amount}`;
                let list = document.getElementById(`${meal.category.toLowerCase()}-ingredient-list`);
                list.appendChild(ingredient);
                let form = document.getElementById('new-ingredient-form');
                form.reset();
            }
        })
    }
}