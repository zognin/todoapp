Rails.application.routes.draw do
  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', 
        controllers: {
          sessions: 'api/v1/devise_token_auth/sessions'
        }
      resources :todos, param: :slug
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
