import Convert from './src/convert.js'
import Formatter from './src/formatter.js'

let cv = new Convert({
    locale: 'es'
});

console.log("Convert");
console.log('5 Metros son ' + cv.convert(5, 'UNIT_YARDS') + ' Yardas');
console.log('5.468 Yardas son ' + cv.revert(5.468, 'UNIT_YARDS') + ' Metros');
console.log('Las Yardas tienen ' + cv.digits('UNIT_YARDS') + ' dígitos');
console.log('Mostrar Yardas con unidades ' + cv.units(5.468, 'UNIT_YARDS'));


let ft = new Formatter({
    locale: 'es',
    metrics: 'international'
});

console.log("");
console.log("Formatter");
console.log('500.4343434 Metros (ciclismo) son ' + ft.formatDistance(500.4343434));
console.log('500.4343434 Metros (ciclismo) son ' + ft.formatDistance(500.4343434, false));
console.log('500.4343434 Metros (ciclismo britanico) son ' + ft.metrics('english').formatDistance(500.4343434));

ft.metrics('international').sport('swimming');

console.log('500.4343434 Metros (natación) son ' + ft.formatDistance(500.4343434));
console.log('1572176282 Timestamp son ' + ft.sport('running').formatDate(1572176282));
console.log('1572176282 Timestamp (en inglés) son ' + ft.locale('en').formatDateTime(1572176282));
console.log('1572176282 Timestamp (en inglés) son ' + ft.formatDateDay(1572176282));
