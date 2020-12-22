class Todo < ApplicationRecord
  belongs_to :user
  
  def sluggify
    self.slug = task.parameterize
  end
end
