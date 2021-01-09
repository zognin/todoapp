class Todo < ApplicationRecord
  belongs_to :user

  before_create :sluggify
  after_initialize :set_defaults
  
  def sluggify
    self.slug = task.parameterize
  end

  def set_defaults
    self.start_time ||= Time.now
    self.end_time ||= Time.now
  end
end
