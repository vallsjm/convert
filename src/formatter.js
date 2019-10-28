import Convert from './convert.js';

export default class Formatter extends Convert {
    constructor(conf) {
        const params = {
            locale: 'es',
            sport: 'ciclyng',
            metrics: 'international'
        };

        conf = Object.assign(params, conf);
        super(conf);
    }

    sport(sport) {
        this.conf.sport = sport;
        return this;
    }

    metrics(metrics) {
        this.conf.metrics = metrics;
        return this;
    }

    selectUnit(parameter) {
        var expression = parameter + '.' + this.conf.sport + '.' + this.conf.metrics;
        var rules = {
             'date\.date\..*'                    : 'UNIT_DATE',
             'date\.datetime\..*'                : 'UNIT_DATETIME',
             'date\.dateday\..*'                 : 'UNIT_DATEDAY',
             'duration\..*'                      : 'UNIT_HOURS', // 0:00 h
             'duration\.minutes\..*'             : 'UNIT_MINUTES', // 00 min.
             'duration\.minutes-sec\..*'         : 'UNIT_MINUTES_SEC', // 00:00
             'distance\.[^\.]+\.english'         : 'UNIT_MILES', // Millas
             'distance\.[^\.]+\.international'   : 'UNIT_KILOMETERS', // Kilometros
             'distance\.swimming\.english'       : 'UNIT_YARDS', // Yardas
             'distance\.swimming\.international' : 'UNIT_METERS', // metros
             'incline\.[^\.]+\.english'          : 'UNIT_FEETS', // Yardas
             'incline\.[^\.]+\.international'    : 'UNIT_METERS', // metros
             'elevation\.[^\.]+\.english'        : 'UNIT_FEETS', // Yardas
             'elevation\.[^\.]+\.international'  : 'UNIT_METERS', // metros
             'speed\.[^\.]+\.english'            : 'UNIT_MILES_HOUR',
             'speed\.[^\.]+\.international'      : 'UNIT_KILOMETERS_HOUR',
             'speed\.swimming\.english'          : 'UNIT_MIN_100YARDS',
             'speed\.swimming\.international'    : 'UNIT_MIN_100METERS',
             'speed\.running\.english'           : 'UNIT_MIN_MILE',
             'speed\.running\.international'     : 'UNIT_MIN_KILOMETER',
             'power\..*'                         : 'UNIT_WATTS',
             'cadence\..*'                       : 'UNIT_RPM',
             'hr\..*'                            : 'UNIT_PPM',
             'calories\..*'                      : 'UNIT_KCAL',
             'tss\..*'                           : 'UNIT_TSS',
             'ctl\..*'                           : 'UNIT_CTL',
             'atl\..*'                           : 'UNIT_ATL',
             'tsb\..*'                           : 'UNIT_TSB',
             'ema\..*'                           : 'UNIT_EMA',
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

    universalNumber(number, decimal = 0, zero = true) {
        if ((!zero) && (!number || number == 0)) return '';
        number = (!number) ? 0 : number;
    	var frac = (number - parseInt(number)) * (10 * decimal);
        if ((!zero) && ((parseInt(frac) == 0) && (parseInt(number) == 0))) return '';
    	var formatter = new Intl.NumberFormat(this.i18n.numbers.locale, {
    	  style: 'decimal',
    	  minimumFractionDigits: (frac > 1) ? decimal : 0,
    	  maximumFractionDigits: (frac > 1) ? decimal : 0,
    	});
    	var frm = formatter.format(number);
        var n = frm.replace(',','').replace('.','').replace(' ','');
        if ((!zero) && (parseFloat(n) == 0)) return '';
    	return frm.trim();
    }

    formatDate(timestamp, showUnits = true) {
        var unit          = this.selectUnit('date.date');
        var formatted     = this.convert(timestamp, unit);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatDateTime(timestamp, showUnits = true) {
        var unit          = this.selectUnit('date.datetime');
        var formatted     = this.convert(timestamp, unit);
        return (showUnits) ? this.units(formatted, unit) : formatted;
    }

    formatDateDay(timestamp, showUnits = true) {
        var unit          = this.selectUnit('date.dateday');
        var formatted     = this.convert(timestamp, unit);
        return (showUnits) ? this.units(formatted, unit) : formatted;
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
