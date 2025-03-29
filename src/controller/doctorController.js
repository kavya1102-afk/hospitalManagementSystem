const Doctor = require("../models/doctorModel.js");

// ✅ Add Doctor (POST)
const addDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({ message: "Doctor added successfully", doctor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Edit Doctor (PUT)
const editDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        
        res.status(200).json({ message: "Doctor updated successfully", doctor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addDoctor, editDoctor };