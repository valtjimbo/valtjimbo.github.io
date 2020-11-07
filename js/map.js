
var map = L.map('body_mapa').setView([40.429672, -3.732278], 11);

var tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

tiles.addTo(map);

var markerGroup = L.featureGroup().addTo(map);

// custom icon
var customIcon = L.Icon.extend({
        iconSize:     [28, 28], 
        shadowSize:   [50, 64], 
        iconAnchor:   [19, 38], 
        shadowAnchor: [4, 62],  
        popupAnchor:  [-3, -76], 
});


var utadicon = new customIcon({iconUrl: './images/logo-u-tad.png', iconSize: [28, 28]}),
    popularicon = new customIcon({iconUrl: './images/banco-popular.png', iconSize: [28, 28]}),
    santandericon1 = new customIcon({iconUrl: './images/santander.png', iconSize: [28, 28]});
    santandericon2 = new customIcon({iconUrl: './images/santander.png', iconSize: [28, 28]});
    colegioicon = new customIcon({iconUrl: './images/colegio.png', iconSize: [42, 42]});
    uniicon = new customIcon({iconUrl: './images/uni.png', iconSize: [28, 28]});

L.icon = function (options) {
    return new L.Icon(options);
};

L.marker([40.539260, -3.893021], {icon: utadicon, opacity: 0.5,}).addTo(markerGroup).bindPopup("Actualmente cursando Master en Big Data en la U-Tad");
L.marker([40.493390, -3.875997], {icon: popularicon, opacity: 0.5,}).addTo(markerGroup).bindPopup("Primer trabajo en Banco Popular");
L.marker([40.448292, -3.632294], {icon: santandericon1, opacity: 0.5,}).addTo(markerGroup).bindPopup("Trabajo en Banco Santander Préstamos Sindicados MRG");
L.marker([40.467643, -3.658809], {icon: santandericon2, opacity: 0.5,}).addTo(markerGroup).bindPopup("Trabajo como becario en Banco Santander");
L.marker([40.432697, -3.695746], {icon: colegioicon, opacity: 0.5,}).addTo(markerGroup).bindPopup("Instituto");
L.marker([40.314939, -3.726582], {icon: uniicon, opacity: 0.5,}).addTo(markerGroup).bindPopup("Graduado en Universidad Carlos III");
