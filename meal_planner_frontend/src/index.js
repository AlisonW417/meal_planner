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

    const sunBtn = document.getElementById("sunday");
    sunBtn.addEventListener('click', displayMeals);
})

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
    let bfast = document.getElementById('breakfast');
    // let bfast = document.getElementById('breakfast');
    // let bfast = document.getElementById('breakfast');
    // let bfast = document.getElementById('breakfast');
    // let bfast = document.getElementById('breakfast');
    const mealCalendar = document.getElementById('daily-meals');
    const mealRow = document.createElement('tr');
    const sunMeals = document.createElement('td');
    sunMeals.innerText = `${bfast.options[bfast.selectedIndex].value}`;
    mealRow.appendChild(sunMeals);
    mealCalendar.appendChild(mealRow);
}

// get elements by class in order to append all meal items at once
// remove appContainer and dailyMealPlan classes?