const RestaurantMenu = require('../models/RestaurantMenu');

const addMenuItem = async (req, res) => {
  try {
    const item = await RestaurantMenu.create(req.body);
    res.status(201).json({ success: true, message: 'Menu item added', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const menu = await RestaurantMenu.find().sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMenuByCategory = async (req, res) => {
  try {
    const items = await RestaurantMenu.find({ category: req.params.category });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const item = await RestaurantMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Menu updated', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await RestaurantMenu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addMenuItem, getMenu, getMenuByCategory, updateMenuItem, deleteMenuItem };
