class IngredientsController < ApplicationController
    def index
        ingredients = Ingredient.all 
        render json: ingredients
    end 
    
    def create 
        ingredient = Ingredient.new(name: params[:name], amount: params[:amount], meal_id: params[:meal_id])
        if ingredient.save 
            render json: ingredient
        else 
            render json: { message: ingredient.errors.full_messages.join(". ") }
        end
    end 

    # def destroy
    #     ingredient = Ingredient.find_by(id: params[:id])
    #     ingredient.destroy
    # end 
end
