class Api::V1::TodosController < ApplicationController
    before_action :authenticate_api_v1_user!

    def index
        todos = Todo.where(:user_id => current_api_v1_user.id)

        render json: TodoSerializer.new(todos).serializable_hash.to_json
    end

    def show
        todo = Todo.find_by(slug: params[:slug])

        render json: TodoSerializer.new(todo).serializable_hash.to_json
    end

    def create
        todo = current_api_v1_user.todos.build(todo_params)

        if todo.save
            render json: TodoSerializer.new(todo).serializable_hash.to_json
        else
            render json: { error:todo.errors.messages }
        end
    end

    def update
        todo = Todo.find_by(slug: params[:slug])

        if todo.update(todo_params)
            render json: TodoSerializer.new(todo).serializable_hash.to_json
        else
            render json: { error:todo.errors.messages }
        end
    end

    def destroy
        todo = Todo.find_by(id: params[:id])

        if todo.destroy
            head :no_content
        else
            render json: { error:todo.errors.messages }
        end
    end

    private

    def todo_params
        params.require(:todo).permit(:task, :description, :category, :is_completed, :is_priority, :user_id)
    end
end