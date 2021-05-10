class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: meals, include: [:ingredients]
    end 

    def create 
        # raise params
        meal = Meal.new(name: params[:name], category: params[:category])
        meal.save
        # need to refactor this
        render json: meal
    end 

    def update
        raise params
        meal = Meal.find_by(id: params[:id])
        
    end 

end
