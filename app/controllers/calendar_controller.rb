class CalendarController < ApplicationController

    respond_to :html, :json, :xml

    def index

        @date_to_calendar = Time.now

        # Meeting.where(":starts_at BETWEEN starts_at and ends_at or :ends_at BETWEEN starts_at and ends_at" , { starts_at: my_new_room_starts_at, my_new_room_ends_at }).select(”room_id’)

        
        render 'calendar'
    end

end
