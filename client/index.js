const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiYW1hbmRhMTEyMzU4IiwiYSI6ImNqYTl0MDlkczBscXgzMm83Z3Rtb2p2dnoifQ.Haiov-Kx6pOYih0czIwhwA";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

window.onload = function () {
  const hotelParent = document.getElementById('hotels-choices');
  const restaurantParent = document.getElementById('restaurants-choices');
  const activityParent = document.getElementById('activities-choices');

  fetch("/api/")
    .then(response => response.json())
    .then(values => {
      values[0].forEach(hotel => {
        const hotelChild = document.createElement('option');
        hotelChild.innerHTML = hotel.name;
        hotelChild.coords = hotel.place.location;
        hotelParent.append(hotelChild);
      })
      values[1].forEach(restaurant => {
        const restaurantChild = document.createElement('option');
        restaurantChild.text = restaurant.name;
        restaurantChild.coords = restaurant.place.location;
        restaurantParent.append(restaurantChild);
      })
      values[2].forEach(activity => {
        const activityChild = document.createElement('option');
        activityChild.text = activity.name;
        activityChild.coords = activity.place.location;
        activityParent.append(activityChild);
      })
  });
}

function addListItemAndMarker (dropDownId, buttonId, listParentId, markerType) {
  const dropDown = document.getElementById(dropDownId);
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (e) => {
    const selected = dropDown.options[dropDown.selectedIndex];
    const listParent = document.getElementById(listParentId);
    const listChild = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.className = 'delete-btn';
    listChild.innerHTML = `${selected.text}`;
    listChild.append(deleteButton);
    listParent.append(listChild);
    const coords = selected.coords;
    const marker = buildMarker(markerType, coords);
    marker.addTo(map);
    deleteButton.addEventListener('click', (e) => {
      listParent.removeChild(listChild);
      marker.remove();
    })
  });
}

const arr = ['hotels', 'restaurants', 'activities']
arr.forEach(item => addListItemAndMarker(`${item}-choices`, `${item}-add`, `${item}-list`, item));

// const selectHotel = document.getElementById('hotels-choices');
// const addHotel = document.getElementById('hotels-add');
// addHotel.addEventListener('click', (e) => {
//   const selectedHotel = selectHotel.options[selectHotel.selectedIndex];
//   const hotelListParent = document.getElementById('hotels-list');
//   const hotelListChild = document.createElement('li').text = selectedHotel.text;
//   hotelListParent.append(hotelListChild);
//   const hotelCoords = selectedHotel.coords;
//   const hotelMarker = buildMarker('hotels', hotelCoords);
//   hotelMarker.addTo(map);
// });

// const selectRestaurant = document.getElementById('restaurants-choices');
// const addRestaurant = document.getElementById('restaurants-add');
// addRestaurant.addEventListener('click', (e) => {
//   const selectedRestaurant = selectRestaurant.options[selectRestaurant.selectedIndex];
//   const restaurantListParent = document.getElementById('restaurants-list');
//   const restaurantListChild = document.createElement('li').text = selectedRestaurant.text;
//   restaurantListParent.append(restaurantListChild);
//   const restaurantCoords = selectedRestaurant.coords;
//   const restaurantMarker = buildMarker('restaurants', restaurantCoords);
//   restaurantMarker.addTo(map);
// });

// const selectActivity = document.getElementById('activities-choices');
// const addActivity = document.getElementById('activities-add');
// addActivity.addEventListener('click', (e) => {
//   const selectedActivity = selectActivity.options[selectActivity.selectedIndex];
//   const activityListParent = document.getElementById('activities-list');
//   const activityListChild = document.createElement('li').text = selectedActivity.text;
//   activityListParent.append(activityListChild);
//   const activityCoords = selectedActivity.coords;
//   const activityMarker = buildMarker('activities', activityCoords);
//   activityMarker.addTo(map);
// });
