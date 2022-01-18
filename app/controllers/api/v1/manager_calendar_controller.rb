class Api::V1::ManagerCalendarController < ApplicationController

	include CalendarHelper 

    def index
        
        month_starts_at  = Time.now.beginning_of_month;
        month_ends_at    = Time.now.end_of_month;

        meetings = Meeting.where("starts_at BETWEEN :starts_at and :ends_at AND ends_at BETWEEN :starts_at and :ends_at" , { starts_at: month_starts_at, ends_at: month_ends_at })       
        
        render json: { meetings: meetings }, status: 200
        
	end

	def show

		if (params[:id].present? && params[:id].is_a?(Integer)) 

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

		if (params[:title].present? && params[:room_id].present?)  
			
			meet = Meeting.new
			
			meet.title   = params[:title]
			meet.room_id = params[:room_id].to_i

			meet.starts_at = Time.parse(params[:scheduler_at].to_s).beginning_of_day - 3.hour + (params[:starts_at_hour].to_i).hour + (params[:starts_at_minutes].to_i).minutes 
			meet.ends_at   = Time.parse(params[:scheduler_at].to_s).beginning_of_day - 3.hour + (params[:ends_at_hour].to_i).hour + (params[:ends_at_minutes].to_i).minutes

			if (period_is_inside_on_busines_hour?(meet.starts_at, meet.ends_at))

				if (have_enough_rooms_for_meeting?(meet.starts_at, meet.ends_at))

					if (room_is_empty_in_this_period?(meet.starts_at, meet.ends_at, params[:room_id].to_i)) 

						if (meet.save)

							render json: { meet: meet }, status: 201
	
						else
	
							render json: { status: 'saving_error', errors: meet.errors.full_messages }, status: 500
	
						end	

					else

						render json: { status: 'this_room_is_full_in_this_period' }, status: 200

					end

				else

					render json: { error: 'full_rooms' }, status: 200

				end			

			else

				render json: { error: 'invalid_date' }, status: 400

			end

		else

			render json: { error: 'missing_params' }, status: 400

		end

	end

	def update

		if (params[:id].present? && (params[:id].to_i > 0)) 

				meet = Meeting.where(id: params[:id].to_i).first

				if (meet.present?)

					if (meet.update_attributes(params.require(:meet).permit(:title, :starts_at, :ends_at, :description, :room_id)))

						render json: meet, status: 200 
			
					else
			
						render json: { errors: meet.errors }, status: 422 
			
					end

				else

					render json: { errors: 'meeting_not_found' }, status: 404

				end

		else

			render json: { errors: 'meeting_not_found' }, status: 404
		
		end

	end

	def destroy 

		meet = Meeting.find(params[:id])

		if (meet.destroy)

			head 204

		else

			puts meet.errors.full_messages

			render json: { errors: meet.errors }, status: 400 				

		end 
		
	end

end