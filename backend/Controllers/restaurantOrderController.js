const RestaurantOrder = require('../Models/RestaurantOrder');

const createOrder = async (req, res) => {
  try {
    const order = await RestaurantOrder.create(req.body);
    const populated = await RestaurantOrder.findById(order._id).populate('userId', 'name email phone');
    res.status(201).json({ success: true, message: 'Order placed', data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await RestaurantOrder.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await RestaurantOrder.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('userId', 'name email phone');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order updated', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await RestaurantOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await RestaurantOrder.find({ userId })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createOrder, getOrders, updateOrderStatus, deleteOrder,getOrdersByUserId };
