Rails.application.routes.draw do
  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', 
        controllers: {
          sessions: 'api/v1/devise_token_auth/sessions',
          registrations: 'api/v1/devise_token_auth/registrations',
          passwords: 'api/v1/devise_token_auth/passwords'
        }
      resources :todos, param: :id
      post '/todos/destroy_multiple' => 'todos#destroy_multiple'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
