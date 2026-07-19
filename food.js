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
    description: "Smoky one-pot rice, grilled chicken thigh, fresh pepper sauce on the side.",
    lat: 6.6912, lng: -1.6244,
    phone: "+233241000001"
  },
  {
    id: "f2",
    name: "Waakye Special",
    vendor: "Adom Waakye Joint",
    type: "Street stall",
    price: "GH₵18",
    distance: "0.6 km",
    emoji: "🍚",
    description: "Rice and beans with gari, shito, boiled egg and a wedge of avocado.",
    lat: 6.6858, lng: -1.6198,
    phone: "+233241000002"
  },
  {
    id: "f3",
    name: "Banku & Tilapia",
    vendor: "Riverside Grill",
    type: "Restaurant",
    price: "GH₵35",
    distance: "1.1 km",
    emoji: "🐟",
    description: "Grilled tilapia, fermented corn-and-cassava banku, pepper and onion sauce.",
    lat: 6.6947, lng: -1.6301,
    phone: "+233241000003"
  },
  {
    id: "f4",
    name: "Suya Skewers",
    vendor: "Malam Suya Corner",
    type: "Street stall",
    price: "GH₵10",
    distance: "0.4 km",
    emoji: "🍢",
    description: "Spiced grilled beef skewers, rolled in yaji pepper mix, cut fresh onion.",
    lat: 6.6889, lng: -1.6172,
    phone: "+233241000004"
  },
  {
    id: "f5",
    name: "Fufu & Light Soup",
    vendor: "Maame Efua's",
    type: "Home cook",
    price: "GH₵20",
    distance: "0.9 km",
    emoji: "🥣",
    description: "Pounded cassava and plantain, goat meat light soup, made to order.",
    lat: 6.6831, lng: -1.6267,
    phone: "+233241000005"
  },
  {
    id: "f6",
    name: "Kelewele",
    vendor: "Nana's Kelewele Spot",
    type: "Street stall",
    price: "GH₵8",
    distance: "0.2 km",
    emoji: "🍌",
    description: "Spiced fried plantain cubes, ginger and pepper, roasted peanuts on top.",
    lat: 6.6903, lng: -1.6209,
    phone: "+233241000006"
  }
];

function renderFoodCards(filterType = "all") {
  const container = document.getElementById("food-container");
  if (!container) return;

  const items = filterType === "all"
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((item) => item.type === filterType);

  if (items.length === 0) {
    container.innerHTML = `<p class="food-empty">No dishes match this filter yet.</p>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="food-card">
      <div class="food-card-top">
        <span class="food-emoji" aria-hidden="true">${item.emoji}</span>
        <span class="food-tag">${item.type}</span>
      </div>
      <h3><a href="food.html?id=${item.id}">${item.name}</a></h3>
      <p class="food-vendor">${item.vendor}</p>
      <p class="food-desc">${item.description}</p>
      <div class="food-meta">
        <span class="food-price">${item.price}</span>
        <span class="food-distance">${item.distance}</span>
      </div>
      <button type="button" class="food-cta" data-food-id="${item.id}">View on map</button>
    </article>
  `).join("");

  container.querySelectorAll(".food-cta").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.foodId;
      if (typeof focusFoodOnMap === "function") {
        focusFoodOnMap(id);
      } else {
        window.location.href = `map.html#${id}`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => renderFoodCards());

function renderFoodDetail() {
  const mount = document.getElementById("food-detail");
  if (!mount) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const item = FOOD_ITEMS.find((f) => f.id === id) || FOOD_ITEMS[0];

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
  const callUrl = item.phone ? `tel:${item.phone}` : null;

  mount.innerHTML = `
    <div class="food-details">
      <div class="food-details-visual">
        <span>${item.emoji}</span>
      </div>
      <div class="food-details-content">
        <span class="food-tag">${item.type}</span>
        <h1>${item.name}</h1>
        <p class="food-vendor">${item.vendor}</p>
        <p class="food-detail-desc">${item.description}</p>
        <div class="food-meta">
          <span class="food-price">${item.price}</span>
          <span class="food-distance">${item.distance}</span>
        </div>
      </div>
      <div class="food-actions">
        <a class="btn-map" href="${directionsUrl}" target="_blank" rel="noopener">Get directions</a>
        ${callUrl ? `<a class="btn-call" href="${callUrl}">Call vendor</a>` : ""}
      </div>
    </div>
  `;

  document.title = `${item.name} — FoodRadar`;
}

document.addEventListener("DOMContentLoaded", renderFoodDetail);
