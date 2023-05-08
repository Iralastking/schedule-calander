


jQuery(document).ready(function ($) {

    let now = dayjs();
    let now_hour = now.format('H');
    let container = $('.container-fluid');
    
    function update_date(now) {
        let date = now.format('MM/DD/YYYY');
        $('#currentDay').text(date).show();
    }

    function generate_schedule() {
        for (let hour = 0; hour <= 23; hour++) {
            let clone = $('.the-template').clone();
            container.append(clone);
            let id = '-hour-' + hour;
            id = now.format('YYYY-MM-DD') + id;
            clone.attr('id', id);
            let style = hour == now_hour ? 'present' : '';
            style = !style && hour <= now_hour ? 'past': style;
            style = !style && hour >= now_hour ? 'future': style;
            clone.addClass(style);
            let description = clone.find('.description');
            let hour_text = clone.find('.hour');
            let hour_number = hour > 11 ? hour - 12 : hour;
            hour_number = hour === 0 ? 12 : hour_number;
            let am_pm = hour > 12 ? 'PM' : 'AM'; //ternary statement
            hour_text.text(hour_number + am_pm);
            let saved = localStorage.getItem(id);
            description.val(saved);
            clone.removeClass('the-template'); //show the row
        }
    }
    
    update_date(now);
    generate_schedule();

    $('body').on('click', '.saveBtn', function (e) {
        let parent_row = $(this).parent();
        let id = parent_row.attr('id');
        let description = parent_row.find('.description').val();
        localStorage.setItem(id, description);
    });

    $('button#previous').on('click', function(){
        now = now.add(-1, 'day');
        container.empty();
        update_date(now);
        generate_schedule();
    });

    $('button#next').on('click', function(){
        now = now.add(1, 'day');
        container.empty();
        update_date(now);
        generate_schedule();
    });

});
