$(document).ready(function () {
    
  // splash
  $("#splash").delay("3000").slideUp("slow");
  $("#main-page").delay("3000").fadeIn("slow");
  
  $("#main-page").append("<section id='all-photos' class='d-flex flex-wrap justify-content-center ali'></section>");
  
  // carregar todas as imagens na pag principal
  function showAllPhotos() {
    restaurantes.filter((restaurant) => {
      $("#all-photos").append($("<div><a href='#' data-toggle='modal' data-target='.start-modal'><img class='size-thumbnail rounded m-1' alt=" + restaurant.name + " src=" + restaurant.image + "></a></div>"));
    });
  };
  showAllPhotos();
  
  // mostrar fotos filtradas
  function showFilterPhotos(restaurant, index) {
    $("#all-photos").append($("<div class='restaurant-modal text-center'><a href='#' data-toggle='modal' data-target='.start-modal'><p>" + restaurant.name + "</p><img class='size-thumbnail-2 rounded m-1' alt=" + restaurant.name + " src=" + restaurant.image + "></a></div>")); 
    
    $("#all-photos").click(createModal(restaurant, index));
  }

  // criar o modal
  function createModal(restaurant, index) {
    $(".modal-body").append("<div id=" + index + " class='restaurant-modal border rounded mb-3 p-2 d-flex flex-column align-items-center'> <h2 class='restaurant-name text-warning font-weight-bold'>" + restaurant.name + "</h2> <p class='text-dark mb-2'>" + restaurant.description + "</p><button type='button' class='btn btn-warning'>Pedir Agora!</button></div>");
  }

  // pegar o valor do input e filtrar quando click do botão
  $("#search-button").click( function searchRestaurants(event) {
    event.preventDefault();
    
    $("#all-photos").empty();
    $(".restaurant-modal").empty();
    $(".modal-body").empty();
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