# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create!([
    {
        email: 'user1@example.com',
        password: 'password1',
        password_confirmation: 'password1'
    },
    {
        email: 'user2@example.com',
        password: 'password2',
        password_confirmation: 'password2'
    },
    {
        email: 'user3@example.com',
        password: 'password3',
        password_confirmation: 'password3'
    }
])


todos = Todo.create!([
    {
        task: 'Make breakfast',
        description: 'Ham and eggs',
        category: 'Home',
        is_completed: false,
        is_priority: true,
        user_id: 1,
    },
    {
        task: 'Do homework',
        description: 'Math Assignment 2',
        category: 'School',
        is_completed: false,
        is_priority: true,
        user_id: 1,
    },
    {
        task: 'Decorate room',
        description: 'Christmas',
        category: 'Home',
        is_completed: false,
        is_priority: false,
        user_id: 1,
    },
    {
        task: 'Finish report',
        description: 'Finish the conclusion',
        category: 'School',
        is_completed: false,
        is_priority: false,
        user_id: 1,
    },
    {
        task: 'Make dinner',
        description: 'Porridge',
        category: 'Home',
        is_completed: false,
        is_priority: true,
        user_id: 2,
    },
    {
        task: 'Make robot',
        description: 'Computing assignment',
        category: 'School',
        is_completed: false,
        is_priority: true,
        user_id: 2,
    },
    {
        task: 'Bake cake',
        description: 'Christmas',
        category: 'Home',
        is_completed: false,
        is_priority: false,
        user_id: 3,
    },
    {
        task: 'Do Chinese homework',
        description: 'Finish the conclusion',
        category: 'School',
        is_completed: false,
        is_priority: false,
        user_id: 3,
    },
])

