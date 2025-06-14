document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if (!role) {
    alert('Please select a role to login.');
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      // Redirect based on role
      if (role === 'user') {
        window.location.href = '../dashboard/user.html';
      } else if (role === 'doctor') {
        window.location.href = '../dashboard/doctor.html';
      } else if (role === 'admin') {
        window.location.href = '../dashboard/admin.html';
      }

    } else {
      alert(data.message || 'Login failed.');
    }
  } catch (error) {
    alert('Error logging in. Please try again later.');
    console.error('Login error:', error);
  }
});

