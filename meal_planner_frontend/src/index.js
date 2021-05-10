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
    bfastSelect.addEventListener('click', displayBreakfast);

    const lunchSelect = document.getElementById("lunch-select");
    lunchSelect.addEventListener('click', displayLunch);

    const dinnerSelect = document.getElementById("dinner-select");
    dinnerSelect.addEventListener('click', displayDinner);

    const snackSelect = document.getElementById("snack-select");
    snackSelect.addEventListener('click', displaySnack);

    // const selectBtn = document.getElementById("select-meals");
    // selectBtn.addEventListener('click', displayMeals);
})

function createNewMeal(event){
    // debugger
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
            // ingredients: {
            //     name: event.target.ingredient1name.value,
            //     amount: event.target.ingredient1amount.value
            // }
            // ingredient: event.target.ingredient.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
        new Meal(data.name, data.category)
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

function displayBreakfast(){
    let breakfastDiv = document.getElementById('breakfast');
    let selectedMeal = document.querySelector('#selected-breakfast')
    let selectedBreakfast = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedBreakfast && meal.ingredients != []) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;
            ingredientList = document.createElement('ul');
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            breakfastDiv.appendChild(mealName);
            breakfastDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(breakfastDiv);
}

function displayLunch(){
    let lunchDiv = document.getElementById('lunch');
    let selectedMeal = document.querySelector('#selected-lunch')
    let selectedLunch = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedLunch && meal.ingredients != []) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;
            ingredientList = document.createElement('ul');
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            lunchDiv.appendChild(mealName);
            lunchDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(lunchDiv);
}

function displayDinner(){
    let dinnerDiv = document.getElementById('dinner');
    let selectedMeal = document.querySelector('#selected-dinner')
    let selectedDinner = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedDinner && meal.ingredients != []) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;
            ingredientList = document.createElement('ul');
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            dinnerDiv.appendChild(mealName);
            dinnerDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(dinnerDiv);
}

function displaySnack(){
    let snackDiv = document.getElementById('snack');
    let selectedMeal = document.querySelector('#selected-snack')
    let selectedSnack = selectedMeal.options[selectedMeal.selectedIndex].value
    meals.forEach(meal => {
        if (meal.name === selectedSnack && meal.ingredients != []) {
            mealName = document.createElement('h4');
            mealName.innerText = `${meal.name}`;
            ingredientList = document.createElement('ul');
            meal.ingredients.forEach(ingredient => {
                mealIngredient = document.createElement('li');
                mealIngredient.innerText = `${ingredient.name} - ${ingredient.amount}`
                ingredientList.appendChild(mealIngredient)
            })
            snackDiv.appendChild(mealName);
            snackDiv.appendChild(ingredientList);
        }
    })
    loadIngredientForm(snackDiv);
}

function loadIngredientForm(currentDiv) {
    let ingredientForm = document.createElement('form');
    let formHead = document.createElement('h5');
    let nameLabel = document.createElement('label');
    let nameInput = document.createElement('input');
    let amtLabel = document.createElement('label');
    let amtInput = document.createElement('input');
    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = "Add";
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    amtInput.setAttribute('type', 'text');
    amtInput.setAttribute('name', 'amount');
    nameLabel.innerText = "Name:";
    amtLabel.innerText = "Amount:";
    formHead.innerText = "Add an ingredient";
    ingredientForm.appendChild(formHead);
    ingredientForm.appendChild(nameLabel);
    ingredientForm.appendChild(nameInput);
    ingredientForm.appendChild(amtLabel);
    ingredientForm.appendChild(amtInput);
    ingredientForm.appendChild(button);
    currentDiv.appendChild(ingredientForm);
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
