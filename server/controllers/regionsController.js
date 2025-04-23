// Controller for handling regions data and basic statistics
// This file contains functions for interacting with regions and statistics tables

/**
 * Get all regions
 */
const getAllRegions = async (req, res) => {
  try {
    const [rows] = await req.pool.query('SELECT * FROM regions ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific region by ID
 */
const getRegionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await req.pool.query('SELECT * FROM regions WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific region by code
 */
const getRegionByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const [rows] = await req.pool.query('SELECT * FROM regions WHERE code = ?', [code]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new region
 */
const createRegion = async (req, res) => {
  try {
    const { name, code, description, population, area, center, image_url } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required fields' });
    }
    
    const [result] = await req.pool.query(
      'INSERT INTO regions (name, code, description, population, area, center, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, code, description, population, area, center, image_url]
    );
    
    res.status(201).json({
      message: 'Region created successfully',
      id: result.insertId
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing region
 */
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, population, area, center, image_url } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required fields' });
    }
    
    const [result] = await req.pool.query(
      'UPDATE regions SET name = ?, code = ?, description = ?, population = ?, area = ?, center = ?, image_url = ? WHERE id = ?',
      [name, code, description, population, area, center, image_url, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json({ message: 'Region updated successfully' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a region
 */
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await req.pool.query('DELETE FROM regions WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json({ message: 'Region deleted successfully' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all statistics categories
 */
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await req.pool.query('SELECT * FROM stat_categories');
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all statistics for a region
 */
const getRegionStatistics = async (req, res) => {
  try {
    const { regionId } = req.params;
    
    const [rows] = await req.pool.query(
      `SELECT s.*, c.name as category_name 
       FROM statistics s 
       JOIN stat_categories c ON s.category_id = c.id
       WHERE s.region_id = ?`,
      [regionId]
    );
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get statistics for a specific category and region
 */
const getCategoryStatistics = async (req, res) => {
  try {
    const { regionId, categoryId } = req.params;
    
    const [rows] = await req.pool.query(
      `SELECT s.*, c.name as category_name 
       FROM statistics s 
       JOIN stat_categories c ON s.category_id = c.id
       WHERE s.region_id = ? AND s.category_id = ?`,
      [regionId, categoryId]
    );
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new statistic
 */
const createStatistic = async (req, res) => {
  try {
    const { 
      region_id, 
      category_id, 
      name, 
      value, 
      year, 
      source, 
      description 
    } = req.body;
    
    if (!region_id || !category_id || !name || value === undefined) {
      return res.status(400).json({ 
        message: 'Region ID, category ID, name, and value are required fields' 
      });
    }
    
    const [result] = await req.pool.query(
      `INSERT INTO statistics 
       (region_id, category_id, name, value, year, source, description) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [region_id, category_id, name, value, year, source, description]
    );
    
    res.status(201).json({ 
      message: 'Statistic created successfully',
      id: result.insertId 
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing statistic
 */
const updateStatistic = async (req, res) => {
  try {
    const { 
      region_id, 
      category_id, 
      name, 
      value, 
      year, 
      source, 
      description 
    } = req.body;
    
    const { id } = req.params;
    
    const [result] = await req.pool.query(
      `UPDATE statistics SET 
       region_id = ?, category_id = ?, name = ?, value = ?, 
       year = ?, source = ?, description = ? 
       WHERE id = ?`,
      [region_id, category_id, name, value, year, source, description, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    
    res.json({ message: 'Statistic updated successfully' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a statistic
 */
const deleteStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await req.pool.query('DELETE FROM statistics WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    
    res.json({ message: 'Statistic deleted successfully' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Compare statistics between regions
 */
const compareStatistics = async (req, res) => {
  try {
    const { regionIds, categoryId, year } = req.query;
    
    if (!regionIds || !categoryId) {
      return res.status(400).json({ message: 'Region IDs and category ID are required' });
    }
    
    // Parse region IDs from comma-separated string
    const regionIdArray = regionIds.split(',');
    
    // Build query with placeholders for each region ID
    const placeholders = regionIdArray.map(() => '?').join(',');
    
    let query = `
      SELECT r.id as region_id, r.name as region_name, s.* 
      FROM statistics s
      JOIN regions r ON s.region_id = r.id
      WHERE s.region_id IN (${placeholders}) AND s.category_id = ?
    `;
    
    const params = [...regionIdArray, categoryId];
    
    // Add year filter if provided
    if (year) {
      query += ' AND s.year = ?';
      params.push(year);
    }
    
    const [rows] = await req.pool.query(query, params);
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get time series data for a statistic
 */
const getTimeSeriesData = async (req, res) => {
  try {
    const { statName, regionId } = req.params;
    
    const [rows] = await req.pool.query(
      `SELECT year, value 
       FROM statistics 
       WHERE name = ? AND region_id = ? 
       ORDER BY year ASC`,
      [statName, regionId]
    );
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Handle file upload
 */
const uploadFile = async (req, res) => {
  try {
    const { regionId, fileType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Store file reference in database
    const [result] = await req.pool.query(
      'INSERT INTO uploads (region_id, file_type, file_path) VALUES (?, ?, ?)',
      [regionId, fileType, file.path]
    );

    return res.status(201).json({ 
      message: 'File uploaded successfully',
      fileId: result.insertId 
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRegions,
  getRegionById,
  getRegionByCode,
  createRegion,
  updateRegion,
  deleteRegion,
  getAllCategories,
  getRegionStatistics,
  getCategoryStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  compareStatistics,
  getTimeSeriesData,
  uploadFile
};