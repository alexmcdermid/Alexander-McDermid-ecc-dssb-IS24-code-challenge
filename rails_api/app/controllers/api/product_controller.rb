# frozen_string_literal: true

module Api
  # ProductsController manages CRUD operations for Product resources.
  class ProductController < ApplicationController
    # Lists all Products
    # GET /api/product
    def index
      render json: Product.all
    end

    # Retrieves a single Product by its ID
    # GET /api/product/:id
    def show
      product = Product.find_by_product_id(params[:id])
      if product
        render json: product
      else
        render json: { error: 'Product not found' }, status: 404
      end
    end

    # Creates a new Product
    # POST /api/product
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

    # Updates an existing Product
    # PUT /api/product/:id
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

    # Deletes a Product
    # DELETE /api/product/:id
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

    # Strong params for Product resource.
    def product_params
      params.permit(:id, :productId, :productName, :productOwnerName, :scrumMasterName, :startDate, :methodology, :location, Developers: [])
    end
  end
end
