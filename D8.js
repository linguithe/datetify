const { DateFormatCodes } = require('./format_codes');

/**
 * Class representing a date.
 */
class D8 {
    /**
     * Create a date.
     * @param {number} year - The year.
     * @param {number} month - The month.
     * @param {number} day - The day.
     */
    constructor(year, month, day) {
        const date = new Date();
        if (year === undefined && month === undefined && day === undefined) {
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
        } else {
            this.year = year !== undefined ? year : date.getFullYear();
            this.month = month !== undefined ? month : 0; // Default to January
            this.day = day !== undefined ? day : 1; // Default to the first day
        }
        
        this.dateObj = new Date(year, month, day);
        this.dayOfWeek = this.dateObj.getDay();
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.isLeapYear(this.year)) this.monthDays[1] = 29;
    }

    /**
     * Get the current date.
     * @return {D8} An instance of D8 representing the current date.
     */
    static date() {
        return new D8();
    }

    /**
     * Get the date as a string.
     * @param {string} format - The format to use for the date string. Defaults to 'DD-MM-YYYY'.
     * @return {string} The date as a string.
     */
    getDateString(format = DateFormatCodes.ZERO_PADDED_DAY + '-' + DateFormatCodes.MONTH_AS_NUMBER + '-' + DateFormatCodes.FULL_YEAR) {
        let monthAbbrs = this.monthNames.map(name => name.substring(0, 3));
        let weekdayAbbrs = this.weekdayNames.map(name => name.substring(0, 3));
    
        let formattedDate = format
            .replace(DateFormatCodes.FULL_YEAR, this.year)
            .replace(DateFormatCodes.TWO_DIGIT_YEAR, String(this.year).slice(-2))
            .replace(DateFormatCodes.FULL_MONTH_NAME, this.monthNames[this.month])
            .replace(DateFormatCodes.ABBREVIATED_MONTH_NAME, monthAbbrs[this.month])
            .replace(DateFormatCodes.MONTH_AS_NUMBER, String(this.month + 1).padStart(2, '0')) // returns zero padded month number
            .replace(DateFormatCodes.ZERO_PADDED_DAY, String(this.day).padStart(2, '0'))
            .replace(DateFormatCodes.FULL_WEEKDAY_NAME, this.weekdayNames[this.dateObj.getDay()])
            .replace(DateFormatCodes.ABBREVIATED_WEEKDAY_NAME, weekdayAbbrs[this.dateObj.getDay()])
            .replace(DateFormatCodes.WEEKDAY_AS_NUMBER, this.dateObj.getDay())
            .replace(DateFormatCodes.DAY_OF_YEAR, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24))
            .replace(DateFormatCodes.WEEK_NUMBER_SUNDAY, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24 / 7))
            .replace(DateFormatCodes.WEEK_NUMBER_MONDAY, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24 / 7));
    
        return formattedDate;
    }

    setFullYear(year) {
        this.year = year;
        this.dateObj = new Date(year, this.month, this.day);
    }

    // month is 0-indexed, so January is 0
    // therefore should minus one before passing into the function
    setMonth(month) {
        if (month < 0 || month > 11) throw new Error('Invalid month! Must be between 0 and 11');
        this.month = month;
        this.dateObj = new Date(this.year, month, this.day);
    }

    setDate(day) {
        if (day > this.monthDays[this.month]) throw new Error('Invalid day! Must be between 1 and ' + this.monthDays[this.month]);
        this.day = day;
        this.dateObj = new Date(this.year, this.month, day);
    }

    isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
}

module.exports = D8;