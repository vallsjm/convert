import i18n from './src/locale/es.js'
import Convert from './src/convert.js'
import Formatter from './src/formatter.js'

let cv = new Convert(i18n);

console.log("Convert");
console.log('5 Metros son ' + cv.convert(5, 'UNIT_YARDS') + ' Yardas');
console.log('5.468 Yardas son ' + cv.revert(5.468, 'UNIT_YARDS') + ' Metros');
console.log('Las Yardas tienen ' + cv.digits('UNIT_YARDS') + ' dígitos');
console.log('Mostrar Yardas con unidades ' + cv.units(5.468, 'UNIT_YARDS'));


let ft = new Formatter(i18n, {
    sport: 'ciclyng',
    units: 'international'
});

console.log("");
console.log("Formatter");
console.log('500.4343434 Metros (ciclismo) son ' + ft.formatDistance(500.4343434));
console.log('500.4343434 Metros (ciclismo) son ' + ft.formatDistance(500.4343434, false));

ft.configure({
    units: 'english'
})

console.log('500.4343434 Metros (ciclismo britanico) son ' + ft.formatDistance(500.4343434));

ft.configure({
    sport: 'swimming',
    units: 'international'
})

console.log('500.4343434 Metros (natación) son ' + ft.formatDistance(500.4343434));
console.log('1572176282 Timestamp son ' + ft.formatDate(1572176282));
console.log('1572176282 Timestamp son ' + ft.formatDateTime(1572176282));
console.log('1572176282 Timestamp son ' + ft.formatDateDay(1572176282));