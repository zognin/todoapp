class TodoSerializer
  include JSONAPI::Serializer
  attributes :task, :description, :category, :is_completed, :is_priority, :slug, :user_id, :id

  belongs_to :user
end
