class AddTimeToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :start_time, :datetime
    add_column :todos, :end_time, :datetime
  end
end
