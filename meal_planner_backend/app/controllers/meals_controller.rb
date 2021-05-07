class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: meals, include: [:ingredients]
    end 

    def create 
        meal = Meal.new(name: params[:name], category: paramas[:category])
        meal.ingredients.build(params[:ingredients])
        meal.save
        render json: meal
    end 
end
