module Api
  class ApplicationController < ActionController::API
    def health
      render json: { status: 'OK' }, status: 200
    end
  end
end
