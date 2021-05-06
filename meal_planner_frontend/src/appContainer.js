// class AppContainer {
//     static meals = []
//     ingredients = []
//     url = "http://localhost:3000"
//     static dailyMealPlan = {}

//     bindEventListeners() {
//         const sunBtn = document.getElementById("sunday");
//         sunBtn.addEventListener('click', this.displayDailyMeals);
//     }

    // displayDailyMeals() {
    //     debugger
        // let selectedMeals = [];
        // let bfast = document.getElementById('breakfast');
        // let lunch = document.getElementById('lunch');
        // let dinner = document.getElementById('dinner');
        // let snack = document.getElementById('snack');
        // selectedMeals.push(bfast.options[bfast.selectedIndex].value);
        // new DailyMealPlan(selectedMeals);
        // const mealCalendar = document.getElementById('daily-meals');
        // const mealRow = document.createElement('tr');
        // const sunMeals = document.createElement('td');
        // sunMeals.innerText = AppContainer.dailyMealPlan.meals;
        // mealRow.appendChild(sunMeals);
        // mealCalendar.appendChild(mealRow);
    // }

    // getMeals() {
    //     fetch(`${this.url}/meals`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         data.forEach(meal => {
    //             new Meal(meal.name, meal.category, meal.ingredients);  
    //         })
    //     this.renderMeals();
    //     })
    // }

    // renderMeals() {
    //     const bfastSelect = document.getElementById('breakfast');
    //     const lunchSelect = document.getElementById('lunch');
    //     const dinnerSelect = document.getElementById('dinner');
    //     const snackSelect = document.getElementById('snack');
    //     AppContainer.meals.forEach(meal => {
    //         const mealOption = document.createElement('option');
    //         mealOption.innerText = meal.name;
    //         if (meal.category === 'Breakfast') {
    //             bfastSelect.appendChild(mealOption);
    //         } else if (meal.category === 'Lunch') {
    //             lunchSelect.appendChild(mealOption);
    //         } else if (meal.category === 'Dinner') {
    //             dinnerSelect.appendChild(mealOption);
    //         } else {
    //             snackSelect.appendChild(mealOption);
    //         }
    //     })
    // }


// }