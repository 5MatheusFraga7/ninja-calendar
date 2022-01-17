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
	end    

end