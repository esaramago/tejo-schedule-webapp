// Schedule tabs
$('.nav-tab').on('click', function() {
    var $this = $(this);
    var schedule = $this.data('schedule');

    // nav tabs
    $this.siblings('.nav-tab').removeClass('active');
    $this.addClass('active');

    // tabs
    $this.closest('.page-content').find('.schedule').removeClass('active');
    $('#'+ schedule +'-schedule').addClass('active');
});


// Page transitions
$('#outbound-trip').on('tap swipeleft', function() {

    var schedule = 'outbound';
    var $schedule = $('#'+ schedule +'-schedule');
    $schedule.addClass('active');

     // Select current day tab
    today_tab();

    // update next outbound schedule
    comming_schedule(schedule);

    // scroll to current schedule
    $('#'+ schedule +'-schedule').find('.schedule-wrapper').delay(400).animate({
        scrollTop: $('.schedule__next').offset().top - 120 // - 152
    }, 1000);
});
$('#return-trip').on('tap swipeleft', function() {

    var schedule = 'return';
    var $schedule = $('#'+ schedule +'-schedule');
    $schedule.addClass('active');

    // Select current day tab
    today_tab();

    // update next return schedule
    comming_schedule(schedule);


    // scroll to current schedule
    $('#'+ schedule +'-schedule').find('.schedule-wrapper').delay(400).animate({
        scrollTop: $('.schedule__next').offset().top - 120 // - 152
    }, 1000);
});

var schedules = $('#outbound-schedule, #return-schedule');
$('.back-to-home').on('tap', function() {
    schedules.removeClass('active');

});
$('.schedule-wrapper').on('swiperight', function() {
    schedules.removeClass('active');

});


// Select current day tab
function today_tab() {

    current_time();
    if (today_is == 'saturday') {
        $('.nav-tab:nth-child(2)').click();
    }
    else if (today_is == 'sunday') {
        $('.nav-tab:nth-child(3)').click();
    }
}
