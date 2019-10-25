import * as constants from './units.js';

export default class Convert {
    constructor(conf) {
        this.convertTable = {};
        this.unitNames = [];
        this.init();
    }

    init() {
        this.convertTable[constants.UNIT_KILOMETERS] = {
            digits: 2,
            unit: function (value) {
                        return `${value} ${constants.UNIT_KILOMETERS}`;
                    },
            convert: function (value) {
                        return value / 1000;
                    },
            revert: function (value) {
                        return value * 1000;
                    }
        };
        this.convertTable[constants.UNIT_YARDS] = {
            digits: 0,
            convert: function (value) {
                        return value * 1.0936;
                    },
            revert: function (value) {
                        return value / 1.0936;
                    }
        };
        this.convertTable[constants.UNIT_MILES] = {
            digits: 2,
            convert: function (value) {
                        return value * 0.00062137;
                    },
            revert: function (value) {
                        return value / 0.00062137;
                    }
        };
        this.convertTable[constants.UNIT_FEETS] = {
            digits: 0,
            convert: function (value) {
                        return value * 3.28084;
                    },
            revert: function (value) {
                        return value / 3.28084;
                    }
        };
        this.convertTable[constants.UNIT_METERS] = {
            digits: 0,
            convert: function (value) {
                        return value;
                    },
            revert: function (value) {
                        return value;
                    }
        };
        this.convertTable[constants.UNIT_MILES_HOUR] = {
            digits: 2,
            convert: function (value) {
                        return value / 1.609344; // 1 milla = 1.609344 km
                    },
            revert: function (value) {
                        return value * 1.609344; // 1 milla = 1.609344 km
                    }
        };
        this.convertTable[constants.UNIT_MIN_KILOMETER] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 60 / value : 0; //  1 min/km = 60 km/h
                    },
            revert: function (value) {
                        return (value) ? 60 / value : 0; // 1 milla = 1.609344 km
                    }
        };
        this.convertTable[constants.UNIT_MIN_MILE] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 96.56064 / value : 0; // 1 min/mile = 96.56064 km/h
                    },
            revert: function (value) {
                        return (value) ? 96.56064 / value : 0; // 1 min/mile = 96.56064 km/h
                    }
        };
        this.convertTable[constants.UNIT_MIN_100METERS] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 6 / value : 0;
                    },
            revert: function (value) {
                        return (value) ? 6 / value : 0;
                    }
        };
        this.convertTable[constants.UNIT_MIN_100YARDS] = {
            digits: 2,
            convert: function (value) {
                        return (value) ? 5.4864 / value : 0;
                    },
            revert: function (value) {
                        return (value) ? 5.4864 / value : 0;
                    }
        };
        this.convertTable[constants.UNIT_KILOMETERS_HOUR] = {
            digits: 2,
            convert: function (value) {
                        return value;
                    },
            revert: function (value) {
                        return value;
                    }
        };

        this.unitNames = Object.keys(this.convertTable);
    }

    digits(unit) {
        if (this.unitNames.includes(unit)) {
            var obj = this.convertTable[unit];
            if (obj.hasOwnProperty('digits')) {
                return obj.digits;
            }
        }
        return 0;
    }

    units(value, unit) {
        if (this.unitNames.includes(unit)) {
            var obj = this.convertTable[unit];
            if (obj.hasOwnProperty('unit')) {
                return obj.unit(value);
            }
        }
        return `${value} ${unit}`;
    }

    convert(value, unit) {
        if (this.unitNames.includes(unit)) {
            var obj = this.convertTable[unit];
            if (obj.hasOwnProperty('convert')) {
                return obj.convert(value);
            }
        }
        return value;
    }

    revert(value, unit) {
        if (this.unitNames.includes(unit)) {
            var obj = this.convertTable[unit];
            if (obj.hasOwnProperty('revert')) {
                return obj.revert(value);
            }
        }
        return value;
    }
}
