class TodoSerializer
  include JSONAPI::Serializer
  attributes :task, :description, :category, :is_completed, :is_priority, :slug, :user_id

  belongs_to :user
end
