class IngredientsController < ApplicationController
    def destroy
        ingredient = Ingredient.find_by(id: params[:id])
        ingredient.destroy
    end 
end
