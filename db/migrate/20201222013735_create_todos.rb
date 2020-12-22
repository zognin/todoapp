class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :task
      t.string :description
      t.string :category
      t.boolean :is_completed
      t.boolean :is_priority
      t.string :slug
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
