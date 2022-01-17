class Meeting < ApplicationRecord
  belongs_to :room

  validates :room_id, :starts_at, :ends_at, presence: true 

end
