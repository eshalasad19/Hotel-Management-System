const Service = require('../Models/Service');

// Create Service Request — user ya admin dono se
const createService = async (req, res) => {
  try {
    const { serviceType, description, guestName, roomNumber } = req.body;

    const serviceData = { serviceType, description };

    // Admin se create kar raha hai — guestName/roomNumber use karo
    if (guestName) {
      serviceData.guestName  = guestName;
      serviceData.roomNumber = roomNumber;
    } else {
      // User website se — userId use karo
      serviceData.userId = req.user.id;
    }

    const service = await Service.create(serviceData);
    res.status(201).json({ message: 'Service request created', service });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Services (Admin)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Service Status (Admin)
const updateServiceStatus = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service status updated', service });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createService, getAllServices, updateServiceStatus };