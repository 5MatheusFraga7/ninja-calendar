module CalendarHelper 

    def period_is_inside_on_busines_hour?(starts_at, ends_at)
        if (((starts_at.wday) != 5 && (starts_at.wday) != 6 && (starts_at.hour.between?(9, 18)) && (ends_at.hour.between?(9, 18)))) 
            true
        else
            false
        end
    end

    def have_enough_rooms_for_meeting?(starts_at, ends_at)
        
       if (Meeting.where("starts_at BETWEEN :starts_at and :ends_at or ends_at BETWEEN :starts_at and :ends_at", { starts_at: starts_at, ends_at: ends_at }).count < Room.all.count)

        true

       else

        false

       end

    end

end
