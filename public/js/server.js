const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Use JSON body parser
app.use(bodyParser.json());

// Simulated user data (in a real app, use a DB)
const users = [
  { username: 'user1', password: 'pass1', role: 'user' },
  { username: 'doctor1', password: 'pass2', role: 'doctor' },
  { username: 'admin1', password: 'pass3', role: 'admin' },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (user.role !== role) {
    return res.status(403).json({ message: 'Role mismatch. Please select the correct role.' });
  }

  // Success
  res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
