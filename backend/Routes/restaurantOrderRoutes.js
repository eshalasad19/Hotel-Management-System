const express = require ("express");

const {createOrder,getOrders,updateOrderStatus} = require ('../controllers/restaurantOrderController.js');
const router = express.Router();

router.post("/create", createOrder);

router.get("/all", getOrders);

router.put("/update/:id", updateOrderStatus);

export default router;