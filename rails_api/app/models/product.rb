# frozen_string_literal: true

# app/models/product.rb
# product model replicating db schema
class Product
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveModel::Serialization

  attribute :product_id, :integer
  attribute :product_name, :string
  attribute :product_owner_name, :string
  attribute :developers, default: []
  attribute :scrum_master_name, :string
  attribute :start_date, :date
  attribute :methodology, :string
  attribute :location, :string

  validates :product_id, presence: true
  validates :product_name, presence: true

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
          product_id: i,
          product_name: "Product #{i}",
          product_owner_name: "Owner #{i}",
          developers: ["Dev_#{i}_1", "Dev_#{i}_2", "Dev_#{i}_3", "Dev_#{i}_4", "Dev_#{i}_5"],
          scrum_master_name: "ScrumMaster #{i}",
          start_date: Date.today - i.days,
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
