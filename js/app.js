// Initialisation de la latitude et de la longitude de la carte
let lat = 45.7578;
let lon = 4.8351;
let map = null;

// Initialisation de la carte
function initMap() {
    // Création de l'objet "map" que l'on insère dans la div avec l'ID "map"
    map = L.map('map').setView([lat, lon], 12);
    // Cartes non récupérées (tiles) par défaut par leaflet. On précise le lieu de récupération. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(map);

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

    function Reserver(){
          console.log("réservation");
        }
    
    xhr.send(null);

    function callback(response) {
    response = JSON.parse(response);
    response.forEach(function (info) {

        var info_station =                                                                        //Récupération des différentes infos que l'on va placer dans le popup
        '<div>'  +
        '<ul>' +
        '<li>Station : ' + info.address + '</li>' +
        '<li>Nombre de vélos : ' + info.bike_stands + '</li>' +
        '<li>Vélos disponibles : ' + info.available_bikes + '</li>' +
        '</ul>' +
        '<button type="button" class="btn" onclick="Reserver()">Réserver</button>' + 
        '</div>'
        
        
        L.marker(                                                                                  //Ajout des marqueurs
            [info.position.lat, info.position.lng],
            {
            "jcdecauxInfo": info}           // on stocke ici toutes les infos
        ) 
        .addTo(map)                     // fonction d'appel 
        .bindPopup(info_station);
    });
}
    
