Rails.application.routes.draw do
  resources :ingredients, only: [:index, :create]
  resources :meals, only: [:index, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
