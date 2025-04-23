const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // Get all statistics categories
  router.get('/categories', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM stat_categories');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching statistic categories:', error);
      res.status(500).send('Server error');
    }
  });

  // Get all statistics for a specific region
  router.get('/region/:regionId', async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT s.*, c.name as category_name 
         FROM statistics s 
         JOIN stat_categories c ON s.category_id = c.id
         WHERE s.region_id = ?`,
        [req.params.regionId]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching region statistics:', error);
      res.status(500).send('Server error');
    }
  });

  // Get specific statistics by category for a region
  router.get('/region/:regionId/category/:categoryId', async (req, res) => {
    try {
      const { regionId, categoryId } = req.params;
      
      const [rows] = await pool.query(
        `SELECT s.*, c.name as category_name 
         FROM statistics s 
         JOIN stat_categories c ON s.category_id = c.id
         WHERE s.region_id = ? AND s.category_id = ?`,
        [regionId, categoryId]
      );
      
      res.json(rows);
    } catch (error) {
      console.error('Error fetching category statistics for region:', error);
      res.status(500).send('Server error');
    }
  });

  // Add a new statistic
  router.post('/', async (req, res) => {
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
      
      const [result] = await pool.query(
        `INSERT INTO statistics 
         (region_id, category_id, name, value, year, source, description) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [region_id, category_id, name, value, year, source, description]
      );
      
      res.status(201).json({ 
        message: 'Statistic created successfully',
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error creating statistic:', error);
      res.status(500).send('Server error');
    }
  });

  // Update a statistic
  router.put('/:id', async (req, res) => {
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
      
      const [result] = await pool.query(
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
    } catch (error) {
      console.error('Error updating statistic:', error);
      res.status(500).send('Server error');
    }
  });

  // Delete a statistic
  router.delete('/:id', async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM statistics WHERE id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Statistic not found' });
      }
      
      res.json({ message: 'Statistic deleted successfully' });
    } catch (error) {
      console.error('Error deleting statistic:', error);
      res.status(500).send('Server error');
    }
  });

  // Compare statistics between regions
  router.get('/compare', async (req, res) => {
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
      
      const [rows] = await pool.query(query, params);
      
      res.json(rows);
    } catch (error) {
      console.error('Error comparing statistics:', error);
      res.status(500).send('Server error');
    }
  });

  // Get time series data for a specific statistic
  router.get('/timeseries/:statName/:regionId', async (req, res) => {
    try {
      const { statName, regionId } = req.params;
      
      const [rows] = await pool.query(
        `SELECT year, value 
         FROM statistics 
         WHERE name = ? AND region_id = ? 
         ORDER BY year ASC`,
        [statName, regionId]
      );
      
      res.json(rows);
    } catch (error) {
      console.error('Error fetching time series data:', error);
      res.status(500).send('Server error');
    }
  });
  
  return router;
};