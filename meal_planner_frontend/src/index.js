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

    // const selectBtn = document.getElementById("select-meals");
    // selectBtn.addEventListener('click', displayMeals);
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
        new Meal(data.name, data.category, data.ingredients)
        meals.push(data)
        renderMeals();
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
        meal = meals.find(meal => {return meal.id === data.meal_id});
        meal.ingredients.push(data);
        let ingredient = document.createElement('li');
        ingredient.innerText = `${data.name} - ${data.amount}`;
        let list = document.getElementById(`${meal.category.toLowerCase()}-ingredient-list`);
        list.appendChild(ingredient);
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
    loadIngredientForm(mealInfoDiv, selectedMeal);
}

function loadIngredientForm(currentDiv, selectedMeal) {
    currentMeal = meals.find(meal => {return meal.name === selectedMeal});
    let ingredientForm = document.createElement('form');
    let formHead = document.createElement('h5');
    let nameLabel = document.createElement('label');
    let nameInput = document.createElement('input');
    let amtLabel = document.createElement('label');
    let amtInput = document.createElement('input');
    let button = document.createElement('button');
    let hidden = document.createElement('input');
    hidden.setAttribute('type', 'hidden');
    hidden.setAttribute('name', 'meal');
    hidden.setAttribute('value', currentMeal.id);
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'add-ingredient');
    button.innerText = "Add";
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    amtInput.setAttribute('type', 'text');
    amtInput.setAttribute('name', 'amount');
    nameLabel.setAttribute('for', 'name');
    amtLabel.setAttribute('for', 'amount');
    nameLabel.innerText = "Name:";
    amtLabel.innerText = "Amount:";
    formHead.innerText = "Add an ingredient";
    ingredientForm.appendChild(formHead);
    ingredientForm.appendChild(nameLabel);
    ingredientForm.appendChild(nameInput);
    ingredientForm.appendChild(amtLabel);
    ingredientForm.appendChild(amtInput);
    ingredientForm.appendChild(hidden);
    ingredientForm.appendChild(button);
    currentDiv.appendChild(ingredientForm);
    ingredientForm.addEventListener('submit', createNewIngredient);
}