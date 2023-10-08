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
      max_id = Product.products.map(&:productId).max || 0
      @product.productId = max_id + 1
      if @product.valid?
        Product.products << @product
        render json: @product, status: :created
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    def update
      @product = Product.find_by_product_id(params[:id])
      if @product.present?
        @product.update(product_params)
        if @product.valid?
          render json: @product
        else
          render json: @product.errors, status: :unprocessable_entity
        end
      else
        render json: { error: "Product not found" }, status: :not_found
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
      params.permit(:id, :productId, :productName, :productOwnerName, :scrumMasterName, :startDate, :methodology, :location, Developers: [])
    end
  end
end
