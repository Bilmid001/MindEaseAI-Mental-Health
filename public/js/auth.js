// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert("Login successful!");
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    // Redirect based on role
    if (user.role === "user") {
      window.location.href = "dashboard/user.html";
    } else if (user.role === "doctor") {
      window.location.href = "dashboard/doctor.html";
    } else if (user.role === "admin") {
      window.location.href = "dashboard/admin.html";
    } else {
      // fallback redirect if no role found
      window.location.href = "dashboard/user.html";
    }
  } else {
    alert("Invalid username or password.");
  }
});

// SIGNUP
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("newUsername").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  // Optional: role selector in signup form, fallback to 'user'
  const roleSelect = document.getElementById("role");
  const role = roleSelect ? roleSelect.value : "user";

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.username === username)) {
    alert("Username already exists.");
    return;
  }

  users.push({ username, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "index.html";
});
