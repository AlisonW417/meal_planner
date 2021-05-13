class Meal < ApplicationRecord
    has_many :ingredients
    validates :name, presence: true
    validates :category, presence: true
end
