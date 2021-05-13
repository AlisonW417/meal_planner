class FormLoader {
    static loadIngredientForm(currentDiv, selectedMeal) {
        let currentMeal = meals.find(meal => {return meal.name === selectedMeal});
        let ingredientForm = document.createElement('form');
        let formDiv = document.createElement('div');
        let formHead = document.createElement('legend');
        let nameLabel = document.createElement('label');
        let nameInput = document.createElement('input');
        let amtLabel = document.createElement('label');
        let amtInput = document.createElement('input');
        let button = document.createElement('button');
        let hidden = document.createElement('input');
        formDiv.setAttribute('class', 'form-group');
        hidden.setAttribute('type', 'hidden');
        hidden.setAttribute('name', 'meal');
        hidden.setAttribute('value', currentMeal.id);
        button.setAttribute('type', 'submit');
        button.setAttribute('class', 'btn btn-primary');
        button.innerText = "Add";
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('class', 'form-control');
        amtInput.setAttribute('type', 'text');
        amtInput.setAttribute('name', 'amount');
        amtInput.setAttribute('class', 'form-control');
        nameLabel.setAttribute('for', 'name');
        nameLabel.setAttribute('class', 'col-form-label mt-4');
        amtLabel.setAttribute('for', 'amount');
        amtLabel.setAttribute('class', 'col-form-label mt-4')
        nameLabel.innerText = "Name:";
        amtLabel.innerText = "Amount:";
        formHead.innerText = "Add an ingredient";
        ingredientForm.setAttribute('id', 'new-ingredient-form');
        ingredientForm.appendChild(nameLabel);
        ingredientForm.appendChild(nameInput);
        ingredientForm.appendChild(amtLabel);
        ingredientForm.appendChild(amtInput);
        ingredientForm.appendChild(hidden);
        ingredientForm.appendChild(button);
        formDiv.appendChild(formHead);
        formDiv.appendChild(ingredientForm);
        currentDiv.appendChild(formDiv);
        ingredientForm.addEventListener('submit', createNewIngredient);
    }

    static loadMealPlanForm(currentDiv, selectedMeal){
        let currentMeal = meals.find(meal => {return meal.name === selectedMeal});
        let mealPlanForm = document.createElement('form');
        let formDiv = document.createElement('div');
        formDiv.setAttribute('class', 'form-group');
        let formHead = document.createElement('legend');
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
        formDiv.appendChild(formHead);
        formDiv.appendChild(mealPlanForm);
        mealPlanForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let div = event.target.parentElement.id;
            renderMealPlan(currentMeal, mealPlanForm);
        });
        currentDiv.appendChild(formDiv);
    }
}