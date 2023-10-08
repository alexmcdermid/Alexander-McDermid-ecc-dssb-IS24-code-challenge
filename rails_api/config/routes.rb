# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    get '/health', to: 'application#health'
    resources :product, only: [:index, :show, :create, :update, :destroy]
    mount Rswag::Ui::Engine => '/api-docs'
    mount Rswag::Api::Engine => '/api-docs'
  end
end
