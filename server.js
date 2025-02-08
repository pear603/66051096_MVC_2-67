const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files (e.g., HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the drivers.json file
app.get('/drivers.json', (req, res) => {
  const filePath = path.join(__dirname, 'drivers.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data)); // Return the drivers JSON data
  } else {
    res.status(404).send('drivers.json not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
