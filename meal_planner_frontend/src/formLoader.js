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
}