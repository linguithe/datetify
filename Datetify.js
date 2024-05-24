const Time = require('./Time');
const D8 = require('./D8');
const Utils = require('./datetify_utils');
const { DefaultFormat } = require('./format_codes');

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
            month=0,
            day=1,
            hours=0,
            minutes=0,
            seconds=0) {

        Utils.validateParams(arguments, 'number', 'number', 'number', 'number', 'number', 'number');

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

    /**
     * Format the input based on the provided format string. If input is an instance of Datetify, it will be formatted. If input is a string, it will be parsed.
     * @param {Datetify|string} input - The input to format. Can be an instance of Datetify or a string.
     * @param {string} format - The format string.
     */
    static format(input, format=DefaultFormat) {
        if (input instanceof Datetify) {
            Utils.validateParams(arguments, Datetify, 'string');
            Utils.strftime(input, format);
        } else if (input instanceof String) {
            Utils.validateParams(arguments, 'string', 'string');
            Utils.strptime(input, format);
        }
    }
}

module.exports = Datetify;