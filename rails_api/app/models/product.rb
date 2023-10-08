# frozen_string_literal: true

# app/models/product.rb
# product model replicating db schema
class Product
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :productId, :productName, :productOwnerName, :Developers, :scrumMasterName, :startDate, :methodology, :location

  validates :productId, presence: true
  validates :productName, presence: true
  validates :scrumMasterName, presence: true
  validates :productOwnerName, presence: true

  # these would usually be done with activerecord (ORM)
  validate :product_id_must_be_unique
  validate :developers_must_be_array_of_strings_and_not_empty
  validate :start_date_must_be_valid
  validates :methodology, inclusion: { in: ['Agile', 'Waterfall'], message: "can't be blank, select Agile or Waterfall" }  

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

  def product_id_must_be_unique
    existing_product = self.class.find_by_product_id(productId)
    if existing_product && existing_product != self
      errors.add(:productId, 'must be unique')
    end
  end

  def developers_must_be_array_of_strings_and_not_empty
    developers = self.Developers || [] # Access as an attribute

    unless developers.is_a?(Array) && developers.all? { |item| item.is_a?(String) }
      errors.add(:Developers, 'must be an array of strings')
    end

    non_empty_developers = developers.reject { |item| item.strip.empty? }

    if non_empty_developers.empty? || non_empty_developers.length < 1
      errors.add(:Developers, "at least one developer must be present")
    end
  end

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
      methodologies = ['Agile', 'Waterfall']
      1.upto(40) do |i|
        random_methodology = methodologies.sample
        products << new(
          productId: i,
          productName: "Product #{i}",
          productOwnerName: random_name.compose(random_name_syllables),
          Developers: [random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables), random_name.compose(random_name_syllables)],
          scrumMasterName: random_name.compose(random_name_syllables),
          startDate: (Date.today - 1.month) + i.days,
          methodology: random_methodology,
          location: "Location#{i}"
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
