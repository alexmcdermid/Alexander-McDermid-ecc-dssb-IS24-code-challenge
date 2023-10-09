# frozen_string_literal: true

# Product Model
# This class serves as a stand-in for a traditional ActiveRecord (ORM) model.
# It validates and manages Product attributes.
class Product
  include ActiveModel::Model
  include ActiveModel::Serialization

  # Attributes
  attr_accessor :productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location

  # Validations
  validates :productId, :productName, :scrumMasterName, :productOwnerName, presence: true
  validate :product_id_must_be_unique, :developers_must_be_array_of_strings_and_not_empty_and_max_five, :start_date_must_be_valid
  validates :methodology, inclusion: { in: ['Agile', 'Waterfall'], message: "can't be blank, select Agile or Waterfall" }

  # Validate startDate in YYYY-MM-DD format
  def start_date_must_be_valid
    begin
      parsed_date = Date.parse(startDate.to_s)
      unless parsed_date.strftime('%Y-%m-%d') == startDate.to_s
        errors.add(:startDate, 'must be in the format YYYY-MM-DD')
      end
    rescue ArgumentError
      errors.add(:startDate, 'must be a valid date in the format YYYY-MM-DD')
    end
  end

  # Validate unique productId
  def product_id_must_be_unique
    existing_product = self.class.find_by_product_id(productId)
    if existing_product && existing_product != self
      errors.add(:productId, 'must be unique')
    end
  end

  # Validate developers attribute
  def developers_must_be_array_of_strings_and_not_empty_and_max_five
    developers = self.Developers || [] # Access as an attribute

    unless developers.is_a?(Array) && developers.all? { |item| item.is_a?(String) }
      errors.add(:Developers, 'must be an array of strings')
    end

    non_empty_developers = developers.reject { |item| item.strip.empty? }

    if non_empty_developers.empty?
      errors.add(:Developers, "at least one developer must be present")
    end

    if non_empty_developers.length > 5
      errors.add(:Developers, "maximum of 5 developers allowed")
    end
  end

  # Initialize default attribute values
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
      methodologies = ['Agile', 'Waterfall']
      1.upto(40) do |i|
        random_methodology = methodologies.sample
        products << new(
          productId: i,
          productName: "Product #{i}",
          productOwnerName: "#{random_name.compose(random_name_syllables)} #{random_name.compose(random_name_syllables)}",
          Developers: Array.new(rand(1..5)) do
            "#{random_name.compose(random_name_syllables)} #{random_name.compose(random_name_syllables)}"
          end,
          scrumMasterName: "#{random_name.compose(random_name_syllables)} #{random_name.compose(random_name_syllables)}",
          startDate: (Date.today - 1.month) + i.days,
          methodology: random_methodology,
          location: "Location#{i}"
        )
      end
    end

    # Return all products
    def all
      products
    end

    # Find a product by its productId
    def find_by_product_id(id)
      products.find { |product| product.productId == id.to_i }
    end
  end

  # call the method to initialize products
  initialize_products

  # Update product attributes
  def update(attributes)
    attributes.each do |key, value|
      next if key == 'productId'  # Skip updating the productId

      send("#{key}=", value) if respond_to?("#{key}=")
    end
  end
end
