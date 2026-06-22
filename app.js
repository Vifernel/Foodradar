console.log("FoodRadar is running 🚀");


// =================================
// FOOD DATABASE (MVP)
// =================================

const foods = [
{
    id: 1,
    name: "Waakye",
    image: "assets/waakye.jpg",
    description: "Traditional Ghanaian rice and beans",
    price: "30 GHS",
    distance: "500m"
},
{
    id: 2,
    name: "Fufu & Light Soup",
    image: "assets/fufu.jpg",
    description: "Authentic Ghanaian traditional meal",
    price: "40 GHS",
    distance: "800m"
},
{
    id: 3,
    name: "Jollof Rice",
    image: "assets/jollof.jpg",
    description: "Popular African rice dish",
    price: "35 GHS",
    distance: "1km"
},
{
    id: 4,
    name: "Kelewele",
    image: "assets/kelewele.jpg",
    description: "Spicy fried plantain",
    price: "10 GHS",
    distance: "300m"
}
];


// =================================
// GPS USER (REAL)
// =================================

let userLocation = null;

function getUserLocation(callback) {

    if (!navigator.geolocation) {
        alert("GPS not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            callback(userLocation);
        },
        (error) => {
            console.log("GPS error:", error);
            alert("Please enable location to use FoodRadar 📍");
        }
    );
}


// =================================
// DISTANCE CALCULATOR (REAL)
// =================================

function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}


// =================================
// FOOD CARDS RENDERING
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const foodContainer = document.getElementById("food-container");

    if (!foodContainer) return;

    foods.forEach((food) => {

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

            <button onclick="viewFood(${food.id})">
                View Food
            </button>
        `;

        foodContainer.appendChild(card);
    });
});


// =================================
// VIEW FOOD NAVIGATION
// =================================

function viewFood(id) {
    window.location.href = "food.html?id=" + id;
}


// =================================
// LEAFLET MAP + GPS + NEAR ME
// =================================

if (document.getElementById("map") && typeof L !== "undefined") {

    getUserLocation((pos) => {

        // MAP CENTER ON USER
        const map = L.map('map').setView([pos.lat, pos.lng], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);


        // USER MARKER
        L.marker([pos.lat, pos.lng])
            .addTo(map)
            .bindPopup("📍 You are here")
            .openPopup();


        // FOOD PLACES (REAL COORDINATES BASE)
        const foodPlaces = [
            {
                id: 1,
                name: "Waakye Spot",
                lat: 6.6885,
                lng: -1.6244,
                food: "Waakye",
                image: "assets/waakye.jpg"
            },
            {
                id: 2,
                name: "Fufu Kitchen",
                lat: 6.6950,
                lng: -1.6300,
                food: "Fufu & Light Soup",
                image: "assets/fufu.jpg"
            },
            {
                id: 3,
                name: "Jollof Center",
                lat: 6.6800,
                lng: -1.6200,
                food: "Jollof Rice",
                image: "assets/jollof.jpg"
            },
            {
                id: 4,
                name: "Kelewele Street",
                lat: 6.6905,
                lng: -1.6150,
                food: "Kelewele",
                image: "assets/kelewele.jpg"
            }
        ];


        // MARKERS + POPUPS
        foodPlaces.forEach(place => {

            const distance = getDistance(
                pos.lat,
                pos.lng,
                place.lat,
                place.lng
            );

            const marker = L.marker([place.lat, place.lng]).addTo(map);

            marker.bindPopup(`
                <div style="width:200px">

                    <img 
                        src="${place.image}" 
                        style="width:100%; height:120px; object-fit:cover; border-radius:10px;"
                    >

                    <h3 style="margin:5px 0">${place.food}</h3>

                    <p style="margin:0; font-size:12px">
                        📍 ${place.name}
                    </p>

                    <p style="margin:5px 0; font-weight:bold">
                        🚶 ${distance.toFixed(2)} km away
                    </p>

                    <button 
                        onclick="viewFood(${place.id})"
                        style="
                            background:#ff6b35;
                            color:white;
                            border:none;
                            padding:8px;
                            width:100%;
                            border-radius:8px;
                            cursor:pointer;
                            margin-top:5px;
                        "
                    >
                        View Food 🍛
                    </button>

                </div>
            `);

        });

    });
}
