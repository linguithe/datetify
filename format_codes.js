const DateFormatCodes = {
    FULL_YEAR: '%Y',
    TWO_DIGIT_YEAR: '%y',
    FULL_MONTH_NAME: '%B',
    ABBREVIATED_MONTH_NAME: '%b',
    MONTH_AS_NUMBER: '%m',
    ZERO_PADDED_DAY: '%d',
    FULL_WEEKDAY_NAME: '%A',
    ABBREVIATED_WEEKDAY_NAME: '%a',
    WEEKDAY_AS_NUMBER: '%w',
    DAY_OF_YEAR: '%j',
    WEEK_NUMBER_SUNDAY: '%U',
    WEEK_NUMBER_MONDAY: '%W',
};

const TimeFormatCodes = {
    HOUR_24: '%H',
    HOUR_12: '%I',
    ZERO_PADDED_MINUTE: '%M',
    ZERO_PADDED_SECOND: '%S',
    AM_PM: '%p',
    MICROSECONDS: '%f',
    UTC_OFFSET: '%z',
    TIME_ZONE_NAME: '%Z',
}

const CodePrefix = '%';

const DefaultFormat = DateFormatCodes.ZERO_PADDED_DAY + '-' + 
                        DateFormatCodes.MONTH_AS_NUMBER + '-' + 
                        DateFormatCodes.FULL_YEAR + ' ' + 
                        TimeFormatCodes.HOUR_24 + ':' + 
                        TimeFormatCodes.ZERO_PADDED_MINUTE + ':' + 
                        TimeFormatCodes.ZERO_PADDED_SECOND

module.exports = {
    DateFormatCodes,
    TimeFormatCodes,
    CodePrefix,
    DefaultFormat
}