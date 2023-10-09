# frozen_string_literal: true

module Api
  # ApplicationController Class
  # Serves as the base controller for all API controllers.
  class ApplicationController < ActionController::API
    # Health Check Endpoint: Provides a basic health check for the API.
    # GET /api/health
    def health
      render json: { status: 'OK' }, status: 200
    end
  end
end
