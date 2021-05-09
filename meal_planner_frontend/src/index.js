// const BACKEND_URL = 'http://localhost:3000/';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// const app = new AppContainer
// app.getMeals()
// app.bindEventListeners()
const url = 'http://localhost:3000';
const meals = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is Loaded");

    const newMealForm = document.getElementById("new-meal-form");
    newMealForm.addEventListener('submit', createNewMeal);

    getMeals()

    const selectBtn = document.getElementById("select-meals");
    selectBtn.addEventListener('click', displayMeals);
})

function createNewMeal(event){
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
            ingredient: event.target.ingredient.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
        new Meal(data.name, data.category, data.ingredients)
        meals.push(data)
        renderMeals();
    })
}

function getMeals() {
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

function renderMeals() {
    const bfastSelect = document.getElementById('breakfast');
    const lunchSelect = document.getElementById('lunch');
    const dinnerSelect = document.getElementById('dinner');
    const snackSelect = document.getElementById('snack');
    bfastSelect.innerHTML = "";
    lunchSelect.innerHTML = "";
    dinnerSelect.innerHTML = "";
    snackSelect.innerHTML = "";
    meals.forEach(meal => {
        const mealOption = document.createElement('option');
        mealOption.innerText = meal.name;
        if (meal.category === 'Breakfast') {
            bfastSelect.appendChild(mealOption);
        } else if (meal.category === 'Lunch') {
            lunchSelect.appendChild(mealOption);
        } else if (meal.category === 'Dinner') {
            dinnerSelect.appendChild(mealOption);
        } else {
            snackSelect.appendChild(mealOption);
        }
    })
}

function displayMeals() {
    let selectedMeals = document.querySelectorAll('.selected-meal')
    let mealCalendar = document.getElementById('daily-meals');
    let mealRow = document.createElement('tr');

    selectedMeals.forEach(meal => {
        const currentMeals = document.createElement('td');
        // const deleteBtn = document.createElement('button');
        const selectedMeal = meal.options[meal.selectedIndex].value
        
        currentMeals.innerText = selectedMeal;
        // deleteBtn.innerText = "Delete";
        // deleteBtn.setAttribute('id', 'delete-meal');
        mealRow.appendChild(currentMeals);
        // currentMeals.appendChild(deleteBtn);
        mealCalendar.appendChild(mealRow);
        displayIngredients(selectedMeal);
    })
}

function displayIngredients(selectedMeal) {
    let groceries = document.getElementById('groceries');
    let groceryList = document.createElement('ul');

    meals.forEach(meal => {
        if (meal.name === selectedMeal && meal.ingredients != []) {
            meal.ingredients.forEach(ingredient => {
                const deleteBtn = document.createElement('button');
                const groceryItem = document.createElement('li');
                groceryItem.innerText = `${ingredient.name} - ${ingredient.amount}`
                deleteBtn.innerText = "Delete";
                deleteBtn.setAttribute('data-ingredient-id', ingredient.id)
                deleteBtn.setAttribute('id', 'delete-ingredient');
                
                groceryItem.appendChild(deleteBtn);
                groceryList.appendChild(groceryItem);
                groceries.appendChild(groceryList);

                deleteBtn.addEventListener('click', deleteIngredient);
            })
        }
    })    
}

function deleteIngredient(event) {
    debugger
    event.preventDefault();
    fetch(`${url}/ingredients/${event.target.dataset.ingredientId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    event.target.parentElement.remove();
}
