class User < ApplicationRecord
  has_secure_password

  before_validation :strip_whitespace, :only => [:email, :username]
  before_validation :lower_case, :only => [:email]

  validates :username, presence: true
  validates :username, uniqueness: true
  # validates :username, length: { minimum: 4 }


  private
  def strip_whitespace
    self.username = self.username.strip unless self.username.nil?
    self.email = self.email.strip unless self.email.nil?
  end

  def lower_case
    self.email = self.email.downcase unless self.email.nil?
  end
end
