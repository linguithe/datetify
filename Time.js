const { TimeFormatCodes } = require('./format_codes');

class Time {
    constructor(hours, minutes) {
        if ((hours === undefined || minutes === undefined) && (hours !== undefined || minutes !== undefined)) {
            throw new Error('Hours and minutes must both be provided');
        }
    
        this.hours = hours !== undefined ? hours : new Date().getHours();
        this.minutes = minutes !== undefined ? minutes : new Date().getMinutes();
        this.seconds = seconds !== undefined ? seconds : 0;

        this.dateObj = new Date();
        this.dateObj.setHours(this.hours);
        this.dateObj.setMinutes(this.minutes);
        this.dateObj.setSeconds(this.seconds);
    }

    // get current time
    static time() {
        return new Time();
    }

    // get time as a string
    getTimeString(format = TimeFormatCodes.HOUR_24 + ':' + TimeFormatCodes.ZERO_PADDED_MINUTE + ':' + TimeFormatCodes.ZERO_PADDED_SECOND) {        
        let formattedTime = format
            .replace(TimeFormatCodes.HOUR_24, this.hours)
            .replace(TimeFormatCodes.HOUR_12, this.hours > 12 ? this.hours - 12 : this.hours)
            .replace(TimeFormatCodes.ZERO_PADDED_MINUTE, String(this.minutes).padStart(2, '0'))
            .replace(TimeFormatCodes.ZERO_PADDED_SECOND, String(this.seconds).padStart(2, '0'))
            .replace(TimeFormatCodes.AM_PM, this.hours >= 12 ? 'PM' : 'AM')
            .replace(TimeFormatCodes.MICROSECONDS, dateObj.getMilliseconds() * 1000)
            .replace(TimeFormatCodes.UTC_OFFSET, -dateObj.getTimezoneOffset())
            .replace(TimeFormatCodes.TIME_ZONE_NAME, Intl.DateTimeFormat().resolvedOptions().timeZone);

        return formattedTime;
    }
}

module.exports = Time;