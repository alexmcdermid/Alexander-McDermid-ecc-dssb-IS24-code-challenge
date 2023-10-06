# frozen_string_literal: true

# app/models/product.rb
# product model replicating db schema
class Product
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveModel::Serialization

  attribute :product_id, :string
  attribute :product_name, :string
  attribute :product_owner_name, :string
  attribute :developers, :string_array, default: []
  attribute :scrum_master_name, :string
  attribute :start_date, :date
  attribute :methodology, :string
  attribute :location, :string

  validates :product_id, presence: true
  validates :product_name, presence: true
end
