require 'rails_helper'

RSpec.describe "Manager calendar API", type: :request do 

    describe 'INDEX /manager_calendar' do 
        it 'returns status code 200' do
            get '/api/v1/manager_calendar/'
            expect(response).to have_http_status(200)
        end	
	end

    describe 'SHOW /manager_calendar' do 
        it 'returns status code 200' do
            get '/api/v1/manager_calendar/'
            expect(response).to have_http_status(200)
        end	
    end
    
    describe 'CREATE /manager_calendar' do 

        let(:meeting) {build(:meeting)}
        let(:room) {build(:room)}

        it 'returns status code 201' do
            post '/api/v1/manager_calendar/', params: { room_id: room.id, title: meeting.title, starts_at: meeting.starts_at, ends_at: meeting.ends_at }
            
            expect(response).to have_http_status(201)
        end	

        it 'saves the meeting in database' do
            post '/api/v1/manager_calendar/', params: { room_id: room.id, title: meeting.title, starts_at: meeting.starts_at, ends_at: meeting.ends_at }
            
            expect(Meeting.where(title: meeting.title, room_id: room.id)).not_to be_nil 
        end 

        it 'period must be in busines hour' do
            expect(((meeting.starts_at.wday) != 5 && (meeting.starts_at.wday) != 6 && (meeting.starts_at.hour.between?(9, 18)) && (meeting.ends_at.hour.between?(9, 18)))).to be_truthy 
        end 

        it 'it is not possible to create more than 4 simultaneous meetings' do 
            post '/api/v1/manager_calendar/', params: { room_id: room.id, title: meeting.title, starts_at: meeting.starts_at, ends_at: meeting.ends_at }
            
            expect((Meeting.where("starts_at BETWEEN :starts_at and :ends_at or ends_at BETWEEN :starts_at and :ends_at", { starts_at: meeting.starts_at, ends_at: meeting.ends_at }).count) > 4).not_to be_truthy
        end

    end  
    
    describe 'PUT /id manager_calendar' do 

		before do 
			put "/api/v1/manager_calendar/#{Meeting.first.id}", params: { meet: { title: 'New Meeting Title', starts_at: Time.now.beginning_of_day + 15.hour } }
		end    

        it 'returns status code 200' do 
            expect(response).to have_http_status(200)
        end    

        it 'updates the meet in the database' do 
            expect(Meeting.find_by(title: 'New Meeting Title')).not_to be_nil
        end

        it 'dont updates out of busines hour' do 
            meeting = Meeting.first
            expect(((meeting.starts_at.wday) != 5 && (meeting.starts_at.wday) != 6 && (meeting.starts_at.hour.between?(9, 18)) && (meeting.ends_at.hour.between?(9, 18)))).to be_truthy 
        end

	end  

    describe 'DESTROY/id manager_calendar' do 

        let(:meet_id) { Meeting.first.id }

		before do 
			delete "/api/v1/manager_calendar/#{meet_id}"
		end

		it 'status code is 204' do 
			expect(response).to have_http_status(204)
		end

		it 'removes the meeting from the database' do 
			expect(Meeting.where(id: meet_id).first).to be_nil
		end

	end  
end

