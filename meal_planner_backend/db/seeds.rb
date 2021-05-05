# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Meal.destroy_all
Ingredient.destroy_all

meal1 = Meal.create(name: 'BLT Sandwich', category: 'Main', description: 'bacon, lettuce and tomato on bread')
meal2 = Meal.create(name: 'Yogurt Parfait', category: 'Snack', description: 'nonfat yogurt, granola and blueberries')
meal3 = Meal.create(name: 'Egg and Cheese Omelet', category: 'Breakfast', description: 'three eggs and american cheese')

lettuce = Ingredient.create(name: 'iceberg lettuce', amount: '1/15 of head of lettuce', meal_id: meal1.id)
bacon = Ingredient.create(name: 'turkey bacon', amount: '4 slices', meal_id: meal1.id)
tomato = Ingredient.create(name: 'campari tomato', amount: '1 tomato', meal_id: meal1.id)


