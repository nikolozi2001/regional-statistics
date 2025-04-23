const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql2/promise');
const multer = require('multer');
const fs = require('fs');
const http = require('http');
const net = require('net');
require('dotenv').config();

// Initialize express app
const app = express();
const BASE_PORT = process.env.PORT || 3000;

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false); // Some other error
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is not in use
    });
    
    server.listen(port);
  });
}

// Function to find an available port
async function findAvailablePort(startPort) {
  let port = startPort;
  let maxAttempts = 10; // Try up to 10 ports (startPort to startPort+9)
  
  while (maxAttempts > 0) {
    if (!(await isPortInUse(port))) {
      return port;
    }
    port++;
    maxAttempts--;
  }
  
  throw new Error('Could not find an available port');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'regional_statistics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Import routes
const regionRoutes = require('./routes/regions');
const statRoutes = require('./routes/statistics');

// Use routes
app.use('/api/regions', regionRoutes(pool));
app.use('/api/statistics', statRoutes(pool));

// File upload route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { regionId, fileType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Store file reference in database
    const [result] = await pool.query(
      'INSERT INTO uploads (region_id, file_type, file_path) VALUES (?, ?, ?)',
      [regionId, fileType, file.path]
    );

    return res.status(201).json({ 
      message: 'File uploaded successfully',
      fileId: result.insertId 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).send('Server error during upload');
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Route to get the server port (needed by frontend to know which port to use)
app.get('/api/server-info', (req, res) => {
  res.json({
    port: server.address().port
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Create server but don't start listening yet
const server = http.createServer(app);

// Start the server with dynamic port detection
(async () => {
  try {
    const PORT = await findAvailablePort(BASE_PORT);
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      
      // Save the actual port to a file so the frontend can read it
      const portInfo = {
        port: PORT,
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(path.join(__dirname, 'port-info.json'), JSON.stringify(portInfo));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();