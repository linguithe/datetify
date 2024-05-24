const { TimeFormatCodes } = require('./format_codes');

/**
 * Class representing a time.
 */
class Time {
    /**
     * Create a time.
     * @param {number} hours - The hours.
     * @param {number} minutes - The minutes.
     * @param {number} seconds - The seconds.
     */
    constructor(hours, minutes, seconds) {
        const date = new Date();
        if (hours === undefined && minutes === undefined && seconds === undefined) {
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();
        } else {
            this.hours = hours !== undefined ? hours : 0; // Default to 0
            this.minutes = minutes !== undefined ? minutes : 0; // Default to 0
            this.seconds = seconds !== undefined ? seconds : 0; // Default to 0
        }
    }

    /**
     * Get the current time.
     * @return {Time} An instance of Time representing the current time.
     */
    static time() {
        return new Time();
    }

    /**
     * Get the time as a string.
     * @param {string} format - The format to use for the time string.
     * @return {string} The time as a string.
     */
    getTimeString(format = TimeFormatCodes.HOUR_24 + ':' + TimeFormatCodes.ZERO_PADDED_MINUTE + ':' + TimeFormatCodes.ZERO_PADDED_SECOND) {        
        let formattedTime = format
            .replace(TimeFormatCodes.HOUR_24, this.hours)
            .replace(TimeFormatCodes.HOUR_12, this.hours > 12 ? this.hours - 12 : this.hours)
            .replace(TimeFormatCodes.ZERO_PADDED_MINUTE, String(this.minutes).padStart(2, '0'))
            .replace(TimeFormatCodes.ZERO_PADDED_SECOND, String(this.seconds).padStart(2, '0'))
            .replace(TimeFormatCodes.AM_PM, this.hours >= 12 ? 'PM' : 'AM')
            .replace(TimeFormatCodes.MICROSECONDS, this.dateObj.getMilliseconds() * 1000)
            .replace(TimeFormatCodes.UTC_OFFSET, -this.dateObj.getTimezoneOffset())
            .replace(TimeFormatCodes.TIME_ZONE_NAME, Intl.DateTimeFormat().resolvedOptions().timeZone);

        return formattedTime;
    }

    setHours(hours) {
        if (hours < 0 || hours > 23) throw new Error('Invalid hours! Must be between 0 and 23');
        this.dateObj.setHours(hours);
    }

    setMinutes(minutes) {
        if (minutes < 0 || minutes > 59) throw new Error('Invalid minutes! Must be between 0 and 59');
        this.dateObj.setMinutes(minutes);
    }

    setSeconds(seconds) {
        if (seconds < 0 || seconds > 59) throw new Error('Invalid seconds! Must be between 0 and 59');
        this.dateObj.setSeconds(seconds);
    }
}

module.exports = Time;