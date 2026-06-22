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


    // 🍛 FOOD PLACES (UPDATED VERSION)
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


    // 📍 MARKERS + POPUP PRO
    foodPlaces.forEach(place => {

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
                    ⭐ Popular Ghanaian dish
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

}
