# frozen_string_literal: true

# app/models/product.rb
# product model replicating db schema
class Product
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location

  validates :productId, presence: true
  validates :productName, presence: true

  # Class instance variable to simulate a "database"
  @products = []

  # Define class-level methods and variables
  class << self
    # Create getter and setter methods for the class instance variable @products
    attr_accessor :products

    # Initialize with 40 example products
    def initialize_products
      1.upto(40) do |i|
        products << new(
          productId: i,
          productName: "Product #{i}",
          productOwnerName: "Owner #{i}",
          Developers: ["Dev_#{i}_1", "Dev_#{i}_2", "Dev_#{i}_3", "Dev_#{i}_4", "Dev_#{i}_5"],
          scrumMasterName: "ScrumMaster #{i}",
          startDate: Date.today - i.days,
          methodology: "Agile",
          location: "Location #{i}"
        )
      end
    end

    def all
      products
    end

    def find_by_product_id(id)
      products.find { |product| product.product_id == id.to_i }
    end
  end

  # call the method to actual initialize products
  initialize_products
end
