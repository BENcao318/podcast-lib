class User < ApplicationRecord
  has_secure_password

  before_validation :strip_whitespace, :only => [:email, :username]
  before_validation :lower_case, :only => [:email]

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :password, length: {minimum: 3}
  validates :password_confirmation, presence: true
  # validates :username, length: { minimum: 4 }

  has_many :subscriptions

  private
  def strip_whitespace
    self.username = self.username.strip unless self.username.nil?
    self.email = self.email.strip unless self.email.nil?
  end

  def lower_case
    self.email = self.email.downcase unless self.email.nil?
  end
end
