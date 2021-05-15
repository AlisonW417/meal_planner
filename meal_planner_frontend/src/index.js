const url = 'http://localhost:3000';
const meals = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is Loaded");

    const newMealForm = document.getElementById("new-meal-form");
    newMealForm.addEventListener('submit', AppAdapter.createNewMeal);

    AppAdapter.getMeals()

    const bfastSelect = document.getElementById("bfast-select");
    bfastSelect.addEventListener('click', renderMealInfo);

    const lunchSelect = document.getElementById("lunch-select");
    lunchSelect.addEventListener('click', renderMealInfo);

    const dinnerSelect = document.getElementById("dinner-select");
    dinnerSelect.addEventListener('click', renderMealInfo);

    const snackSelect = document.getElementById("snack-select");
    snackSelect.addEventListener('click', renderMealInfo);
})

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

// RENDER Meal Plan Menus to DOM
function renderMealPlan(currentMeal, form) {
    let days = [];
    let checkboxes = document.getElementsByClassName('form-check-input');
    for (let i=0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            days.push(checkboxes[i].value);
        }
    }

    days.forEach(day => {
        let dayDiv = document.getElementById(`${day}-menu`);
        let mealDiv = document.getElementById(`${day}-${currentMeal.category.toLowerCase()}`);
        let mealName = document.createElement('p');
        mealName.setAttribute('class', 'card-text');
        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'btn btn-danger btn-sm')
        removeButton.innerText = "x";
        removeButton.addEventListener('click', removeMealFromPlan);
        mealName.innerText = "";
        mealName.innerText = `${currentMeal.name}`;
        mealName.appendChild(removeButton);
        mealDiv.appendChild(mealName);
        form.reset();
        // dayDiv.appendChild(mealDiv);
    })
}

// REMOVE Meal from menu
function removeMealFromPlan(event){
    event.target.parentElement.remove();
}

