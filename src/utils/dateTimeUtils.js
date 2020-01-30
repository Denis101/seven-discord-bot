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

const getNext = (dayString, timeString, freqWeeks, createDate) => {
    const time = parseTime(timeString);
    const dateTime = time.isoWeekday(dayString);

    console.log('time: ', time.format());
    console.log('time and day: ', dateTime.format());
    console.log('current date: ', moment().format());
    console.log(`current date + ${freqWeeks || 1} week(s)`, moment().add(freqWeeks || 1).format());

    if (moment() > dateTime) {
        return dateTime.add(freqWeeks || 1, 'w')
    }

    return dateTime;
};

module.exports = {
    getNext,
};