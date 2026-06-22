console.log("FoodRadar is running 🚀");


// =================================
// FOOD DATABASE (MVP + FUTURE READY)
// =================================

const defaultFoods = [
{
    id: 1,
    name: "Waakye",
    image: "assets/waakye.jpg",
    description: "Traditional Ghanaian rice and beans",
    price: "30 GHS",
    lat: 6.6885,
    lng: -1.6244
},
{
    id: 2,
    name: "Fufu & Light Soup",
    image: "assets/fufu.jpg",
    description: "Authentic Ghanaian traditional meal",
    price: "40 GHS",
    lat: 6.6950,
    lng: -1.6300
},
{
    id: 3,
    name: "Jollof Rice",
    image: "assets/jollof.jpg",
    description: "Popular African rice dish",
    price: "35 GHS",
    lat: 6.6800,
    lng: -1.6200
},
{
    id: 4,
    name: "Kelewele",
    image: "assets/kelewele.jpg",
    description: "Spicy fried plantain",
    price: "10 GHS",
    lat: 6.6905,
    lng: -1.6150
}
];


// =================================
// VENDEUR FOODS (LOCAL STORAGE)
// =================================

let vendorFoods = JSON.parse(localStorage.getItem("vendorFoods")) || [];
const allFoods = [...defaultFoods, ...vendorFoods];


// =================================
// GPS USER (SAFE + FALLBACK)
// =================================

let userLocation = null;

function getUserLocation(success, errorCallback) {

    if (!navigator.geolocation) {
        if (errorCallback) errorCallback();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            success(userLocation);
        },
        (error) => {
            console.log("GPS error:", error);
            if (errorCallback) errorCallback();
        }
    );
}


// =================================
// DISTANCE CALCULATOR
// =================================

function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


// =================================
// FOOD CARDS (HOME PAGE)
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const foodContainer = document.getElementById("food-container");
    if (!foodContainer) return;

    allFoods.forEach((food) => {

        const card = document.createElement("div");
        card.classList.add("food-card");

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>${food.description}</p>

            <div class="info">
                <span>${food.price}</span>
                <span>📍 Nearby</span>
            </div>

            <button onclick="viewFood(${food.id})">
                View Food
            </button>
        `;

        foodContainer.appendChild(card);
    });
});


// =================================
// NAVIGATION
// =================================

function viewFood(id) {
    window.location.href = "food.html?id=" + id;
}


// =================================
// MAP (UBER EATS STYLE + GPS SAFE)
// =================================

function initMap(lat = 6.6885, lng = -1.6244) {

    const map = L.map('map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // USER MARKER
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 You are here")
        .openPopup();

    // FOOD MARKERS
    defaultFoods.forEach(place => {

        const distance = getDistance(lat, lng, place.lat, place.lng);

        const marker = L.marker([place.lat, place.lng]).addTo(map);

        marker.bindPopup(`
            <div style="width:200px">

                <img src="${place.image}"
                    style="width:100%;height:120px;object-fit:cover;border-radius:10px;">

                <h3>${place.name}</h3>

                <p>📍 ${place.name}</p>

                <p>🚶 ${distance.toFixed(2)} km away</p>

                <button onclick="viewFood(${place.id})"
                    style="background:#ff6b35;color:white;border:none;padding:8px;width:100%;border-radius:8px;">
                    View Food 🍛
                </button>

            </div>
        `);
    });
}


// =================================
// START MAP SAFE
// =================================

if (document.getElementById("map") && typeof L !== "undefined") {

    getUserLocation(
        (pos) => initMap(pos.lat, pos.lng),
        () => initMap()
    );
}
