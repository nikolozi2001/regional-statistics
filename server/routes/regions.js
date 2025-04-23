const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // Get all regions
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT ID, Name, NameEN, Area, Population, liveBirth, death, naturalIncrease, 
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry, 
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities 
        FROM regions
      `);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching regions:', error);
      res.status(500).send('Server error');
    }
  });

  // Get a specific region by ID
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT ID, Name, NameEN, Area, Population, liveBirth, death, naturalIncrease, 
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry, 
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities 
        FROM regions WHERE ID = ?
      `, [req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Region not found' });
      }
      
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching region:', error);
      res.status(500).send('Server error');
    }
  });

  // Create a new region
  router.post('/', async (req, res) => {
    try {
      const { 
        Name, NameEN, Area, Population, liveBirth, death, naturalIncrease,
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry,
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities 
      } = req.body;
      
      if (!Name || !NameEN) {
        return res.status(400).json({ message: 'Name and NameEN are required fields' });
      }
      
      const [result] = await pool.query(`
        INSERT INTO regions (
          Name, NameEN, Area, Population, liveBirth, death, naturalIncrease,
          GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry,
          AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        Name, NameEN, Area, Population, liveBirth, death, naturalIncrease,
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry,
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities
      ]);
      
      res.status(201).json({ 
        message: 'Region created successfully',
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error creating region:', error);
      res.status(500).send('Server error');
    }
  });

  // Update a region
  router.put('/:id', async (req, res) => {
    try {
      const { 
        Name, NameEN, Area, Population, liveBirth, death, naturalIncrease,
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry,
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities 
      } = req.body;
      const { id } = req.params;
      
      const [result] = await pool.query(`
        UPDATE regions SET 
          Name = ?, NameEN = ?, Area = ?, Population = ?, 
          liveBirth = ?, death = ?, naturalIncrease = ?,
          GDP = ?, GDPPerCapita = ?, UnemploymentRate = ?, 
          EmploymentRate = ?, EmploymentRateIndustry = ?,
          AverageSalaryIndustry = ?, RegistredEntities = ?, 
          activeEntities = ?, newlyRegistredEntities = ?
        WHERE ID = ?
      `, [
        Name, NameEN, Area, Population, liveBirth, death, naturalIncrease,
        GDP, GDPPerCapita, UnemploymentRate, EmploymentRate, EmploymentRateIndustry,
        AverageSalaryIndustry, RegistredEntities, activeEntities, newlyRegistredEntities,
        id
      ]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Region not found' });
      }
      
      res.json({ message: 'Region updated successfully' });
    } catch (error) {
      console.error('Error updating region:', error);
      res.status(500).send('Server error');
    }
  });

  // Delete a region
  router.delete('/:id', async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM regions WHERE ID = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Region not found' });
      }
      
      res.json({ message: 'Region deleted successfully' });
    } catch (error) {
      console.error('Error deleting region:', error);
      res.status(500).send('Server error');
    }
  });
  
  return router;
};