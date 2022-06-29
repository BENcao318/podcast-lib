Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/podcasts', to:"podcasts#index"
      get '/podcasts/:id', to:"podcasts#detail"
      # get '/podcasts/:id/:feed', to:"podcasts#description"
      resources :users, only: [:create, :show, :index]  do 
        resources :items, only: [:create, :show, :index, :destroy]
      end

      post '/login', to: 'sessions#create'
      delete '/logout',   to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'

      post '/subscribe', to: 'subscriptions#create'
      post '/unsubscribe', to: 'subscriptions#destroy'
      get '/subscriptions', to: 'subscriptions#index'

      post '/queue', to: 'episode_queues#create'
      post '/unqueue', to: 'episode_queues#destroy'
      get '/queues', to: 'episode_queues#index'

      post '/search', to: 'searches#create'
    end
  end

  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
