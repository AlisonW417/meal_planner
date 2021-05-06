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
yogurt = Ingredient.create(name: 'lowfat vanilla yogurt', amount: '5.3 ounces', meal_id: meal2.id)


