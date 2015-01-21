//! moment.work-duration.js
//! version : 0.0.0
//! authors : Mike Wyatt II
//! license : MIT

(function (moment) {
    var STRINGS = {
        noduration: '',
        week: 'w',
        weeks: 'w',
        day: 'd',
        days: 'd',
        hour: 'h',
        hours: 'h',
        minute: 'm',
        minutes: 'm',
        delimiter: ' '
    };
    var CONVERSIONS = {
        week: 5,
        day: 8
    };

    moment.duration.fn.asWorkWeeks = function () {
        return this.as('h') / (CONVERSIONS.week * CONVERSIONS.day);
    }

    moment.duration.fn.asWorkDays = function () {
        return this.as('h') / (CONVERSIONS.day);
    }

    moment.duration.fn.workWeeks = function () {
        return Math.floor(this.as('h') / (CONVERSIONS.week * CONVERSIONS.day));
    }
    
    moment.duration.fn.workDays = function () {
        return Math.floor(this.as('h') / (CONVERSIONS.day));
    }

    moment.fn.workDuration = function(duration) {
        return moment.workDuration(duration);
    };
    moment.workDuration = function(duration) {
        if (!moment.isDuration(duration)) {
            throw "Must use duration with workDuration";
        }

        if (duration.asMinutes() < 1) {
            return STRINGS.noduration;
        }

        var wDiff = duration.workWeeks();
        var dDiff = duration.workDays() % CONVERSIONS.week;
        var hourDiff = duration.hours() % CONVERSIONS.day;
        var minDiff = duration.minutes();

        function pluralize(num, word) {
            return num + STRINGS[word + (num === 1 ? '' : 's')];
        }
        var result = [];

        if (wDiff) {
            result.push(pluralize(wDiff, 'week'));
        }
        if (dDiff) {
            result.push(pluralize(dDiff, 'day'));
        }
        if (hourDiff) {
            result.push(pluralize(hourDiff, 'hour'));
        }
        if (minDiff) {
            result.push(pluralize(minDiff, 'minute'));
        }

        return result.join(STRINGS.delimiter);
    };
}(moment));