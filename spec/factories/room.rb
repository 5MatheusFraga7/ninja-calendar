FactoryGirl.define do 
    factory :room do 
        id { 1 }
		name { Faker::Lorem.sentence }
		code { Faker::Lorem.paragraph }
	end
end