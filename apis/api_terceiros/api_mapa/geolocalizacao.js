// coleta a localização atual
navigator.geolocation.getCurrentPosition(position => {

    //coleta latitude e longitude
    const {latitude, longitude} = position.coords;

    // imprimindo mapa
    var map = new ol.Map({
        target: 'mapa',
        layers: [
            new ol.layer.Title({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.formLonlat([longitude, latitude]),
            zoom: 10 // aumente este número para aproximar
        })
    });
});