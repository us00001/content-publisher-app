class User < ApplicationRecord
  has_secure_password
  has_many :publications, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
end
