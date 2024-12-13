const express = require("express");
const router = express.Router();
const pool = require("../Database/db");

router.get("/", async (req, res) => {
  try {
    const allDiscounts = await pool.query("SELECT * FROM discount");
    if (allDiscounts.rows.length === 0) {
      return res.status(400).json("No discounts available");
    }
    res.json(allDiscounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { discount_code, start_date, end_date } = req.body;
    const newDiscount = await pool.query(
      "INSERT INTO discount (discount_code, start_date, end_date) VALUES($1, $2, $3) RETURNING *",
      [discount_code, start_date, end_date]
    );
    res.status(200).json(newDiscount.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDiscount = await pool.query(
      "DELETE FROM discount WHERE discountid = $1",
      [id]
    );
    res.status(200).json("Discount deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
