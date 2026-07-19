// FoodRadar — auth (placeholder logic, ready to wire up to Supabase)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("auth-message");
  if (!form || !message) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: replace with a real Supabase auth call, e.g.
    // const { error } = await supabase.auth.signInWithPassword({ email, password });

    message.hidden = false;
    message.textContent = "Accounts aren't wired up yet — this form is ready for Supabase auth.";
  });
});
