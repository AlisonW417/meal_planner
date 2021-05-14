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

    const bfastSelect = document.getElementById("bfast-select");
    bfastSelect.addEventListener('click', renderMealInfo);

    const lunchSelect = document.getElementById("lunch-select");
    lunchSelect.addEventListener('click', renderMealInfo);

    const dinnerSelect = document.getElementById("dinner-select");
    dinnerSelect.addEventListener('click', renderMealInfo);

    const snackSelect = document.getElementById("snack-select");
    snackSelect.addEventListener('click', renderMealInfo);
})

// READ MEALS
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

// CREATE MEAL
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

// CREATE INGREDIENT AND RENDER TO DOM
function createNewIngredient(event) {
    // debugger
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
            meal = meals.find(meal => {return meal.id === data.meal_id});
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

// RENDER MEALS TO DOM
function renderMeals() {
    const bfastSelect = document.getElementById('selected-breakfast');
    const lunchSelect = document.getElementById('selected-lunch');
    const dinnerSelect = document.getElementById('selected-dinner');
    const snackSelect = document.getElementById('selected-snack');
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

// RENDER Selected Meal Info to DOM
function renderMealInfo(event){
    // debugger
    // let mealSelectDiv = document.getElementById("meal-selectors");
    let parentDiv = document.getElementById(event.target.parentElement.id);
    let mealInfoDiv = event.target.nextElementSibling;
    mealInfoDiv.innerHTML = "";
    let selectedMeal = event.target.previousElementSibling.value;
    meals.forEach(meal => {
        if (meal.name === selectedMeal) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;
            mealInfoDiv.appendChild(mealName);
        }
        if (meal.name === selectedMeal && meal.ingredients !== [] && meal.ingredients !== undefined) {
            ingredientList = document.createElement('ul');
            ingredientList.setAttribute('id', `${meal.category.toLowerCase()}-ingredient-list`)
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            mealInfoDiv.appendChild(ingredientList);
            parentDiv.appendChild(mealInfoDiv);
        }
    })
    FormLoader.loadIngredientForm(mealInfoDiv, selectedMeal);
    FormLoader.loadMealPlanForm(mealInfoDiv, selectedMeal);
}

function renderMealPlan(currentMeal, form) {
    // debugger
    // create a variable and set it equal to an empty array
    let days = [];
    // select the checkbox elements using their class name attribute
    let checkboxes = document.getElementsByClassName('form-check-input');
    // iterate through the form checkboxes to determine which days are checked
    // add each checked value (day) to the days array
    for (let i=0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            days.push(checkboxes[i].value);
        }
    }

    days.forEach(day => {
        let dayDiv = document.getElementById(`${day}-menu`);
        // use interpolation to select the current meal's div by category
        let mealDiv = document.getElementById(`${day}-${currentMeal.category.toLowerCase()}`);
        // create elements to display the meal's name and to remove the meal, if needed
        let mealName = document.createElement('p');
        mealName.setAttribute('class', 'card-text');
        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'btn btn-danger btn-sm')
        removeButton.innerText = "x";
        // add an event listener for the option to remove the meal from the menu
        removeButton.addEventListener('click', removeMealFromPlan);
        // reset the name to prevent duplicates during selection
        mealName.innerText = "";
        // add the current meal's name and the remove button to the selected div
        mealName.innerText = `${currentMeal.name}`;
        mealName.appendChild(removeButton);
        mealDiv.appendChild(mealName);
        
        // reset the form
        form.reset();
        // dayDiv.appendChild(mealDiv);
    })
}

function removeMealFromPlan(event){
    event.target.parentElement.remove();
}

