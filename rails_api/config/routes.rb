# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    get '/healthcheck', to: 'application#health'
    resources :products, except: %i[new edit]
  end
end
