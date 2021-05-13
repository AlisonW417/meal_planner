class MealsController < ApplicationController
    def index 
        meals = Meal.all
        render json: meals, include: [:ingredients]
    end 

    def create 
        meal = Meal.new(name: params[:name], category: params[:category])
        if meal.save
            render json: meal, include: [:ingredients]
        else 
            render json: { message: meal.errors.full_messages[0] }
        end 
    end 
end
