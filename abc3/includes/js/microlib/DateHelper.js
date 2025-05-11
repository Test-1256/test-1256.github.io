/**
 * @fileOverview small collection of methods relating to dates to help iview and related projects.
 * @author Glen
 * @author Breton
 * @author Geoff
 */


/**
 * @namespace ABC
 * @type {Object}
 */
var ABC = ABC || {};
/**
 * @namespace ABC.dateHelper
 * @type {Object}
 */
ABC.dateHelper = {
    months_en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    units_en: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century', 'millenium'],
    pluralUnits_en: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years', 'decades', 'centuries', 'millenia'],
    unitMultipliers: [1, 60, 60, 24, 7, 4.345, 12, 10, 10, 10],
    in_en: 'in ',
    ago_en: ' ago',
    now_en: 'now',
    diffSeconds: function (date, now) {
        now = now ? ABC.dateHelper.stringToDate(now) : +(new Date());
        date = date ? ABC.dateHelper.stringToDate(date) : +(new Date());
        return (now - date) / 1000;
    },
    diffDays: function (date, now) {
        var diff = ABC.dateHelper.diffSeconds(date, now) / 86400;
        var abs = Math.abs(diff);
        var sign = diff < 0 ? -1 : 1;
        return Math.floor(abs) * sign;
    },
    getPretty: function (date, now) {
        var me = ABC.dateHelper;
        var deltaT = me.diffSeconds(date, now); // in seconds
        var units = me.units_en;
        var plurals = me.pluralUnits_en;
        var multipliers = me.unitMultipliers;
        var unit, prefix = '',
            suffix = '',
            i = 0;
        if (isNaN(deltaT)) {
            return '';
        }
        if (Math.abs(deltaT) < 1) {
            return me.now_en;
        }
        while ((Math.abs(Math.round(deltaT)) >= multipliers[i + 1]) && (i < multipliers.length)) {
            i += 1;
            deltaT /= multipliers[i]; // if |deltaT| >= the next multiplier, divide by the multiplier and increment the unit                      
        }
        if (deltaT < 0) {
            prefix = me.in_en;
        }
        if (deltaT > 0) {
            suffix = me.ago_en;
        }
        unit = (Math.abs(Math.round(deltaT)) > 1) ? plurals[i] : units[i];
        return prefix + Math.abs(Math.round(deltaT)) + ' ' + unit + suffix;
    },
    /**
     * Returns a string describing how long ago the dateString was.
     * @param {String} dateString  in the format 2011-12-25 00:01:00
     */
    getDaysAgo: function (dateString) {
        return ABC.dateHelper.getPretty(dateString);
    },
    /**
     * Returns a string describing how far in the future the supplied dateString is
     * @param {String} dateString  in the format 2011-12-25 00:01:00
     */
    getInFuture: function (dateString) {
        return ABC.dateHelper.getPretty(dateString);
    },
    /**
     * Returns a string describing the broadcast date.
     * @param {String} dateString  in the format 2011-12-25 00:01:00
     */
    getBroadcastOn: function (dateString) {
        var me = ABC.dateHelper;
        var months = me.months_en;

        if (dateString != undefined) {
            var d = new Date(me.stringToDate(dateString));
            return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
        }
        return "";
    },
    secondsToNPT: function (timeInSeconds) {
        var hours = Math.floor(timeInSeconds / 3600);
        timeInSeconds -= hours * 3600;
        var tempMins = Math.floor(timeInSeconds / 60);
        var minutes = hours > 0 && tempMins < 10 ? "0" + tempMins : String(tempMins);
        var tempseconds = Math.floor(timeInSeconds) % 60;
        var seconds = (tempseconds < 10) ? "0" + tempseconds : String(tempseconds);
        return hours > 0 ? hours + ":" +minutes + ":" + seconds : minutes + ":" + seconds;
    },
    /**
     * Returns a Date object.
     * @param {String} dateString  in the format 2011-12-25 00:01:00
     */
    stringToDate: function (date) {
        var riviewdate=/^([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{2}:[0-9]{2}:[0-9]{2})$/;

        //detect the format of iview dates, and fix them so they're parsable.
        if(this.isIViewDateString(date)){
            idateparts=riviewdate.exec(date);
            //do I need to add a timezone? maybe maybe not.
            date=[idateparts[1],idateparts[2]].join("T")+"+11:00";
        }

        if (typeof date === "string") {
            date = +Date.parse(date);
        } else if (typeof date === 'number' || date instanceof Date) {
            date = +date;
        }
        return date;
    },
    /**
     * test if a string is in the iview format.
     * @param  {string}  date
     * @return {Boolean}
     */
    isIViewDateString: function (date){
        var riviewdate=/^([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{2}:[0-9]{2}:[0-9]{2})$/;
        return riviewdate.test(date);
    }
};

/**
 * @class to make api compatible with expectation of having a constructor function.
 * simply returns ABC.dateHelper;
 */
function DateHelper() {
    return ABC.dateHelper;
}
/**
 * use as a drop in replacement for the "prettydate.js" script.
 * takes a date and returns a humanistic relative time such as "2 days ago"
 * @param  {date} time
 * @return {string}
 */
function prettyDate(time) {
    return ABC.dateHelper.getPretty(time);
}

/**
 * @external Date
 */

  
/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 * This is a polyfill for the builtin ES5 date parser
 * @function external:Date.parse
 * @param  {string} Date
 * @return {date}
 */

    (function (Date) {
        var origParse = Date.parse,
            numericKeys = [1, 4, 5, 6, 7, 10, 11];
        Date.parse = function (date) {
            var timestamp, struct, minutesOffset = 0,idateparts;

            // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
            // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
            // implementations could be faster
            // 1 YYYY 2 MM 3 DD 4 HH 5 mm 6 ss 7 msec 8 Z 9 ± 10 tzHH 11 tzmm


            if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
                // avoid NaN timestamps caused by undefined values being passed to Date.UTC
                for (var i = 0, k;
                (k = numericKeys[i]); ++i) {
                    struct[k] = +struct[k] || 0;
                }
                // allow undefined days and months
                struct[2] = (+struct[2] || 1) - 1;
                struct[3] = +struct[3] || 1;
                if (struct[8] !== 'Z' && struct[9] !== undefined) {
                    minutesOffset = struct[10] * 60 + struct[11];
                    if (struct[9] === '+') {
                        minutesOffset = 0 - minutesOffset;
                    }
                }
                timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
            } else {
                timestamp = origParse ? origParse(date) : NaN;
            }
            return timestamp;
        };
    }(Date));

/**
 * End Date.parse
 */