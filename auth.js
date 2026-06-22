console.log("Auth system loaded");

// USERS DB (MVP local)
const users = JSON.parse(localStorage.getItem("users")) || [];

// REGISTER
function registerVendor(name, email, password) {

    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("User already exists");
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "vendor"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully");
    window.location.href = "login.html";
}


// LOGIN
function loginVendor(email, password) {

    const user = users.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid credentials");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful 🚀");

    window.location.href = "vendor.html";
}
