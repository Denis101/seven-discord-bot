const moment = require('moment');

const is24hr = time => !time.includes('am') && !time.includes('pm');

const parseTime = time => {
    let format = '';
    if (time.includes(':')) {
        if (is24hr(time)) {
            format = 'h:ma';
        }
        else {
            format = 'H:m';
        }
    }
    else {
        if (is24hr(time)) {
            format = 'H';
        }

        format = 'ha';
    }

    return moment(time, format);
};

const getNext = (dayString, timeString) => {
    const time = parseTime(timeString);
    return time.isoWeekday(dayString);
};

module.exports = {
    getNext,
};