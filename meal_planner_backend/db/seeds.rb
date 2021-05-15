# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Meal.destroy_all
Ingredient.destroy_all

meal1 = Meal.create(name: 'BLT Sandwich', category: 'Lunch', description: 'bacon, lettuce and tomato on bread')
meal2 = Meal.create(name: 'Yogurt Parfait', category: 'Snack', description: 'nonfat yogurt, granola and blueberries')
meal3 = Meal.create(name: 'Egg and Cheese Omelet', category: 'Breakfast', description: 'three eggs and american cheese')
meal4 = Meal.create(name: 'Pasta and Turkey Meatballs', category: 'Dinner', description: 'whole grain penne with turkey meatballs in marinara sauce')
meal5 = Meal.create(name: 'Greek Salad', category: 'Lunch', description: 'mixed greens with cucumber, red onion, olives, tomato, and red pepper')
meal6 = Meal.create(name: 'Strawberry Banana Smoothie', category: 'Snack', description: 'frozen strawberry and banana blended with almond milk')
meal7 = Meal.create(name: 'Avocado Toast with Egg', category: 'Breakfast', description: 'whole grain toast topped with mashed avocado and 2 poached eggs')
meal8 = Meal.create(name: 'Beef Burrito Bowl', category: 'Dinner', description: 'ground beef over rice and assorted veggies')
meal9 = Meal.create(name: 'Overnight Oats', category: 'Breakfast', description: 'rolled oats, almond milk and choice of toppings')

lettuce = Ingredient.create(name: 'iceberg lettuce', amount: '1/15 of head of lettuce', meal_id: meal1.id)
bacon = Ingredient.create(name: 'turkey bacon', amount: '4 slices', meal_id: meal1.id)
tomato = Ingredient.create(name: 'campari tomato', amount: '1 tomato', meal_id: meal1.id)
bread = Ingredient.create(name: 'whole grain bread', amount: '2 slices', meal_id: meal1.id)

yogurt = Ingredient.create(name: 'lowfat vanilla yogurt', amount: '5.3 ounces', meal_id: meal2.id)
granola = Ingredient.create(name: 'granola', amount: '1/4 cup', meal_id: meal2.id)
blueberries = Ingredient.create(name: 'blueberries', amount: '1/4 cup', meal_id: meal2.id)

eggs = Ingredient.create(name: 'large eggs', amount: '3 eggs', meal_id: meal3.id)
american_cheese = Ingredient.create(name: 'american cheese', amount: '2 slices', meal_id: meal3.id)

penne = Ingredient.create(name: 'penne pasta', amount: '6 oz', meal_id: meal4.id)
turkey_meatballs = Ingredient.create(name: 'turkey meatballs', amount: '3', meal_id: meal4.id)
sauce = Ingredient.create(name: 'marinara sauce', amount: '1/3 jar', meal_id: meal4.id)

greens = Ingredient.create(name: 'mixed greens', amount: '5 oz', meal_id: meal5.id)
cucumber = Ingredient.create(name: 'medium cucumber', amount: '1/4 cucumber', meal_id: meal5.id)
red_onion = Ingredient.create(name: 'red onion', amount: '1/4 cup', meal_id: meal5.id)
olives = Ingredient.create(name: 'kalamata olives', amount: '4 olives', meal_id: meal5.id)
tomato = Ingredient.create(name: 'cherry tomatoes', amount: '5 tomatoes', meal_id: meal5.id)
red_pepper = Ingredient.create(name: 'red bell pepper', amount: '1/4 cup', meal_id: meal5.id)

strawberry = Ingredient.create(name: 'frozen strawberries', amount: '1/2 cup', meal_id: meal6.id)
banana = Ingredient.create(name: 'frozen banana', amount: '1 small banana', meal_id: meal6.id)
almond_milk = Ingredient.create(name: 'unsweetened vanilla almond milk', amount: '1 cup', meal_id: meal6.id)

toast = Ingredient.create(name: 'whole grain bread', amount: '1 slice, toasted', meal_id: meal7.id)
avocado = Ingredient.create(name: 'avocado', amount: '1/4 avocado, mashed', meal_id: meal7.id)
poached_eggs = Ingredient.create(name: 'eggs', amount: '2 large eggs, poached', meal_id: meal7.id)

beef = Ingredient.create(name: 'ground beef', amount: '1/4 pound', meal_id: meal8.id)
rice = Ingredient.create(name: 'brown rice', amount: '1/2 cup, cooked', meal_id: meal8.id)
salsa = Ingredient.create(name: 'salsa', amount: '2 tbsp', meal_id: meal8.id)

oats = Ingredient.create(name: 'rolled oats', amount: '1/2 cup', meal_id: meal9.id)
milk = Ingredient.create(name: 'almond milk', amount: '1/2 cup', meal_id: meal9.id)
seeds = Ingredient.create(name: 'chia seeds', amount: '1 tbsp', meal_id: meal9.id)




