class Api::V1::ManagerCalendarController < ApplicationController

    def index
        
        month_starts_at  = Time.now.beginning_of_month;
        month_ends_at    = Time.now.end_of_month;

        meetings = Meeting.where("starts_at BETWEEN :starts_at and :ends_at AND ends_at BETWEEN :starts_at and :ends_at" , { starts_at: month_starts_at, ends_at: month_ends_at })       
        
        render json: { meetings: meetings }, status: 200
        
	end

	def show

	end

	def create 


	end

	def update

	end

	def destroy 

	end

end