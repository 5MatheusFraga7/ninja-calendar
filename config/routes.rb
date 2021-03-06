Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'calendar#index'

  get 'get_rooms' => 'calendar#get_rooms'

  namespace :api, defaults: {format: :json}, path: '/api/v1/' do 	
  	namespace :v1, path: '/' do
		  resources :manager_calendar, only: [:index, :show, :create, :update, :destroy]	    
  	end
  end 



end
