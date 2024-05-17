const Time = require('./Time');
const D8 = require('./D8');

class Datetify {
    constructor(year=new D8().year,
                month=new D8().month,
                day=new D8().day,
                hours=new Time().hours,
                minutes=new Time().minutes,
                seconds=new Time().seconds) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    // get current date
    static date() {
        return new D8();
    }

    // get current date in string
    static datestring(format) {
        return Datetify.date().getDateString(format);
    }

    // get current time
    static time() {
        return new Time();
    }

    // get current time in string
    static timestring(format) {
        return new Time().getTimeString(format);
    }
}

module.exports = Datetify;