Rails.application.routes.draw do
  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'
  delete '/logout', to: 'auth#logout'
  get '/me', to: 'auth#me'

  resources :publications do
    member do
      patch :change_status
    end
    collection do
      delete :bulk_delete
      get :public, to: 'publications#public_index'
    end
  end

  # Public show route
  get '/publications/:id/public', to: 'publications#show_public'
end
