# bundle exec rails g model Meeting room:references user:references title:string description:string starts_at:datetime ends_at:datetime
class CreateMeetings < ActiveRecord::Migration[5.0]
  def change
    create_table :meetings do |t|
      t.references :room
      t.references :user
      t.string :title
      t.string :description
      t.datetime :starts_at
      t.datetime :ends_at

      t.timestamps
    end
  end
end
