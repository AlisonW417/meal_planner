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
    getMeals()

    const selectBtn = document.getElementById("select-meals");
    selectBtn.addEventListener('click', displayMeals);

    const newMealForm = document.getElementById("new-meal-form");
    newMealForm.addEventListener('submit', createNewMeal);
})

function createNewMeal(event){
    debugger
    event.preventDefault

}

function getMeals() {
    fetch(`${url}/meals`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(meal => {
            new Meal(meal.name, meal.category, meal.ingredients);
            meals.push(meal);  
        })
    this.renderMeals();
    })
}

function renderMeals() {
    const bfastSelect = document.getElementById('breakfast');
    const lunchSelect = document.getElementById('lunch');
    const dinnerSelect = document.getElementById('dinner');
    const snackSelect = document.getElementById('snack');
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
    // let bfast = document.getElementById('breakfast');
    let selectedMeals = document.querySelectorAll('.selected-meal')
    let mealCalendar = document.getElementById('daily-meals');
    let mealRow = document.createElement('tr');

    selectedMeals.forEach(meal => {
        const currentMeals = document.createElement('td');
        const selectedMeal = meal.options[meal.selectedIndex].value
        currentMeals.innerText = selectedMeal;
        mealRow.appendChild(currentMeals);
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
                const groceryItem = document.createElement('li');
                // debugger
                groceryItem.innerText = `${ingredient.name} - ${ingredient.amount}`
                groceryList.appendChild(groceryItem);
                groceries.appendChild(groceryList);
            })
        }
    })    
}

