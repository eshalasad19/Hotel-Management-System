const RestaurantOrder = require("../Models/RestaurantOrder.js");


// CREATE ORDER
export const createOrder = async (req, res) => {

  try {

    const order = await RestaurantOrder.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET ALL ORDERS
export const getOrders = async (req, res) => {

  try {

    const orders = await RestaurantOrder.find();

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// UPDATE STATUS
export const updateOrderStatus = async (req, res) => {

  try {

    const order = await RestaurantOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
module.exports = { createOrder, getOrders, updateOrderStatus};