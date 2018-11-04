$(document).ready(() => {
  splash()
  showAllPhotos();
  restaurantsAutoComplete()
  handleClick()
});

function splash() {
  $("#splash").delay("3000").slideUp("slow");
  $("#main-page").delay("3000").fadeIn("slow");
}
// autocomplete
function restaurantsAutoComplete() {
  let arrRestaurants = [];
  restaurantes.map((restaurant) => {
    arrRestaurants.push(restaurant.name)
    arrRestaurants.push(restaurant.type)
  });
  arrRestaurants = arrRestaurants.filter((x, y) => {
    return arrRestaurants.indexOf(x) === y;
  });
  $("#search").autocomplete({
    source: arrRestaurants
  });
}
function handleClick() {
  $("#search-button").click(searchRestaurants);
}
function searchRestaurants(event) {
  event.preventDefault();
  let resultSearch = $("#search").val();
  if (resultSearch === "") {
    alert("Busque algum restaurante ou cozinha!");
  } else {
    $("#photos").empty();
    showFilterPhotos()
  }
  resultSearch = $("#search").val("");
}
// carregar todas imagens na pag principal
function showAllPhotos() {
  restaurantes.forEach((restaurant, index) => {
    renderPhotos(restaurant, index)
  });
};
// carregar apenas imagens correspondentes ao filtro
function showFilterPhotos() {
  let resultSearch = $("#search").val();
  restaurantes.filter((restaurant, index) => {
    if (resultSearch === restaurant.name || resultSearch === restaurant.type) {
      renderPhotos(restaurant, index);           
    };
  });
}
// mostrar imagens
function renderPhotos(restaurant, index) {
  $("#photos").append(`
      <div>
        <img  id=${"img" + index} 
              class="size-thumbnail rounded m-1" 
              data-toggle="modal" 
              data-target=${"#start-modal" + index}
              alt=${restaurant.name} 
              src=${restaurant.image}
        /> 
        </div>
      `
  );
  $("#img" + index).click(createModal(restaurant, index));
}
// criar o modal
function createModal(restaurant, index) {
  $("#section-modal").append(`
      <div  id=${"start-modal" + index} class="modal" tabindex="-1" role="dialog">
        <div  class="modal-dialog-centered" role="document">        
          <div class="modal-content text-center">
            <div class="modal-header"> 
              <h3 class="text-uppercase font-weight-bold">
                ${restaurant.type}
              </h3> 
              <button type="button" class="close"data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">
                &times;
              </span>
              </button>
            </div>
            <div class="modal-body">
              <div id=${index} class="restaurant-modal border rounded mb-3 p-2 d-flex flex-column align-items-center">
                <h3 class="font-weight-bold">
                ${restaurant.name}
                </h3>
                <img id=${"img" + index} class="size-thumbnail-2 rounded m-1" data-toggle="modal" data-target=${"#start-modal" + index} alt=${restaurant.name} src=${restaurant.image}> 
                <p class="text-dark mb-2">
                  ${restaurant.description}
                </p> 
                <button type="button" class="btn btn-warning">
                  Pedir Agora!
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  `);
}
// GOOGLE MAPS API
function myMap() {
  const map = new google.maps.Map(
    document.getElementById("google-map"), {
      zoom: 15, 
      center: {
        lat: -23.557567, 
        lng: -46.658615
      }
  });
  restaurantes.forEach((i) => {
    let coords = [];
    coords.push(i.latitude, i.longitude)
    let address = { lat: coords[0], lng: coords[1] }
    let marker = new google.maps.Marker({
      position: address,
      animation: google.maps.Animation.DROP,
      map: map
    });
    $(marker).click(() => {
      const infowindow = new google.maps.InfoWindow({
        content: i.name
      });
      infowindow.open(map, marker);
    });
  })  
}