class Api::V1::ManagerCalendarController < ApplicationController

	include CalendarHelper 

    def index
        
        month_starts_at  = Time.now.beginning_of_month;
        month_ends_at    = Time.now.end_of_month;

        meetings = Meeting.where("starts_at BETWEEN :starts_at and :ends_at AND ends_at BETWEEN :starts_at and :ends_at" , { starts_at: month_starts_at, ends_at: month_ends_at })       
        
        render json: { meetings: meetings }, status: 200
        
	end

	def show

		if	(params[:id].present? && params[:id].is_a?(Integer)) 

			meet = Meeting.where("id="+params[:id].to_s).first

			if (meet.present?) 

				render json: { meet: meet }, status: 200

			else

				render json: { status: 'meeting_not_found' }, status: 404

			end
			
		else
 
			render json: { error: 'id_not_found' }, status: 400

		end

	end

	def create 

		if (params[:title].present? && params[:room_id].present? && params[:starts_at].present? && params[:ends_at].present?)  
			
			meet = Meeting.new
			
			meet.title   = params[:title]
			meet.room_id = params[:room_id].to_i

			meet.starts_at = Time.parse(params[:starts_at].to_s)
			meet.ends_at   = Time.parse(params[:ends_at].to_s)

			if (period_is_inside_on_busines_hour?(meet.starts_at, meet.ends_at))

				if (have_enough_rooms_for_meeting?(meet.starts_at, meet.ends_at))

					if (meet.save)

						puts meet.inspect

						render json: { meet: meet }, status: 201

					else

						render json: { status: 'saving_error', errors: meet.errors.full_messages }, status: 500

					end	

				else

					render json: { error: 'full_rooms' }, status: 400

				end			

			else

				render json: { error: 'invalid_date' }, status: 400

			end

		else

			render json: { error: 'missing_params' }, status: 400

		end

	end

	def update

	end

	def destroy 

	end

end