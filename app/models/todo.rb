class Todo < ApplicationRecord
  belongs_to :user

  before_create :sluggify
  
  def sluggify
    self.slug = task.parameterize
  end
end
