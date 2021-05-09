class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: meals, include: [:ingredients]
    end 

    def create 
        meal = Meal.new(name: params[:name], category: params[:category])
        meal.ingredients.build(params[:ingredients])
        meal.save
        # need to refactor this
        render json: meal, include: [:ingredients]
    end 

end
