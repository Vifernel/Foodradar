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
// FOOD CARDS RENDERING
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const foodContainer = document.getElementById("food-container");

    if (foodContainer) {

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
    }
});


// =================================
// VIEW FOOD NAVIGATION
// =================================

function viewFood(id) {
    window.location.href = "food.html?id=" + id;
}


// =================================
// LEAFLET MAP (SAFE VERSION)
// =================================

if (document.getElementById("map") && typeof L !== "undefined") {

    const map = L.map('map').setView([6.6885, -1.6244], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    const foodPlaces = [
        { id: 1, name: "Waakye Spot", lat: 6.6885, lng: -1.6244, food: "Waakye" },
        { id: 2, name: "Fufu Kitchen", lat: 6.6950, lng: -1.6300, food: "Fufu & Light Soup" },
        { id: 3, name: "Jollof Center", lat: 6.6800, lng: -1.6200, food: "Jollof Rice" },
        { id: 4, name: "Kelewele Street", lat: 6.6905, lng: -1.6150, food: "Kelewele" }
    ];


    foodPlaces.forEach(place => {

        const marker = L.marker([place.lat, place.lng]).addTo(map);

        marker.bindPopup(`
            <b>${place.food}</b><br>
            ${place.name}<br><br>

            <button onclick="viewFood(${place.id})">
                View Food 🍛
            </button>
        `);

    });
}
