// FoodRadar — app-wide interactions (radar hero animation, nav)

function initRadarBlips() {
  const field = document.getElementById("radar-blips");
  if (!field || typeof FOOD_ITEMS === "undefined") return;

  // A handful of positions around the radar screen, as % of width/height.
  const positions = [
    { top: 22, left: 62 },
    { top: 38, left: 28 },
    { top: 58, left: 70 },
    { top: 68, left: 40 },
    { top: 30, left: 46 },
    { top: 76, left: 58 }
  ];

  const sample = FOOD_ITEMS.slice(0, positions.length);

  field.innerHTML = sample.map((item, i) => {
    const pos = positions[i];
    const delay = (i * 0.9).toFixed(1);
    return `
      <div class="radar-blip" style="top:${pos.top}%; left:${pos.left}%; animation-delay:${delay}s;">
        <span class="blip-dot"></span>
        <span class="blip-label">${item.name}</span>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // food.js runs first and defines FOOD_ITEMS; small delay keeps load order safe
  initRadarBlips();
});
