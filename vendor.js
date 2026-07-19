// FoodRadar — vendor application (placeholder logic, ready to wire up to Supabase)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vendor-form");
  const message = document.getElementById("vendor-message");
  if (!form || !message) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: replace with a real Supabase insert, e.g.
    // const { error } = await supabase.from("vendor_applications").insert({ ...formData });

    const name = form.vendorName.value || "there";
    message.hidden = false;
    message.textContent = `Thanks, ${name}! We've got your application — the FoodRadar team will reach out to get your first dish live.`;
    form.reset();
  });
});
