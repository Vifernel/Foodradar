// FoodRadar — auth (placeholder logic, ready to wire up to Supabase)

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".auth-tab");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const message = document.getElementById("auth-message");

  if (!tabs.length || !signupForm || !loginForm) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const showSignup = tab.dataset.tab === "signup";
      signupForm.classList.toggle("hidden", !showSignup);
      loginForm.classList.toggle("hidden", showSignup);

      message.hidden = true;
    });
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: replace with a real Supabase call, e.g.
    // const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });

    const name = signupForm.name.value || "there";
    message.hidden = false;
    message.textContent = `Welcome, ${name}! Accounts aren't wired up yet — this form is ready for Supabase auth.`;
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: replace with a real Supabase call, e.g.
    // const { error } = await supabase.auth.signInWithPassword({ email, password });

    message.hidden = false;
    message.textContent = "Accounts aren't wired up yet — this form is ready for Supabase auth.";
  });
});
