import i18n from './locales.js';
import moment from 'moment'

export default class Convert {
    constructor(conf) {
        this.convertTable = {};
        this.unitNames    = [];
        this.conf         = conf;
        this.locale(conf.locale);
    }

    locale(locale) {
        this.conf.locale = locale;
        this.i18n        = i18n[locale];
        moment.locale(this.i18n.dates.locale);
        this.load();
        return this;
    }

    load() {
        let t = this.i18n.units;
        this.convertTable = {};

        this.convertTable[t.UNIT_DATE] = {
            unit: function (value) {
                        return `${value}`;
                    },
            convert: function (value) {
                        return moment.unix(value).format(t.UNIT_DATE);
                    },
            revert: function (value) {
                        return moment(value, t.UNIT_DATE).unix();
                    }
        };
        this.convertTable[t.UNIT_DATETIME] = {
            unit: function (value) {
                        return `${value}`;
                    },
            convert: function (value) {
                        return moment.unix(value).format(t.UNIT_DATETIME);
                    },
            revert: function (value) {
                        return moment(value, t.UNIT_DATE).unix();
                    }
        };
        this.convertTable[t.UNIT_DATEDAY] = {
            unit: function (value) {
                        return `${value}`;
                    },
            convert: function (value) {
                        return moment.unix(value).format(t.UNIT_DATEDAY);
                    },
            revert: function (value) {
                        return moment(value, t.UNIT_DATE).unix();
                    }
        };
        this.convertTable[t.UNIT_KILOMETERS] = {
            digits: 2,
            unit: function (value) {
                        return `${value} ${t.UNIT_KILOMETERS}`;
                    },
            convert: function (value) {
                        return value / 1000;
                    },
            revert: function (value) {
                        return value * 1000;
                    }
        };
        this.convertTable[t.UNIT_YARDS] = {
            digits: 0,
            convert: function (value) {
                        return value * 1.0936;
                    },
            revert: function (value) {
                        return value / 1.0936;
                    }
        };
        this.convertTable[t.UNIT_MILES] = {
            digits: 2,
            convert: function (value) {
                        return value * 0.00062137;
                    },
            revert: function (value) {
                        return value / 0.00062137;
                    }
        };
        this.convertTable[t.UNIT_FEETS] = {
            digits: 0,
            convert: function (value) {
                        return value * 3.28084;
                    },
            revert: function (value) {
                        return value / 3.28084;
                    }
        };
        this.convertTable[t.UNIT_MILES_HOUR] = {
            digits: 2,
            convert: function (value) {
                        return value / 1.609344; // 1 milla = 1.609344 km
                    },
            revert: function (value) {
                        return value * 1.609344; // 1 milla = 1.609344 km
                    }
        };
        this.convertTable[t.UNIT_MIN_KILOMETER] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 60 / value : 0; //  1 min/km = 60 km/h
                    },
            revert: function (value) {
                        return (value) ? 60 / value : 0; // 1 milla = 1.609344 km
                    }
        };
        this.convertTable[t.UNIT_MIN_MILE] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 96.56064 / value : 0; // 1 min/mile = 96.56064 km/h
                    },
            revert: function (value) {
                        return (value) ? 96.56064 / value : 0; // 1 min/mile = 96.56064 km/h
                    }
        };
        this.convertTable[t.UNIT_MIN_100METERS] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 6 / value : 0;
                    },
            revert: function (value) {
                        return (value) ? 6 / value : 0;
                    }
        };
        this.convertTable[t.UNIT_MIN_100YARDS] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 5.4864 / value : 0;
                    },
            revert: function (value) {
                        return (value) ? 5.4864 / value : 0;
                    }
        };
        this.convertTable[t.UNIT_KILOMETERS_HOUR] = {
            digits: 2
        };

        this.unitNames = Object.keys(this.convertTable);
    }

    digits(unit) {
        let n = this.i18n.units[unit];
        if (this.unitNames.includes(n)) {
            var obj = this.convertTable[n];
            if (obj.hasOwnProperty('digits')) {
                return obj.digits;
            }
        }
        return 0;
    }

    units(value, unit) {
        let n = this.i18n.units[unit];
        if (this.unitNames.includes(n)) {
            var obj = this.convertTable[n];
            if (obj.hasOwnProperty('unit')) {
                return obj.unit(value);
            }
        }
        return `${value} ${n}`;
    }

    convert(value, unit) {
        let n = this.i18n.units[unit];
        if (this.unitNames.includes(n)) {
            var obj = this.convertTable[n];
            if (obj.hasOwnProperty('convert')) {
                return obj.convert(value);
            }
        }
        return value;
    }

    revert(value, unit) {
        let n = this.i18n.units[unit];
        if (this.unitNames.includes(n)) {
            var obj = this.convertTable[n];
            if (obj.hasOwnProperty('revert')) {
                return obj.revert(value);
            }
        }
        return value;
    }
}
