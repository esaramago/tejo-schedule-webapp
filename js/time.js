// This file is to GET CURRENT TIME AND DATE

// ==========================================================================

function current_time() {
    
    // 1.0. Get current date and time =====================================

    // get full date
    var date = new Date();

    // get weekday (sunday is 0, monday is 1, and so on.)
    var weekday = date.getDay();

    // get time
    current_hours   = (date.getHours()<10?'0':'') + date.getHours(); // get current hours, with leading zero
    current_minutes = (date.getMinutes()<10?'0':'') + date.getMinutes(); // get current minutes, with leading zero
    current_seconds = date.getSeconds(); // get current seconds
    
    // add 24hours, if after midnight, to make sums easier
    current_hours = ((current_hours < 5) ? current_hours = (parseInt(current_hours)+24) : current_hours)

    // fake date (for test purposes)
    //var weekday = 0
    //current_hours   = 22;
    //current_minutes = 25;
    //current_seconds = date.getSeconds();


    // 1.1. Fix current weekday =====================================

    // check if time is after midnight
    if (current_hours >= 0 && current_hours < 4) {

        // make today yesterday
        weekday = weekday - 1;

        // if sunday gets a negative value, make it saturday
        if (weekday == -1) {
            weekday = 6;
        }
    }

    // NOW, I HAVE THE CORRECT WEEKDAY!!!!
    console.log(weekday)

    if ( weekday >= 1 && weekday <= 5 ) {
        today_is = 'weekday';
    }
    else if ( weekday == 6 ) {
        today_is = 'saturday';
    }
    else if ( weekday == 0 ) {
        today_is = 'sunday';
    }

}
current_time();