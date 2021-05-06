class Meal {
    constructor(name, category, ingredients) {
        this.name = name;
        this.category = category;
        this.ingredients = ingredients;
        AppContainer.meals.push(this);
    }
}