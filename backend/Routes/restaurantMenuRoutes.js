const express = require("express");
const router = express.Router();

const {
  addMenuItem, getMenu, getMenuByCategory,updateMenuItem,deleteMenuItem} 
  = require("../Controllers/restaurantMenuController");

router.post("/add", addMenuItem);
router.get("/", getMenu);
router.get("/:category", getMenuByCategory);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;