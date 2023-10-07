# frozen_string_literal: true

# app/models/product.rb
# product model replicating db schema
class Product
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location

  validates :productId, presence: true
  validate :product_id_must_be_unique # this would usually be done with activerecord (ORM)

  def product_id_must_be_unique
    existing_product = self.class.find_by_product_id(productId)
    if existing_product && existing_product != self
      errors.add(:productId, 'must be unique')
    end
  end

  validates :productName, presence: true

  # add initializer so we don't have nil issues in frontend
  def initialize(attributes = {})
    super
    @productId ||= nil
    @productName ||= nil
    @productOwnerName ||= nil
    @Developers ||= []
    @scrumMasterName ||= nil
    @startDate ||= nil
    @methodology ||= nil
    @location ||= nil
  end

  # Class instance variable to simulate a "database"
  @products = []

  # Define class-level methods and variables
  class << self
    # Create getter and setter methods for the class instance variable @products
    attr_accessor :products

    # Initialize with 40 example products
    def initialize_products
      random_name = RandomNameGenerator.new
      random_name_syllables = 3
      1.upto(40) do |i|
        products << new(
          productId: i,
          productName: "Product #{i}",
          productOwnerName: random_name.compose(random_name_syllables),
          Developers: [random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables)],
          scrumMasterName: random_name.compose(random_name_syllables),
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
      products.find { |product| product.productId == id.to_i }
    end
  end

  # call the method to actual initialize products
  initialize_products

  def update(attributes)
    attributes.each do |key, value|
      send("#{key}=", value) if respond_to?("#{key}=")
    end
  end
end
