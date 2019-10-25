import Convert from './convert.js';
import * as constants from './units.js';

export default class Formatter extends Convert {
    constructor(conf) {
        super(conf);
        this.conf = Object.assign({
            sport: null,
            locale: null,
            units: null
        }, conf);
    }

    selectUnit(parameter) {
        var expression = parameter + '.' + this.conf.sport + '.' + this.conf.units;
        var rules = {
             'duration\..*'                      : constants.UNIT_HOURS, // 0:00 h
             'duration\.minutes\..*'             : constants.UNIT_MINUTES, // 00 min.
             'duration\.minutes-sec\..*'         : constants.UNIT_MINUTES_SEC, // 00:00
             'distance\.[^\.]+\.english'         : constants.UNIT_MILES, // Millas
             'distance\.[^\.]+\.international'   : constants.UNIT_KILOMETERS, // Kilometros
             'distance\.swimming\.english'       : constants.UNIT_YARDS, // Yardas
             'distance\.swimming\.international' : constants.UNIT_METERS, // metros
             'incline\.[^\.]+\.english'          : constants.UNIT_FEETS, // Yardas
             'incline\.[^\.]+\.international'    : constants.UNIT_METERS, // metros
             'elevation\.[^\.]+\.english'        : constants.UNIT_FEETS, // Yardas
             'elevation\.[^\.]+\.international'  : constants.UNIT_METERS, // metros
             'speed\.[^\.]+\.english'            : constants.UNIT_MILES_HOUR,
             'speed\.[^\.]+\.international'      : constants.UNIT_KILOMETERS_HOUR,
             'speed\.swimming\.english'          : constants.UNIT_MIN_100YARDS,
             'speed\.swimming\.international'    : constants.UNIT_MIN_100METERS,
             'speed\.running\.english'           : constants.UNIT_MIN_MILE,
             'speed\.running\.international'     : constants.UNIT_MIN_KILOMETER,
             'power\..*'                         : constants.UNIT_WATTS,
             'cadence\..*'                       : constants.UNIT_RPM,
             'hr\..*'                            : constants.UNIT_PPM,
             'calories\..*'                      : constants.UNIT_KCAL,
             'tss\..*'                           : constants.UNIT_TSS,
             'ctl\..*'                           : constants.UNIT_CTL,
             'atl\..*'                           : constants.UNIT_ATL,
             'tsb\..*'                           : constants.UNIT_TSB,
             'ema\..*'                           : constants.UNIT_EMA,
        };
        var ret = '';
        var format = expression.toLowerCase();
        for (var rule in rules) {
            if (format.match(new RegExp(rule))) {
                ret = rules[rule];
            }
        }
        return ret;
    }

    universalNumber = function(number, decimal = 0, zero = true) {
        if ((!zero) && (!number || number == 0)) return '';
        number = (!number) ? 0 : number;
    	var frac = (number - parseInt(number)) * (10 * decimal);
        if ((!zero) && ((parseInt(frac) == 0) && (parseInt(number) == 0))) return '';
    	var formatter = new Intl.NumberFormat('es-ES', {
    	  style: 'decimal',
    	  minimumFractionDigits: (frac > 1) ? decimal : 0,
    	  maximumFractionDigits: (frac > 1) ? decimal : 0,
    	});
    	var frm = formatter.format(number);
        var n = frm.replace(',','').replace('.','').replace(' ','');
        if ((!zero) && (parseFloat(n) == 0)) return '';
    	return frm.trim();
    }

    formatDate(timestamp) {
    	return moment.unix(timestamp).format("DD-MM-YYYY");
    }

    formatDateTime(timestamp) {
    	return moment.unix(timestamp).format("DD-MM-YYYY HH:mm");
    }

    formatDateDay(timestamp) {
    	return moment.unix(timestamp).format("ddd<br>DD MMM");
    }

    formatDistance(meters = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('distance');
        var digits    = this.digits(unit);
        var num       = this.convert(meters, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatIncline(meters = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('incline');
        var digits    = this.digits(unit);
        var num       = this.convert(meters, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatElevation(meters = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('elevation');
        var digits    = this.digits(unit);
        var num       = this.convert(meters, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatSpeed(kilometers_hour = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('speed');
        var digits    = this.digits(unit);
        var num       = this.convert(kilometers_hour, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatCadence(rpm = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('cadence');
        var digits    = this.digits(unit);
        var num       = this.convert(rpm, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatPower(watts = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('power');
        var digits    = this.digits(unit);
        var num       = this.convert(watts, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatCalories(kcal = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('calories');
        var digits    = this.digits(unit);
        var num       = this.convert(kcal, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatTSS(tss = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('tss');
        var digits    = this.digits(unit);
        var num       = this.convert(tss, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatCTL(ctl = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('ctl');
        var digits    = this.digits(unit);
        var num       = this.convert(ctl, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatATL(atl = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('atl');
        var digits    = this.digits(unit);
        var num       = this.convert(atl, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatTSB(tsb = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('atl');
        var digits    = this.digits(unit);
        var num       = this.convert(tsb, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatHr(ppm = 0, showUnits = true, showZero = true) {
        var unit      = this.selectUnit('hr');
        var digits    = this.digits(unit);
        var num       = this.convert(ppm, unit);
        var formatted = this.universalNumber(num, digits, showZero);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

}
