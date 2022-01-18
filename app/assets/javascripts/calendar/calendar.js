
function Calendar(date_to_calendar) {

    this.date_to_calendar = date_to_calendar;
    this.rooms = null;
    this.scheduler_at = '';

    this.create();

}

Calendar.prototype = {

    create: function() {

        var _this = this;

        $("body").html("");

        this.header_calendar = $( '<div/>', { class: 'header_calendar' });
        $("body").append(this.header_calendar);

        this.container = $( '<div/>', { class: 'container_calendar' });
        $("body").append(this.container);

        this.getRooms(function(data) {

            _this.rooms = data.rooms;

        });

        this.getMeetings(function(data) {

            _this.drawHeader();
            _this.drawCalendar(data.meetings);
            _this.drawModalDate();

        });

    },  

    getRooms: function (func) {
        $.ajax({
			type : 'GET',
			url : 'http://localhost:3000/get_rooms',
			data : {},
			processData: false, 
			contentType: false,
			success : function(data) {
                return func(data);
			},
			error: function(data){
			    console.log("error");
                console.log(data);
                
                return func(data);
			}
		}); 
    },
    
    getMeetings: function(func) {

		$.ajax({
			type : 'GET',
			url : 'api/v1/manager_calendar',
			data : {},
			processData: false, 
			contentType: false,
			success : function(data) {

                return func(data);
			},
			error: function(data){
			    console.log("error");
                console.log(data);
                
                return func(data);
			}
		}); 

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

    drawCalendar: function(meetings) {

        var _this = this;

        var month_qtd_days = moment(this.date_to_calendar).endOf('month').format('DD');

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

        console.log(_this.date_to_calendar);

        for (let i = 0; i < month_qtd_days; i++) {

            var week_day = moment().startOf('month').add(i, 'days');
            var day      = $( '<div/>', { class: 'week_day', text: week_day.format('DD'), id: "id-"+week_day.format() });

            if (week_day.format("DD/MM/YYYY") == moment().format("DD/MM/YYYY")){

                day.addClass("current_day"); 
            }   
              
            for (let i = 0; i <= 6; i++) {

                if (week_day.weekday() == i) {

                    $("#row_"+i).append(day);

                }    
            } 
            
            for (let j = 0; j < meetings.length; j++) {

                if (moment(meetings[j].starts_at).format('DD/MM/YYYY') == week_day.format("DD/MM/YYYY")) {
                    
                    if (day.children().size() < 3) {

                        var title       = (meetings[j].title != null) ? meetings[j].title  : 'Reunião';
                        var meeting_div = $('<div/>', { class: 'meeting_div', text: title });

                        day.append(meeting_div);

                    }
                    else {

                        day.append('...');
                        break;

                    }
                }
                
            }            
            
        }        

        $(".week_day").unbind('click').on('click', function(e) {

            _this.openModalDate(this.id);

        });          

    },  

    drawModalDate: function() {

        var _this = this;

        var modal = $( '<div/>', { class: 'modal', id: 'myModal' });
        $("body").append(modal);

        var modal_content = $( '<div/>', { class: 'modal_content', style: 'height: auto' });
        modal.append(modal_content);

        var input_selected_day_meeting = $( '<input/>', { type: 'hidden', id: 'input_selected_day_meeting' });
        modal_content.append(input_selected_day_meeting);

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

        var input_description_meeting = $( '<input/>', { class: 'input_title_meeting' });
        modal_meeting.append(input_description_meeting);

        var label_date_meeting = $( '<label/>', { class: 'label_date_meeting', text: 'Horário:' });
        modal_meeting.append(label_date_meeting);

        var date_meeting_container = $( '<div/>', { class: 'date_meeting_container' });
        modal_meeting.append(date_meeting_container);

        var input_starts_at_date_meeting = $( '<input/>', { type: 'time', class: 'input_title_meeting', id: 'starts_at' });
        date_meeting_container.append(input_starts_at_date_meeting);

        var input_ends_at_date_meeting = $( '<input/>', { type: 'time', class: 'input_title_meeting', id: 'ends_at' });
        date_meeting_container.append(input_ends_at_date_meeting);

        var select_rooms_cotainer = $('<div/>', { class: 'select_rooms_cotainer' });
        modal_meeting.append(select_rooms_cotainer); 
        
        var label_rooms_meeting = $( '<label/>', { class: 'label_date_meeting', text: 'Salas:' });
        select_rooms_cotainer.append(label_rooms_meeting);

        var select_rooms = $('<select/>', { class: 'form-select' });
        select_rooms_cotainer.append(select_rooms);

        for (let i = 0; i < this.rooms.length; i++) {

                var room        = _this.rooms[i];
                var option_room = $('<option/>', { value: room.id, text: room.name });

                select_rooms.append(option_room);
            
        }

        var btn_save_contaianer = $( '<div/>', { class: 'btn_save_contaianer' });
        modal_meeting.append(btn_save_contaianer); 

        var btn_save_meeting = $( '<btn/>', { class: 'btn btn-primary', text: 'Salvar', style: 'background: #5c5470;' });
        btn_save_contaianer.append(btn_save_meeting); 

        btn_save_meeting.unbind('click').on('click', function(e) {

            var scheduler_at =  document.getElementById('input_selected_day_meeting').value;

            var starts_at_hour    = (document.getElementById("starts_at").value).split(":")[0];
            var starts_at_minutes = (document.getElementById("starts_at").value).split(":")[1];
            var ends_at_hour      = (document.getElementById("ends_at").value).split(":")[0];
            var ends_at_minutes   = (document.getElementById("ends_at").value).split(":")[1];

            _this.save_new_meeting(scheduler_at, starts_at_hour, starts_at_minutes, ends_at_hour, ends_at_minutes, input_title_meeting.val(), input_description_meeting.val(), select_rooms.val());

        });

    },

    openModalDate: function(scheduler_at) {    
        
        this.scheduler_at = scheduler_at;
        
        document.getElementById('input_selected_day_meeting').value = scheduler_at.replaceAll("id-", "").replaceAll("_", "/");

        var div_modal = document.getElementById("myModal");  

        div_modal.style.display = "block";
      
        window.onclick = function(event) {
          if (event.target == div_modal) {
            div_modal.style.display = "none";
          }
        }

    },

    save_new_meeting: function (scheduler_at, starts_at_hour, starts_at_minutes, ends_at_hour, ends_at_minutes, title, description, room_id) {

        var _this = this;

        $.ajax({
			type : 'POST',
			url : 'api/v1/manager_calendar',
			data : { scheduler_at: scheduler_at, starts_at_hour, starts_at_minutes, ends_at_hour, ends_at_minutes, title: title, description: description, room_id: room_id },
			success : function(data) {
                _this.onSanvingMeeting(data.meet);
			},
			error: function(data){
			    console.log("error");
                console.log(data);
                document.getElementById("myModal").style.display = "none";

                alert("Não foi possível criar a reunião nesse horário");
			}
		}); 


    },

    onSanvingMeeting: function (meet) {

        document.getElementById("myModal").style.display = "none";

        alert("REunião criada com sucesso!");

    },
}
