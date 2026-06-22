console.log("Vendor dashboard loaded");

// =================================
// LOAD VENDOR FOODS
// =================================

let foods = JSON.parse(localStorage.getItem("vendorFoods")) || [];


// =================================
// ADD FOOD (UPLOAD SYSTEM)
// =================================

function addFood() {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("desc").value;

    if (!name || !price || !image) {
        alert("Please fill all required fields");
        return;
    }

    const newFood = {
        id: Date.now(),
        name,
        price,
        image,
        description,
        lat: 6.6885,
        lng: -1.6244
    };

    foods.push(newFood);
    localStorage.setItem("vendorFoods", JSON.stringify(foods));

    alert("Food uploaded 🚀");

    renderFoods();
}


// =================================
// RENDER DASHBOARD FOODS
// =================================

function renderFoods() {

    const container = document.getElementById("myFoods");
    if (!container) return;

    container.innerHTML = "";

    foods.forEach(food => {

        container.innerHTML += `
            <div class="food-item">
                <img src="${food.image}" width="100">
                <h3>${food.name}</h3>
                <p>${food.price}</p>
            </div>
        `;
    });
}


// =================================
// INIT
// =================================

document.addEventListener("DOMContentLoaded", renderFoods);
