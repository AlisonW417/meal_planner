class AppContainer {
    meals = []
    ingredients = []
    url = "http://localhost:3000"
    dailyMealPlan = {}

    getMeals() {
        fetch(`${this.url}/meals`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    renderMeals() {

    }
}