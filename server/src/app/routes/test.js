const express = require("express");
const router = express.Router();
const { executeQuery } = require("../middleware/db.js");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM Users";
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { router };
