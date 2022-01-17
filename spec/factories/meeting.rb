FactoryGirl.define do 
    factory :meeting do 
		title { Faker::Lorem.sentence }
		description { Faker::Lorem.paragraph }
        starts_at { Faker::Time.between(from: Time.now.beginning_of_day + 9.hour, to: Time.now.beginning_of_day + 18.hour) }
        ends_at  { Faker::Time.between(from: Time.now.beginning_of_day + 9.hour, to: Time.now.beginning_of_day + 18.hour) }
        room_id 1
	end
end