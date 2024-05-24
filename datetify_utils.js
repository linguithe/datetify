const { DateFormatCodes, TimeFormatCodes, CodePrefix } = require('./format_codes');
const D8 = require('./D8');
const Time = require('./Time');
const Datetify = require('./Datetify');

const Utils = {
    validateParams: validateParams,
    validateParseStringInt: validateParseStringInt,
    validateParseStringFloat: validateParseStringFloat,
    strptime: strptime,
    strftime: strftime
}

// Usage: Utils.validateParams(args, types), e.g.
// function add(num1, num2) {
//     validate(arguments, 'number', 'number');
//     return num1 + num2;
// }
function validateParams(args, ...types) {
    if (args.length !== types.length) {
        throw new Error('Number of arguments does not match number of types');
    }

    for (let i = 0; i < types.length; i++) {
        if (typeof types[i] === 'string') {
            // Check primitive types
            if (typeof args[i] !== types[i]) {
                throw new Error(`Argument ${i} should be of type ${types[i]}`);
            }
        } else {
            // Check custom classes
            if (!(args[i] instanceof types[i])) {
                    throw new Error(`Argument ${i} should be an instance of ${types[i].name}`);
            }
        }
    }
}

function validateParseString(string, parseFunc) {
    validateParams(arguments, 'string', 'function');

    if (string.length === 0) {
        throw new Error('Empty string');
    }

    const num = parseFunc(string.trim());
    if (isNaN(num)) {
        throw new Error(`Cannot parse "${string}" into a number`);
    }

    return num;
}

function validateParseStringInt(string) {
    return validateParseString(string, parseInt);
}

function validateParseStringFloat(string) {
    return validateParseString(string, parseFloat);
}

// for %Y, %m, %d, %H, %M, %S only for now
function recogniseFormat(format) {
    validateParams(arguments, 'string');

    // Escape all non-format code characters in the format string
    let pattern = format.replace(/[^%](?![YmdHMS])/g, '\\$&');

    // Create a regex pattern from the format
    pattern = pattern.replace(/%Y/g, '(\\d{4})');
    pattern = pattern.replace(/%m/g, '(0?[1-9]|1[012])');
    pattern = pattern.replace(/%d/g, '(0[1-9]|[12][0-9]|3[01])');
    pattern = pattern.replace(/%H/g, '([01][0-9]|2[0-3])');
    pattern = pattern.replace(/%M/g, '([0-5][0-9])');
    pattern = pattern.replace(/%S/g, '([0-5][0-9])');

    return pattern;
}

function strptime(string, format) {
    validateParams(arguments, 'string', 'string');

    pattern = recogniseFormat(format);

    // Check if the string matches the pattern
    const regex = new RegExp(`^${pattern}$`);
    if (!regex.test(string)) {
        throw new Error('String does not match the format');
    }

    // Parse the string into a date object
    const d8 = new D8();
    const time = new Time();
    const matches = string.match(regex);
    if (format.includes(DateFormatCodes.FULL_YEAR)) d8.setFullYear(validateParseStringInt(matches[format.split(DateFormatCodes.FULL_YEAR)[0].split(CodePrefix).length]));
    if (format.includes(DateFormatCodes.MONTH_AS_NUMBER)) d8.setMonth(validateParseStringInt(matches[format.split(DateFormatCodes.MONTH_AS_NUMBER)[0].split(CodePrefix).length] - 1));
    if (format.includes(DateFormatCodes.ZERO_PADDED_DAY)) d8.setDate(validateParseStringInt(matches[format.split(DateFormatCodes.ZERO_PADDED_DAY)[0].split(CodePrefix).length]));
    if (format.includes(TimeFormatCodes.HOUR_24)) time.setHours(validateParseStringInt(matches[format.split(TimeFormatCodes.HOUR_24)[0].split(CodePrefix).length]));
    if (format.includes(TimeFormatCodes.ZERO_PADDED_MINUTE)) time.setMinutes(validateParseStringInt(matches[format.split(TimeFormatCodes.ZERO_PADDED_MINUTE)[0].split(CodePrefix).length]));
    if (format.includes(TimeFormatCodes.ZERO_PADDED_SECOND)) time.setSeconds(validateParseStringInt(matches[format.split(TimeFormatCodes.ZERO_PADDED_SECOND)[0].split(CodePrefix).length]));

    return new Datetify(d8.year, d8.month, d8.day, time.hours, time.minutes, time.seconds);
}

function strftime(datetify, format) {
    validateParams(arguments, Datetify, 'string');

    datetifyStr = format.replace(DateFormatCodes.FULL_YEAR, datetify.year)
                        .replace(DateFormatCodes.MONTH_AS_NUMBER, datetify.month + 1)
                        .replace(DateFormatCodes.ZERO_PADDED_DAY, datetify.day)
                        .replace(TimeFormatCodes.HOUR_24, datetify.hours)
                        .replace(TimeFormatCodes.ZERO_PADDED_MINUTE, datetify.minutes)
                        .replace(TimeFormatCodes.ZERO_PADDED_SECOND, datetify.seconds);
    return datetifyStr;
}

module.exports = Utils