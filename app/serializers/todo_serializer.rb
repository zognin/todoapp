class TodoSerializer
  include JSONAPI::Serializer
  attributes :task, :description, :category, :start_time, :end_time, :is_completed, :is_priority, :slug, :user_id, :id

  belongs_to :user
end
