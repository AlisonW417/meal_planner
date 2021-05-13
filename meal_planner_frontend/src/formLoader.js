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
        button.setAttribute('class', 'btn btn-primary');
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
        ingredientForm.setAttribute('id', 'new-ingredient-form');
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

    static loadMealPlanForm(currentDiv, selectedMeal){
        let currentMeal = meals.find(meal => {return meal.name === selectedMeal});
        let mealPlanForm = document.createElement('form');
        let formDiv = document.createElement('div');
        formDiv.setAttribute('class', 'form-check');
        let formHead = document.createElement('h5');
        formHead.innerText = "Select days to add this meal to your Meal Plan";
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        days.forEach(day => {
            let input = document.createElement('input');
            let label = document.createElement('label');
            label.setAttribute('for', `${day.toLowerCase()}`);
            label.setAttribute('class', 'form-check-label');
            label.innerText = `${day}`;
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${day.toLowerCase()}`);
            input.setAttribute('class', 'form-check-input');
            input.setAttribute('value', `${day.toLowerCase()}`);
            mealPlanForm.appendChild(input);
            mealPlanForm.appendChild(label);
        })
        let submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('class', 'btn btn-primary');
        submit.innerText = "Add to meal plan";
        mealPlanForm.appendChild(submit);
        mealPlanForm.appendChild(formDiv);
        mealPlanForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let div = event.target.parentElement.id;
            renderMealPlan(currentMeal, mealPlanForm);
        });
        currentDiv.appendChild(formHead);
        currentDiv.appendChild(mealPlanForm);
    }
}