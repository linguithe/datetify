const Time = require('./Time');
const D8 = require('./D8');

class Datetify {
    /**
     * @param {number} year - The year.
     * @param {number} month - The month.
     * @param {number} day - The day.
     * @param {number} hours - The hours.
     * @param {number} minutes - The minutes.
     * @param {number} seconds - The seconds.
     */
    constructor(year=new D8().year,
                month=new D8().month,
                day=new D8().day,
                hours=new Time().hours,
                minutes=new Time().minutes,
                seconds=new Time().seconds) {
        if ((year === undefined || month === undefined || day === undefined) && 
            (hours === undefined || minutes === undefined) && 
            (year !== undefined || month !== undefined || day !== undefined || hours !== undefined || minutes !== undefined)) {
            throw new Error('Either year, month, and day or hours and minutes must be provided, or none should be provided');
        }
        
        this.year = year;
        this.month = month;
        this.day = day;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    /**
     * Get the current date.
     * @return {D8} An instance of D8 representing the current date.
     */
    static date() {
        return new D8();
    }

    /**
     * Get the current date as a string.
     * @param {string} format - The format to use for the date string.
     * @return {string} The date as a string.
     */
    static datestring(format) {
        return Datetify.date().getDateString(format);
    }

    /**
     * Get the current time.
     * @return {Time} An instance of Time representing the current time.
     */
    static time() {
        return new Time();
    }

    /**
     * Get the current time as a string.
     * @param {string} format - The format to use for the time string.
     * @return {string} The time as a string.
     */
    static timestring(format) {
        return new Time().getTimeString(format);
    }
}

module.exports = Datetify;