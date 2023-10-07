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

    def create
      @product = Product.new(product_params)
      @product.productId = @product.productId.to_i # Convert to integer since it is a string (serialized)
      if @product.valid?
        Product.products << @product
        render json: @product, status: :created
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    def update
      @product = Product.find_by_product_id(params[:id])
      if @product && @product.update(product_params)
        render json: @product
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @product = Product.find_by_product_id(params[:id])
      if @product
        Product.products.delete(@product)
        head :no_content
      else
        render json: { error: "Product not found" }, status: :not_found
      end
    end

    private

    def product_params
      params.permit(:id, :productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location)
    end
  end
end
