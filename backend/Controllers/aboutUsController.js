const AboutUs = require('../Models/AboutUs');
const path = require('path');
const fs   = require('fs');

// Get About Us — Public
const getAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      // Default data create karo
      about = await AboutUs.create({
        hotelName: 'The Luxury Stay',
        tagline:   'Where Comfort Meets Excellence',
        story:     'Our hotel has been providing exceptional hospitality since our founding. We are committed to making every guest feel at home while experiencing the finest amenities.',
        mission:   'To deliver exceptional hospitality experiences that exceed our guests\' expectations through personalized service and world-class amenities.',
        vision:    'To be the most preferred luxury hotel destination, known for our outstanding service, comfort, and commitment to guest satisfaction.',
        yearsOfExperience: 10,
        totalRooms:        50,
        guestsServed:      5000,
        staffMembers:      100,
        team: [],
      });
    }
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update About Us info (no images)
const updateAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) about = new AboutUs();

    const fields = ['hotelName','tagline','story','mission','vision','yearsOfExperience','totalRooms','guestsServed','staffMembers','isPublished'];
    fields.forEach(f => { if (req.body[f] !== undefined) about[f] = req.body[f]; });

    await about.save();
    res.status(200).json({ message: 'About Us updated', about });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add Team Member
const addTeamMember = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) about = await AboutUs.create({});

    const member = {
      name:        req.body.name,
      designation: req.body.designation,
      bio:         req.body.bio || '',
      order:       req.body.order || about.team.length,
    };

    if (req.file) member.image = `/Uploads/${req.file.filename}`;

    about.team.push(member);
    await about.save();
    res.status(201).json({ message: 'Team member added', about });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Team Member
const updateTeamMember = async (req, res) => {
  try {
    const about = await AboutUs.findOne();
    if (!about) return res.status(404).json({ message: 'About Us not found' });

    const member = about.team.id(req.params.memberId);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    if (req.body.name)        member.name        = req.body.name;
    if (req.body.designation) member.designation = req.body.designation;
    if (req.body.bio)         member.bio         = req.body.bio;
    if (req.body.order)       member.order       = req.body.order;

    if (req.file) {
      // Purani image delete karo
      if (member.image && member.image.startsWith('/Uploads/')) {
        const oldPath = path.join(__dirname, '..', member.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      member.image = `/Uploads/${req.file.filename}`;
    }

    await about.save();
    res.status(200).json({ message: 'Team member updated', about });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Team Member
const deleteTeamMember = async (req, res) => {
  try {
    const about = await AboutUs.findOne();
    if (!about) return res.status(404).json({ message: 'Not found' });

    const member = about.team.id(req.params.memberId);
    if (member?.image && member.image.startsWith('/Uploads/')) {
      const imgPath = path.join(__dirname, '..', member.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    about.team.pull(req.params.memberId);
    await about.save();
    res.status(200).json({ message: 'Team member deleted', about });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAboutUs, updateAboutUs, addTeamMember, updateTeamMember, deleteTeamMember };