const moment = require('moment-timezone');

const is24hr = time => !time.includes('am') && !time.includes('pm');

const date = () => {
    return moment().tz('America/New_York');
}

const getUnix = timestamp => {
    return moment.unix(timestamp).tz('America/New_York');
}

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

const getNext = (dayString, timeString, freqWeeks) => {
    const time = parseTime(timeString);
    const dateTime = time.isoWeekday(dayString);
    if (moment() > dateTime) {
        return dateTime.add(freqWeeks || 1, 'w')
    }

    return dateTime;
};

module.exports = {
    getNext,
    date,
    getUnix,
};