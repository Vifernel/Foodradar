// FoodRadar — interactive map (Leaflet), styled to match the radar theme

const KUMASI_CENTER = [6.6885, -1.6244];

const PIN_COLORS = {
  "Street stall": "#ff7a33",
  "Restaurant": "#00a86b",
  "Home cook": "#ffc857"
};

let foodMap = null;
let markerRegistry = []; // { marker, type }

function pinColorFor(type) {
  return PIN_COLORS[type] || "#ff7a33";
}

function buildPopup(item) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
  const callUrl = item.phone ? `tel:${item.phone}` : null;

  return `
    <div class="map-popup">
      <p class="map-popup-tag">${item.emoji} ${item.type}</p>
      <h3>${item.name}</h3>
      <p class="map-popup-vendor">${item.vendor}</p>
      <div class="map-popup-meta">
        <span>${item.price}</span>
        <span>${item.distance}</span>
      </div>
      <div class="map-popup-actions">
        <a href="${directionsUrl}" target="_blank" rel="noopener" class="btn-directions">Directions</a>
        ${callUrl ? `<a href="${callUrl}" class="btn-call">Call</a>` : ""}
      </div>
    </div>
  `;
}

function addMarkers(map) {
  markerRegistry = [];

  FOOD_ITEMS.forEach((item) => {
    if (!item.lat || !item.lng) return;

    const icon = L.divIcon({
      className: "",
      html: `<span class="map-pin" style="--pin-color:${pinColorFor(item.type)}"></span>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const marker = L.marker([item.lat, item.lng], { icon }).addTo(map);
    marker.bindPopup(buildPopup(item));

    markerRegistry.push({ marker, type: item.type, id: item.id });
  });
}

function focusFoodOnMap(id) {
  if (!foodMap) return;
  const entry = markerRegistry.find((m) => m.id === id);
  if (!entry) return;

  foodMap.setView(entry.marker.getLatLng(), 16, { animate: true });
  entry.marker.openPopup();
  document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "center" });
}

function applyMapFilter(filterType) {
  if (!foodMap) return;

  markerRegistry.forEach(({ marker, type }) => {
    const matches = filterType === "all" || type === filterType;
    const onMap = foodMap.hasLayer(marker);

    if (matches && !onMap) marker.addTo(foodMap);
    if (!matches && onMap) foodMap.removeLayer(marker);
  });

  if (typeof renderFoodCards === "function") {
    renderFoodCards(filterType);
  }
}

function initFoodMap() {
  const el = document.getElementById("map");
  if (!el || typeof L === "undefined") return;

  foodMap = L.map("map").setView(KUMASI_CENTER, 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 19
  }).addTo(foodMap);

  addMarkers(foodMap);

  const hashId = window.location.hash.replace("#", "");
  if (hashId) focusFoodOnMap(hashId);

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      applyMapFilter(chip.dataset.filter);
    });
  });
}

document.addEventListener("DOMContentLoaded", initFoodMap);
