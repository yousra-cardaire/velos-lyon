    // Initialisation de la latitude et de la longitude de la carte
let lat = 45.7578;
let lon = 4.8351;
let lyonMap = null;

// Iinitialisation de la carte
function initMap() {
    // Création de l'objet "lyonMap" et insération dans l'élément HTML qui a l'ID "map"
    lyonMap = L.map('map').setView([lat, lon], 11);
    // Cartes non récupérées (tiles) par défaut par leaflet. On précise le lieu de récupération. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(lyonMap);

}

window.onload = function(){

    initMap(); 

};
    // requête AJAX
    let xhr = new XMLHttpRequest();
 
    xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=2c6abae763f0a40668868e3e3fc3c696cb389565'); //Avec le GET, on récupère l api de JCDecaux
    
    xhr.addEventListener('load', function() {
    
        if (xhr.status >= 200 && xhr.status < 400) {
            callback(xhr.responseText);
    
        } else {
            callback(xhr.status);
        }
    });
    
    xhr.addEventListener('error', function() {
    
        console.log("erreur de connexion");
    
    });
    
    xhr.send(null);

    function callback(response) {
    response = JSON.parse(response);
    response.forEach(function (info) {


        var info_station =                                                                        //Récupération des différentes infos que l'on va placer dans le popup
        '<div>'  +
        '<ul>' +
        '<li>Station : ' + info.address + '</li>' +
        '<li>Nombre de vélos : ' + info.bike_stands + '</li>' +
        '<li>Nombre de vélos disponibles : ' + info.available_bikes + '</li>' +
        '<li>Statut de la station : ' + info.status + '</li>' +
        '</ul>' +
        '<button type="button" class="btn btn-primary onclick="Function()">Réserver</button>' + 
        '</div>'


        L.marker(                                                                                  //Ajout des marqueurs
            [info.position.lat, info.position.lng],
            {
            "jcdecauxInfo": info}           // on stocke ici toutes les infos
        ) 
        .addTo(lyonMap)                     // fonction d'appel 
        .bindPopup(info_station);
    });
}
    
