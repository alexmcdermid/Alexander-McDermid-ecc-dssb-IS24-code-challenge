# app/controllers/api/products_controller.rb

module Api
  class ProductController < ApplicationController
    def index
      render json: Product.all
    end

    def show
      product = Product.find_by_product_id(params[:id])
      if product
        render json: product
      else
        render json: { error: 'Product not found' }, status: 404
      end
    end

    private

    def product_params
      params.require(:product).permit(:productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location)
    end
  end
end
