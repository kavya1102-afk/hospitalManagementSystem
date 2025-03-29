const Doctor = require("../models/doctorModel.js");

class DoctorRepository {
    // ✅ Find doctor by email
    async findByEmail(email) {
        return await Doctor.findOne({ email });
    }

    // ✅ Find doctor by ID
    async findById(doctorId) {
        return await Doctor.findById(doctorId);
    }

    // ✅ Get all doctors
    async getAllDoctors() {
        return await Doctor.find();
    }

    // ✅ Create a new doctor
    async createDoctor(doctorData) {
        const doctor = new Doctor(doctorData);
        return await doctor.save();
    }

    // ✅ Update doctor details
    async updateDoctor(doctorId, updateData) {
        return await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true });
    }

    // ✅ Delete doctor
    async deleteDoctor(doctorId) {
        return await Doctor.findByIdAndDelete(doctorId);
    }
}

module.exports = new DoctorRepository();