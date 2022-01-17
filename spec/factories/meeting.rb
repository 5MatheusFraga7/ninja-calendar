FactoryGirl.define do 
    factory :meeting do 
        id { Faker::Number.decimal_part(digits: 2) }
		title { Faker::Lorem.sentence }
		description { Faker::Lorem.paragraph }
        starts_at { Faker::Date.forward }
        ends_at  { Faker::Date.forward }
        room_id 1
	end
end