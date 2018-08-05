$(document).ready(function () {
    
  // splash
  $("#splash").delay("3000").slideUp("slow");
  $("#main-page").delay("3000").fadeIn("slow");
  
  // criar seções
  $("#main-page").append("<section id='all-photos' class='d-flex flex-wrap justify-content-center ali'></section>");

  $("#main-page").append("<section id='section-modal'></section>");
  
  // carregar todas as imagens na pag principal
  function showAllPhotos() {
    restaurantes.map((restaurant, index) => {
      $("#all-photos").append($("<div> <img id='img" + index + "' class='size-thumbnail rounded m-1' data-toggle='modal' data-target='#start-modal"+ index + "' alt='" + restaurant.name + "' src='" + restaurant.image + "'> </div>"));
      $("#img" + index).click(createModal(restaurant, index));
    });
  };
  showAllPhotos();
  
  // mostrar fotos filtradas
  function showFilterPhotos(restaurant, index) {
    $("#all-photos").append($("<div class='restaurant-modal text-center'> <p class='p-0 m-0'>" + restaurant.name + "</p> <img id='img" + index + "' class='size-thumbnail-2 rounded m-1' data-toggle='modal' data-target='#start-modal"+ index +"' alt=" + restaurant.name + " src=" + restaurant.image + "></div>"));
    
    $("#img" + index).click(createModal(restaurant, index));
  }

  // criar o modal
  function createModal(restaurant, index) {
    $("#section-modal").append("<div id='start-modal" + index + "' class=' modal' tabindex='-1' role='dialog'><div class='modal-dialog-centered' role='document'>        <div class='modal-content text-center'><div class='modal-header'> <h3 class='text-uppercase font-weight-bold'>" + restaurant.type + "</h3> <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><div id='" + index + "' class='restaurant-modal border rounded mb-3 p-2 d-flex flex-column align-items-center'> <h3 class='font-weight-bold'>" + restaurant.name + "</h3> <img id='img" + index + "' class='size-thumbnail-2 rounded m-1' data-toggle='modal' data-target='#start-modal" + index + "' alt=" + restaurant.name + " src=" + restaurant.image + "> <p class='text-dark mb-2'>" + restaurant.description + "</p> <button type='button' class='btn btn-warning'>Pedir Agora!</button></div>       </div></div></div></div>");
  }

  // pegar o valor do input e filtrar quando click do botão
  $("#search-button").click( function searchRestaurants(event) {
    event.preventDefault();
    
    $("#all-photos").empty();
    var resultSearch = $("#search").val();
    
    restaurantes.forEach( (restaurant, index) => {
      if (resultSearch === restaurant.name || resultSearch === restaurant.type) {
        showFilterPhotos(restaurant, index);
        myMap();
      };
    });
    resultSearch = ($("#search").val("")); 
  });
});

// GOOGLE MAPS API
function myMap() {
  
  var map = new google.maps.Map(
    document.getElementById('google-map'), {
      zoom: 15, center: {
        lat:-23.557567, lng: -46.658615
      }
    });
  
  for (var i of restaurantes) {
    var coords = [];
    coords.push(i.latitude, i.longitude)
    var address = { lat: coords[0], lng: coords[1] }
    var marker = new google.maps.Marker({
      position: address,
      animation: google.maps.Animation.DROP,
      map: map
    });
    marker.addListener('click', function () {
      const infowindow = new google.maps.InfoWindow({
        content: i.name
      });
      infowindow.open(map, marker);
    });
  }
}