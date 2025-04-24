const { sql, poolPromise } = require("../db");

const getRegionById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM regions WHERE ID = @id`;
    const result = await pool
      .request()
      .input("id", sql.NVarChar, id)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllRegions = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM regions`;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRegionById,
  getAllRegions,
};
