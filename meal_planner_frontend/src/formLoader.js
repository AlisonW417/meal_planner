class FormLoader {
    static loadIngredientForm(currentDiv, selectedMeal) {
        let currentMeal = meals.find(meal => {return meal.name === selectedMeal});
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

    static loadMealPlanForm(currentDiv){
        let mealPlanForm = document.createElement('form');
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        days.forEach(day => {
            let input = document.createElement('input');
            let label = document.createElement('label');
            label.setAttribute('for', `${day.toLowerCase()}`);
            label.innerText = `${day}`;
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${day.toLowerCase()}`);
            input.setAttribute('value', `${day.toLowerCase()}`);
            mealPlanForm.appendChild(label);
            mealPlanForm.appendChild(input);
        })
        let submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('class', 'meal-plan');
        submit.innerText = "Add to meal plan";
        mealPlanForm.appendChild(submit);
        mealPlanForm.addEventListener('submit', renderMealPlan)
        currentDiv.appendChild(mealPlanForm);
    }
}