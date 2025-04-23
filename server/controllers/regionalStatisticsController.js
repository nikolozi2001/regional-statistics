// Controller for handling regional statistics data
// This file contains functions for interacting with regional_statistics and regional_statistics_en tables

/**
 * Get all regional statistics for a specific region ID (Georgian)
 */
const getRegionalStatistics = async (req, res) => {
  const { regionId } = req.params;
  try {
    const [rows] = await req.pool.query(
      `SELECT * FROM regional_statistics WHERE ID = ?`,
      [regionId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all regional statistics for a specific region ID (English)
 */
const getRegionalStatisticsEn = async (req, res) => {
  const { regionId } = req.params;
  try {
    const [rows] = await req.pool.query(
      `SELECT * FROM regional_statistics_en WHERE ID = ?`,
      [regionId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific section from regional statistics for a specific region ID (Georgian)
 */
const getRegionalStatisticSection = async (req, res) => {
  const { regionId, section } = req.params;
  
  try {
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    const [rows] = await req.pool.query(
      `SELECT ID, ${section} FROM regional_statistics WHERE ID = ?`,
      [regionId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific section from regional statistics for a specific region ID (English)
 */
const getRegionalStatisticSectionEn = async (req, res) => {
  const { regionId, section } = req.params;
  
  try {
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    const [rows] = await req.pool.query(
      `SELECT ID, ${section} FROM regional_statistics_en WHERE ID = ?`,
      [regionId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Compare specific section between multiple regions (Georgian)
 */
const compareRegionalStatisticSection = async (req, res) => {
  const { section } = req.params;
  const { regionIds } = req.query;
  
  try {
    if (!regionIds) {
      return res.status(400).json({ message: 'Region IDs are required as query parameter' });
    }
    
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    // Parse region IDs from comma-separated string
    const regionIdArray = regionIds.split(',');
    
    // Build query with placeholders for each region ID
    const placeholders = regionIdArray.map(() => '?').join(',');
    
    const [rows] = await req.pool.query(
      `SELECT ID, ${section} FROM regional_statistics WHERE ID IN (${placeholders})`,
      regionIdArray
    );
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Compare specific section between multiple regions (English)
 */
const compareRegionalStatisticSectionEn = async (req, res) => {
  const { section } = req.params;
  const { regionIds } = req.query;
  
  try {
    if (!regionIds) {
      return res.status(400).json({ message: 'Region IDs are required as query parameter' });
    }
    
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    // Parse region IDs from comma-separated string
    const regionIdArray = regionIds.split(',');
    
    // Build query with placeholders for each region ID
    const placeholders = regionIdArray.map(() => '?').join(',');
    
    const [rows] = await req.pool.query(
      `SELECT ID, ${section} FROM regional_statistics_en WHERE ID IN (${placeholders})`,
      regionIdArray
    );
    
    res.json(rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a specific section of regional statistics (Georgian)
 */
const updateRegionalStatisticSection = async (req, res) => {
  const { regionId, section } = req.params;
  const newData = req.body.data;
  
  try {
    if (!newData) {
      return res.status(400).json({ message: 'Data is required in request body' });
    }
    
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    const [result] = await req.pool.query(
      `UPDATE regional_statistics SET ${section} = ? WHERE ID = ?`,
      [newData, regionId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json({ 
      message: 'Regional statistics updated successfully',
      regionId: regionId,
      section: section
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a specific section of regional statistics (English)
 */
const updateRegionalStatisticSectionEn = async (req, res) => {
  const { regionId, section } = req.params;
  const newData = req.body.data;
  
  try {
    if (!newData) {
      return res.status(400).json({ message: 'Data is required in request body' });
    }
    
    // Validate if the section exists in the table
    const validSections = [
      'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
      'marriage', 'divorce', 'populationDescription', 'demography', 
      'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
      'pricesAndInflation', 'standartOfLiving', 'businessSector', 
      'businessRegister', 'budget', 'agriculture', 'industry', 
      'construction', 'service', 'trading', 'hotelsAndRestaurants',
      'transportAndStorage', 'tourism', 'legalStatistics', 
      'healthCareAndSocialSecurity', 'education', 'culture',
      'environmentalProtection', 'infrastructure'
    ];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }
    
    const [result] = await req.pool.query(
      `UPDATE regional_statistics_en SET ${section} = ? WHERE ID = ?`,
      [newData, regionId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Regional statistics not found' });
    }
    
    res.json({ 
      message: 'Regional statistics (English) updated successfully',
      regionId: regionId,
      section: section
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRegionalStatistics,
  getRegionalStatisticsEn,
  getRegionalStatisticSection,
  getRegionalStatisticSectionEn,
  compareRegionalStatisticSection,
  compareRegionalStatisticSectionEn,
  updateRegionalStatisticSection,
  updateRegionalStatisticSectionEn
};