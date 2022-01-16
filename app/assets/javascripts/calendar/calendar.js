
function Calendar(date_to_calendar, meetings_in_month) {

    this.date_to_calendar  = date_to_calendar;
    this.meetings_in_month = meetings_in_month;

    this.create();

}

Calendar.prototype = {

    create: function() {

        $("body").html("")

        this.header_calendar = $( '<div/>', { class: 'header_calendar' });
        $("body").append(this.header_calendar);

        this.container = $( '<div/>', { class: 'container_calendar' });
        $("body").append(this.container);

        this.drawHeader();
        this.drawCalendar();
        this.drawModalDate();
    },    

    drawHeader: function() {

        var _this = this;

        this.header_calendar.html("");

        var back_month = $( '<button/>', { class: 'btn btn-primary', text: 'Anterior' , id: 'back_month', style: 'background: #5c5470;' });
        this.header_calendar.append(back_month); 

        var label_month_year = $( '<div/>', { class: 'label_month_year', text: moment(this.date_to_calendar).format("MMMM") +'/'+ moment(this.date_to_calendar).format("YYYY") });
        this.header_calendar.append(label_month_year);

        var forward_month = $( '<button/>', { class: 'btn btn-primary', text: 'Próximo' , id: 'forward_month', style: 'background: #5c5470;' });
        this.header_calendar.append(forward_month);  
        
        back_month.unbind('click').on('click', function(e) {

            _this.date_to_calendar = moment(_this.date_to_calendar).subtract(1, 'month');

            _this.create();

        });  

        forward_month.unbind('click').on('click', function(e) {

            _this.date_to_calendar = moment(_this.date_to_calendar).add(1, 'month');

            _this.create();

        });  
        
    },

    drawCalendar: function() {

        var _this = this;

        var month_qtd_days     = moment(this.date_to_calendar).endOf('month').format('DD');

        var row = $( '<div/>', { class: 'rows', id: 'row_0', text: 'Domingo' });
        this.container.append(row);
  
        var row = $( '<div/>', { class: 'rows', id: 'row_1', text: 'Segunda' });
        this.container.append(row);

        var row = $( '<div/>', { class: 'rows', id: 'row_2', text: 'Terça' });
        this.container.append(row);

        var row = $( '<div/>', { class: 'rows', id: 'row_3', text: 'Quarta' });
        this.container.append(row);

        var row = $( '<div/>', { class: 'rows', id: 'row_4', text: 'Quinta' });
        this.container.append(row);

        var row = $( '<div/>', { class: 'rows', id: 'row_5', text: 'Sexta' });
        this.container.append(row);

        var row = $( '<div/>', { class: 'rows', id: 'row_6', text: 'Sábado' });
        this.container.append(row);

        for (let i = 0; i < month_qtd_days; i++) {

            var week_day = moment(_this.date_to_calendar).startOf('month').add(i, 'days');
            var day      = $( '<div/>', { class: 'week_day', text: week_day.format('DD'), id: week_day.format('DD/MM/YYYY')  });

            if (week_day.format("DD/MM/YYYY") == moment().format("DD/MM/YYYY")){

                day.addClass("current_day"); 

            }

            for (let i = 0; i <= 6; i++) {

                if (week_day.weekday() == i) {

                    $("#row_"+i).append(day);

                }
                
            }       
        }

        $(".week_day").unbind('click').on('click', function(e) {

            _this.openModalDate(this.id);

        });          

    },  

    drawModalDate: function() {

        var modal = $( '<div/>', { class: 'modal', id: 'myModal' });
        $("body").append(modal);

        var modal_content = $( '<div/>', { class: 'modal_content', style: 'height: auto' });
        modal.append(modal_content);

        var modal_header = $( '<div/>', { class: 'modal_header', text: 'Agendar nova reunião' });
        modal_content.append(modal_header);

        var modal_meeting = $( '<div/>', { class: 'modal_meeting_content' });
        modal_content.append(modal_meeting);
 
        var label_title_meeting = $( '<label/>', { class: 'label_title_meeting', text: 'Título da reunião' });
        modal_meeting.append(label_title_meeting);

        var input_title_meeting = $( '<input/>', { class: 'input_title_meeting' });
        modal_meeting.append(input_title_meeting);

        var label_description_meeting = $( '<label/>', { class: 'label_description_meeting', text: 'Descrição' });
        modal_meeting.append(label_description_meeting);

        var input_title_meeting = $( '<input/>', { class: 'input_title_meeting' });
        modal_meeting.append(input_title_meeting);

        var label_date_meeting = $( '<label/>', { class: 'label_date_meeting', text: 'Horário:' });
        modal_meeting.append(label_date_meeting);

        var date_meeting_container = $( '<div/>', { class: 'date_meeting_container' });
        modal_meeting.append(date_meeting_container);

        var input_starts_at_date_meeting = $( '<input/>', { type: 'time', class: 'input_title_meeting' });
        date_meeting_container.append(input_starts_at_date_meeting);

        var input_ends_at_date_meeting = $( '<input/>', { type: 'time', class: 'input_title_meeting' });
        date_meeting_container.append(input_ends_at_date_meeting);

        var btn_choice_room = $( '<button/>', { class: 'btn btn-primary', style:"background: #5c5470; width: 30%; margin-left: 5px; margin-top: 15px;", text: 'Ver salas disponíveis' });
        modal_meeting.append(btn_choice_room);    

        var rooms_container = $( '<div/>', { class: 'rooms_container' });
        modal_meeting.append(rooms_container); 


        // // add função para pegar salas

        // var room_1 = $( '<div/>', { class: 'btn btn-primary rooms', style: 'background: #5c5470;', text: 'Sala1'  });
        // rooms_container.append(room_1); 

        // var room_2 = $( '<div/>', { class: 'btn btn-primary rooms', style: 'background: #5c5470;', text: 'Sala1'  });
        // rooms_container.append(room_2); 

        // var room_3 = $( '<div/>', { class: 'btn btn-primary rooms', style: 'background: #5c5470;', text: 'Sala1'  });
        // rooms_container.append(room_3); 

        // var room_4 = $( '<div/>', { class: 'btn btn-primary rooms', style: '', text: 'Sala1'  });
        // rooms_container.append(room_4); 

        var btn_save_contaianer = $( '<div/>', { class: 'btn_save_contaianer' });
        modal_meeting.append(btn_save_contaianer); 

        var btn_save_meeting = $( '<btn/>', { class: 'btn btn-primary', text: 'Salvar', style: 'background: #5c5470;' });
        btn_save_contaianer.append(btn_save_meeting); 

    },

    openModalDate: function(scheduler_at) {

        console.log(scheduler_at);

        var div_modal = document.getElementById("myModal");  

        div_modal.style.display = "block";
      
        window.onclick = function(event) {
          if (event.target == div_modal) {
            div_modal.style.display = "none";
          }
        }

    },
}
