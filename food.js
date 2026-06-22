// =================================
// FOODRADAR - FOOD DETAILS PAGE
// =================================

const foods = [

{
    id: 1,
    name: "Waakye",
    image: "assets/waakye.jpg",
    description: "Traditional Ghanaian rice and beans served with spaghetti, egg, and sauce.",
    price: "30 GHS",
    vendor: "Mama's Kitchen",
    phone: "+233000000000",
    location: "Kumasi"
},

{
    id: 2,
    name: "Fufu & Light Soup",
    image: "assets/fufu.jpg",
    description: "Soft cassava dough served with light soup and meat or fish.",
    price: "40 GHS",
    vendor: "Local Food Spot",
    phone: "+233000000000",
    location: "Kumasi"
},

{
    id: 3,
    name: "Jollof Rice",
    image: "assets/jollof.jpg",
    description: "Spicy tomato-based rice dish loved across Africa.",
    price: "35 GHS",
    vendor: "Royal Taste",
    phone: "+233000000000",
    location: "Kumasi"
},

{
    id: 4,
    name: "Kelewele",
    image: "assets/kelewele.jpg",
    description: "Spicy fried plantain cubes served as snack or side dish.",
    price: "10 GHS",
    vendor: "Street Vendor",
    phone: "+233000000000",
    location: "Kumasi"
}

];


// ================================
// GET FOOD ID FROM URL
// ================================

const params = new URLSearchParams(window.location.search);
const foodId = parseInt(params.get("id"));

const container = document.getElementById("food-details");

const food = foods.find(f => f.id === foodId);


// ================================
// DISPLAY FOOD DETAILS
// ================================

if (food && container) {

    container.innerHTML = `
    
        <img src="${food.image}" alt="${food.name}">

        <div class="food-details-content">

            <h2>${food.name}</h2>

            <p>${food.description}</p>

            <p><strong>Price:</strong> ${food.price}</p>

            <p><strong>Vendor:</strong> ${food.vendor}</p>

        </div>

        <div class="food-actions">

            <a class="btn-map" href="https://www.google.com/maps?q=${food.location}" target="_blank">
                📍 Get Directions
            </a>

            <a class="btn-call" href="tel:${food.phone}">
                📞 Call Vendor
            </a>

        </div>

    `;
}
