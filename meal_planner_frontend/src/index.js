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
        if (meal.category === "Breakfast") {
            let div = document.getElementById("breakfast-ingredient-list");
            div.appendChild(ingredient);
        } else if (meal.category === "Lunch") {
            let div = document.getElementById("lunch-ingredient-list")
            div.appendChild(ingredient);
        } else if (meal.category === "Dinner") {
            let div = document.getElementById("dinner-ingredient-list")
            div.appendChild(ingredient);
        } else {
            let div = document.getElementById("snack-ingredient-list")
            div.appendChild(ingredient);
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
            ingredientList.setAttribute('class', 'ingredient-list')
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

// RENDER Selected Meal Info to DOM
function displayBreakfast(){
    // debugger
    let breakfastDiv = document.getElementById('breakfast');
    breakfastDiv.innerHTML = "";
    let selectedMeal = document.querySelector('#selected-breakfast')
    let selectedBreakfast = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedBreakfast) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;  
            breakfastDiv.appendChild(mealName); 
        }
        if (meal.name === selectedBreakfast && meal.ingredients !== [] && meal.ingredients !== undefined) {
            ingredientList = document.createElement('ul');
            ingredientList.setAttribute('id', 'breakfast-ingredient-list')
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            breakfastDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(breakfastDiv, selectedBreakfast);
}

function displayLunch(){
    let lunchDiv = document.getElementById('lunch');
    lunchDiv.innerHTML = "";
    let selectedMeal = document.querySelector('#selected-lunch')
    let selectedLunch = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedLunch) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;  
            lunchDiv.appendChild(mealName); 
        }
        if (meal.name === selectedLunch && meal.ingredients !== [] && meal.ingredients !== undefined) {
            ingredientList = document.createElement('ul');
            ingredientList.setAttribute('id', 'lunch-ingredient-list')
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            lunchDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(lunchDiv, selectedLunch);
}

function displayDinner(){
    let dinnerDiv = document.getElementById('dinner');
    dinnerDiv.innerHTML = "";
    let selectedMeal = document.querySelector('#selected-dinner')
    let selectedDinner = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        // debugger
        if (meal.name === selectedDinner) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;  
            dinnerDiv.appendChild(mealName); 
        }
        if (meal.name === selectedDinner && meal.ingredients !== [] && meal.ingredients !== undefined) {
            ingredientList = document.createElement('ul');
            ingredientList.setAttribute('id', 'dinner-ingredient-list')
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            dinnerDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(dinnerDiv, selectedDinner);
}

function displaySnack(){
    let snackDiv = document.getElementById('snack');
    snackDiv.innerHTML = "";
    let selectedMeal = document.querySelector('#selected-snack')
    let selectedSnack = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedSnack) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;  
            snackDiv.appendChild(mealName); 
        }
        if (meal.name === selectedSnack && meal.ingredients !== [] && meal.ingredients !== undefined) {
            ingredientList = document.createElement('ul');
            ingredientList.setAttribute('id', 'snack-ingredient-list')
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            snackDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(snackDiv, selectedSnack);
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

// ORIGINAL !!
// function displayMeals() {
//     let selectedMeals = document.querySelectorAll('.selected-meal')
//     let mealCalendar = document.getElementById('daily-meals');
//     let mealRow = document.createElement('tr');

//     selectedMeals.forEach(meal => {
//         const currentMeals = document.createElement('td');
//         // const deleteBtn = document.createElement('button');
//         const selectedMeal = meal.options[meal.selectedIndex].value
        
//         currentMeals.innerText = selectedMeal;
//         // deleteBtn.innerText = "Delete";
//         // deleteBtn.setAttribute('id', 'delete-meal');
//         mealRow.appendChild(currentMeals);
//         // currentMeals.appendChild(deleteBtn);
//         mealCalendar.appendChild(mealRow);
//         displayIngredients(selectedMeal);
//     })
// }

// function displayIngredients(selectedMeal) {
//     let groceries = document.getElementById('groceries');
//     let groceryList = document.getElementById('grocery-list')

//     meals.forEach(meal => {
//         // debugger
//         if (meal.name === selectedMeal && meal.ingredients != []) {
//             meal.ingredients.forEach(ingredient => {
//                 if (ingredient.name != null) {
//                     const deleteBtn = document.createElement('button');
//                     const groceryItem = document.createElement('li');
//                     groceryItem.innerText = `${ingredient.name} - ${ingredient.amount}`
//                     deleteBtn.innerText = "Delete";
//                     deleteBtn.setAttribute('data-ingredient-id', ingredient.id)
//                     deleteBtn.setAttribute('id', 'delete-ingredient');
//                     groceryItem.appendChild(deleteBtn);
//                     groceryList.appendChild(groceryItem);
//                     deleteBtn.addEventListener('click', deleteIngredient);
//                 }
//             })
//         }
//     }) 
//     groceries.appendChild(groceryList);   
// }

// function deleteIngredient(event) {
//     event.preventDefault();
//     fetch(`${url}/ingredients/${event.target.dataset.ingredientId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//     event.target.parentElement.remove();
// }
// END OF ORIGINAL !!




// function displayMeals() {
//     let selectedMeals = document.querySelectorAll('.selected-meal');

//     selectedMeals.forEach(meal => {
//         // const deleteBtn = document.createElement('button');
//         const selectedMeal = meal.options[meal.selectedIndex].value;
//         displayDetails(selectedMeal);
//     })
// }

// function displayDetails(selectedMeal) {
//     let mealName = document.createElement('p');
//     let breakfast = document.getElementById("selected-breakfast");
//     let lunch = document.getElementById("selected-lunch");
//     let dinner = document.getElementById("selected-dinner");
//     let snack = document.getElementById("selected-snack");
//     meals.forEach(meal => {
//         if (meal.name === selectedMeal && meal.category === "Breakfast") {
//             mealName.innerText = `${meal.name}`;
//             breakfast.appendChild(mealName);
//             displayIngredients(meal);
//         } else if (meal.name === selectedMeal && meal.category === "Lunch") {
//             mealName.innerText = `${meal.name}`
//             lunch.appendChild(mealName);
//             displayIngredients(meal);
//         } else if (meal.name === selectedMeal && meal.category === "Dinner") {
//             mealName.innerText = `${meal.name}`;
//             dinner.appendChild(mealName);
//             displayIngredients(meal);
//         } else {
//             mealName.innerText = `${meal.name}`;
//             snack.appendChild(mealName);
//             displayIngredients(meal);
//         }
//     })
// }

// function displayIngredients(meal) {
//     let breakfast = document.getElementById("selected-breakfast");
//     let lunch = document.getElementById("selected-lunch");
//     let dinner = document.getElementById("selected-dinner");
//     let snack = document.getElementById("selected-snack");
//     meal.ingredients.forEach(ingredient => {
//         listedIngredient = document.createElement('p');
//         listedIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`;
//         if (meal.category === "Breakfast"){
//             breakfast.appendChild(listedIngredient);
//         } else if (meal.category === "Lunch"){
//             lunch.appendChild(listedIngredient);
//         } else if (meal.category === "Dinner") {
//             dinner.appendChild(listedIngredient);
//         } else {
//             snack.appendChild(listedIngredient);
//         }
//     })
// }
