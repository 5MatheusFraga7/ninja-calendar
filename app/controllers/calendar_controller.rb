class CalendarController < ApplicationController

    respond_to :html, :json, :xml

    def index

        @date_to_calendar = Time.now

        render 'calendar'
        
    end

    def get_rooms 
        
        render json: { rooms: Room.all }, status: 200 

	end

end
