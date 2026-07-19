// FoodRadar — demo food data (static, for MVP visual pass)
// Replace this array with a Supabase query once the database is wired up.

const FOOD_ITEMS = [
  {
    id: "f1",
    name: "Jollof Rice & Chicken",
    vendor: "Auntie Ama's Kitchen",
    type: "Street stall",
    price: "GH₵25",
    distance: "0.3 km",
    emoji: "🍛",
    description: "Smoky one-pot rice, grilled chicken thigh, fresh pepper sauce on the side."
  },
  {
    id: "f2",
    name: "Waakye Special",
    vendor: "Adom Waakye Joint",
    type: "Street stall",
    price: "GH₵18",
    distance: "0.6 km",
    emoji: "🍚",
    description: "Rice and beans with gari, shito, boiled egg and a wedge of avocado."
  },
  {
    id: "f3",
    name: "Banku & Tilapia",
    vendor: "Riverside Grill",
    type: "Restaurant",
    price: "GH₵35",
    distance: "1.1 km",
    emoji: "🐟",
    description: "Grilled tilapia, fermented corn-and-cassava banku, pepper and onion sauce."
  },
  {
    id: "f4",
    name: "Suya Skewers",
    vendor: "Malam Suya Corner",
    type: "Street stall",
    price: "GH₵10",
    distance: "0.4 km",
    emoji: "🍢",
    description: "Spiced grilled beef skewers, rolled in yaji pepper mix, cut fresh onion."
  },
  {
    id: "f5",
    name: "Fufu & Light Soup",
    vendor: "Maame Efua's",
    type: "Home cook",
    price: "GH₵20",
    distance: "0.9 km",
    emoji: "🥣",
    description: "Pounded cassava and plantain, goat meat light soup, made to order."
  },
  {
    id: "f6",
    name: "Kelewele",
    vendor: "Nana's Kelewele Spot",
    type: "Street stall",
    price: "GH₵8",
    distance: "0.2 km",
    emoji: "🍌",
    description: "Spiced fried plantain cubes, ginger and pepper, roasted peanuts on top."
  }
];

function renderFoodCards() {
  const container = document.getElementById("food-container");
  if (!container) return;

  container.innerHTML = FOOD_ITEMS.map((item) => `
    <article class="food-card">
      <div class="food-card-top">
        <span class="food-emoji" aria-hidden="true">${item.emoji}</span>
        <span class="food-tag">${item.type}</span>
      </div>
      <h3>${item.name}</h3>
      <p class="food-vendor">${item.vendor}</p>
      <p class="food-desc">${item.description}</p>
      <div class="food-meta">
        <span class="food-price">${item.price}</span>
        <span class="food-distance">${item.distance}</span>
      </div>
      <button type="button" class="food-cta" data-food-id="${item.id}">View on map</button>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderFoodCards);
