const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());

// Debugging middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// List all available routes for debugging
console.log('Registering API routes:');
routes.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log(`Route: /api${r.route.path}`);
  }
});

// Apply routes
app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Create port-info.json for frontend to discover
  const fs = require('fs');
  const path = require('path');
  const publicDir = path.join(__dirname, '../public');
  const serverDir = path.join(publicDir, 'server');
  
  // Create directories if they don't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir);
  }
  
  // Save port number to port-info.json
  fs.writeFileSync(
    path.join(serverDir, 'port-info.json'),
    JSON.stringify({ port: PORT })
  );
  console.log(`Port info saved to port-info.json: ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = PORT + 1;
    console.log(`Port ${PORT} is already in use. Trying port ${newPort}...`);
    process.env.PORT = newPort;
    server.close();
    app.listen(newPort, () => {
      console.log(`Server is running on port ${newPort}`);
      
      // Create port-info.json with new port
      const fs = require('fs');
      const path = require('path');
      const publicDir = path.join(__dirname, '../public');
      const serverDir = path.join(publicDir, 'server');
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir);
      }
      
      fs.writeFileSync(
        path.join(serverDir, 'port-info.json'),
        JSON.stringify({ port: newPort })
      );
      console.log(`Port info saved to port-info.json: ${newPort}`);
    });
  } else {
    console.error(err);
    process.exit(1);
  }
});
