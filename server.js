const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

let messages = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (name && email && message) {
    messages.push({ name, email, message, date: new Date() });
    res.json({ success: true });
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000');
});