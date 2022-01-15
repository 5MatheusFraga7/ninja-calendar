# bundle exec rails g model Room name:string code:string observation:string
class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :code
      t.string :observation

      t.timestamps
    end
  end
end
