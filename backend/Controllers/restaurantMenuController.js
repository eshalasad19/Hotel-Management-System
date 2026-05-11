const RestaurantMenu = require("../Models/RestaurantMenu");


// ➤ ADD MENU ITEM (ADMIN)
export const addMenuItem = async (req, res) => {

  try {

    const item = await Menu.create(req.body);

    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: item
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ➤ GET ALL MENU ITEMS (USER)
export const getMenu = async (req, res) => {

  try {

    const menu = await Menu.find();

    res.status(200).json({
      success: true,
      data: menu
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ➤ GET MENU BY CATEGORY (IMPORTANT 🔥)
export const getMenuByCategory = async (req, res) => {

  try {

    const { category } = req.params;

    const items = await Menu.find({ category });

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ➤ UPDATE MENU ITEM
export const updateMenuItem = async (req, res) => {

  try {

    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Menu updated",
      data: item
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ➤ DELETE MENU ITEM
export const deleteMenuItem = async (req, res) => {

  try {

    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Menu item deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
module.exports = {addMenuItem ,getMenu ,getMenuByCategory, updateMenuItem, deleteMenuItem};