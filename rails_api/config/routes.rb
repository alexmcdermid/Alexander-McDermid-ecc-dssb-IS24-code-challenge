# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    get '/healthcheck', to: 'application#health'
    resources :product, only: [:index, :show, :create, :update, :destroy]
  end
end
