// =================================
// FOODRADAR APP.JS
// =================================

console.log("FoodRadar is running 🚀");


// Food database (temporary)

const foods = [

{
    name: "Waakye",
    image: "assets/waakye.jpg",
    description: "Traditional Ghanaian rice and beans",
    price: "30 GHS",
    distance: "500m"
},

{
    name: "Fufu & Light Soup",
    image: "assets/fufu.jpg",
    description: "Authentic Ghanaian traditional meal",
    price: "40 GHS",
    distance: "800m"
},

{
    name: "Jollof Rice",
    image: "assets/jollof.jpg",
    description: "Popular African rice dish",
    price: "35 GHS",
    distance: "1km"
},

{
    name: "Kelewele",
    image: "assets/kelewele.jpg",
    description: "Spicy fried plantain",
    price: "10 GHS",
    distance: "300m"
}

];


// Wait for page to load (IMPORTANT FIX)

document.addEventListener("DOMContentLoaded", function () {

    const foodContainer = document.getElementById("food-container");

    // Check if container exists (avoid errors on other pages)
    if (!foodContainer) return;


    foods.forEach(food => {

        const card = document.createElement("div");

        card.classList.add("food-card");


        card.innerHTML = `

            <img src="${food.image}" alt="${food.name}">

            <h3>${food.name}</h3>

            <p>${food.description}</p>

            <div class="info">

                <span>${food.price}</span>

                <span>📍 ${food.distance}</span>

            </div>

            <button>View Food</button>

        `;

        foodContainer.appendChild(card);

    });

});
// =================================
// FOODRADAR LEAFLET MAP
// =================================

const map = L.map('map').setView([6.6885, -1.6244], 13); 
// Kumasi coordinates

// 🌍 OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// 🍛 Fake FoodRadar locations (MVP)
const foodPlaces = [
    {
        name: "Waakye Spot",
        lat: 6.6885,
        lng: -1.6244,
        food: "Waakye"
    },
    {
        name: "Fufu Kitchen",
        lat: 6.6950,
        lng: -1.6300,
        food: "Fufu & Light Soup"
    },
    {
        name: "Jollof Center",
        lat: 6.6800,
        lng: -1.6200,
        food: "Jollof Rice"
    },
    {
        name: "Kelewele Street",
        lat: 6.6905,
        lng: -1.6150,
        food: "Kelewele"
    }
];


// 📍 Add markers
foodPlaces.forEach(place => {

    const marker = L.marker([place.lat, place.lng]).addTo(map);

    marker.bindPopup(`
        <b>${place.food}</b><br>
        ${place.name}<br><br>
        <button onclick="alert('Open Food Page later 🚀')">
            View Food
        </button>
    `);

});
