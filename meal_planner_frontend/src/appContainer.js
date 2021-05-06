class AppContainer {
    static meals = []
    ingredients = []
    url = "http://localhost:3000"
    dailyMealPlan = {}

    getMeals() {
        fetch(`${this.url}/meals`)
        .then(resp => resp.json())
        .then(data => {
            data.forEach(meal => {
                new Meal(meal.name, meal.category, meal.ingredients);
                
            })
        this.renderMeals();
        })
    }

    renderMeals() {
        const bfastSelect = document.getElementById('breakfast');
        const lunchSelect = document.getElementById('lunch');
        const dinnerSelect = document.getElementById('dinner');
        const snackSelect = document.getElementById('snack');
        AppContainer.meals.forEach(meal => {
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
}