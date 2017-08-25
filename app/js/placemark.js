ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [53.473448, 49.480068],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        });

    myMap.geoObjects
        .add(new ymaps.Placemark([53.473448, 49.480068], {
            balloonContent: 'Плазма Плюс'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }));
}
