// Schedule tabs
$('.tab').on('click', function() {
    var $this = $(this);
    var schedule = $this.data('schedule');

    // tabs
    $this.siblings('.tab').removeClass('active');
    $this.addClass('active');

    // tabs
    $this.closest('.page').find('.schedule').removeClass('active');
    $('#'+ schedule +'-schedule').addClass('active');
});


// Page transitions
$('.js-schedule-card').on('tap swipeleft', function() {

    var way = $(this).data('way');
    var $schedule = $('#'+ way +'-schedule');
    $schedule.addClass('active');

    // Select current day tab
    today_tab();

    // update next outbound schedule
    comming_schedule(way);

    // scroll to next schedule time
    $schedule.find('.schedule-wrapper').delay(400).animate({
        scrollTop: $schedule.find('.schedule__next').position().top - 24
    }, 1000);


    // Browser back button - go to homepage (NOT WORKING ON PHONE)
    if (window.history && window.history.pushState) {

        window.history.pushState('forward', null, './#forward');

        $(window).on('popstate', function() {
            if( $('.schedule-page').hasClass('active') ) {
                backToHomepage();
            }
        });
    }
})

// Go back to homepage
$('.js-back').on('tap', function() {
    backToHomepage();
});
$('.schedule-wrapper').on('swiperight', function() {
    backToHomepage();
});





// Back to homepage function
function backToHomepage() {
    $('.schedule-page').removeClass('active');
}

// Select current day tab
function today_tab() {

    current_time();
    if (today_is == 'saturday') {
        $('.tab:nth-child(2)').click();
    }
    else if (today_is == 'sunday') {
        $('.tab:nth-child(3)').click();
    }
}






// ServiceWorker is a progressive technology. Ignore unsupported browsers
// Credits: https://css-tricks.com/serviceworker-for-offline/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
