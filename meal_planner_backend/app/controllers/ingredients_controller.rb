class IngredientsController < ApplicationController
    def index
        ingredients = Ingredient.all 
        render json: ingredients
    end 
    
    def create 
        ingredient = Ingredient.new(name: params[:name], amount: params[:amount], meal_id: params[:meal_id])
        ingredient.save
        render json: ingredient
    end 

    # def destroy
    #     ingredient = Ingredient.find_by(id: params[:id])
    #     ingredient.destroy
    # end 
end
