# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Room.create!(name: 'Sala 1', code: 'adm_room', observation: 'Sala de reuniões administrativas');
Room.create!(name: 'Sala 2', code: 'executive_room', observation: 'Sala de reuniões Executivas');
Room.create!(name: 'Sala 3', code: 'financial_room', observation: 'Sala de reuniões Financeiras');
Room.create!(name: 'Sala 4', code: 'general_room', observation: 'Sala de reuniões Gerais');
