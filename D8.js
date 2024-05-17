const { DateFormatCodes } = require('./format_codes');

class D8 {
    constructor(year, month, day) {
        if ((year === undefined || month === undefined || day === undefined) && (year !== undefined || month !== undefined || day !== undefined)) {
            throw new Error('Year, month, and day must all be provided');
        }
    
        this.year = year !== undefined ? year : new Date().getFullYear();
        this.month = month !== undefined ? month : new Date().getMonth();
        this.day = day !== undefined ? day : new Date().getDate();
        
        this.dateObj = new Date(year, month, day);
        this.dayOfWeek = this.dateObj.getDay();
    }

    // get current date
    static date() {
        return new D8();
    }

    // get date as a string
    getDateString(format = DateFormatCodes.ZERO_PADDED_DAY + '-' + DateFormatCodes.ZERO_PADDED_MONTH + '-' + DateFormatCodes.FULL_YEAR) {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let monthAbbrs = monthNames.map(name => name.substring(0, 3));
        let weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let weekdayAbbrs = weekdayNames.map(name => name.substring(0, 3));
    
        let formattedDate = format
            .replace(DateFormatCodes.FULL_YEAR, this.year)
            .replace(DateFormatCodes.TWO_DIGIT_YEAR, String(this.year).slice(-2))
            .replace(DateFormatCodes.FULL_MONTH_NAME, monthNames[this.month])
            .replace(DateFormatCodes.ABBREVIATED_MONTH_NAME, monthAbbrs[this.month])
            .replace(DateFormatCodes.ZERO_PADDED_MONTH, String(this.month + 1).padStart(2, '0'))
            .replace(DateFormatCodes.ZERO_PADDED_DAY, String(this.day).padStart(2, '0'))
            .replace(DateFormatCodes.FULL_WEEKDAY_NAME, weekdayNames[this.dateObj.getDay()])
            .replace(DateFormatCodes.ABBREVIATED_WEEKDAY_NAME, weekdayAbbrs[this.dateObj.getDay()])
            .replace(DateFormatCodes.WEEKDAY_AS_NUMBER, this.dateObj.getDay())
            .replace(DateFormatCodes.DAY_OF_YEAR, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24))
            .replace(DateFormatCodes.WEEK_NUMBER_SUNDAY, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24 / 7))
            .replace(DateFormatCodes.WEEK_NUMBER_MONDAY, Math.floor((this.dateObj - new Date(this.dateObj.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24 / 7));
    
        return formattedDate;
    }
}

module.exports = D8;