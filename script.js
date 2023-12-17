const interactiveMap = L.map('map', {
    center: [48.868672, 2.342130],
    zoom: 12,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
}).addTo(interactiveMap);

let userMarker;
let userPopup;
const apiKey = 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8=';
const venueId = 'VENUE_ID';

// Get a reference to the button element
const getLocationButton = document.getElementById('getLocationButton');

// Make an API request to retrieve venue details using the API key
fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=${apiKey}&v=20211212`)
  .then(response => response.json())
  .then(data => {
    // Handle the data (e.g., display venue details)
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });


// Add a click event listener to the button
getLocationButton.addEventListener('click', async () => {
    try {
        // Use the 'await' keyword to asynchronously get the user's location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Center the map around the user's location
        interactiveMap.setView([latitude, longitude], 15);

        if (!userMarker) {
            // Create a marker at the user's location
            userMarker = L.marker([latitude, longitude]).addTo(interactiveMap);
            userPopup = L.popup().setContent('Street, City');
            userMarker.bindPopup(userPopup).openPopup();
        } else {
            // Update the marker's position
            userMarker.setLatLng([latitude, longitude]);
            userPopup.setContent('Street, City');
        }

        // Do something with the latitude and longitude
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
        // Handle errors (e.g., user denied the request or geolocation is unavailable)
        console.error(`Error getting location: ${error.message}`);
    }
});
