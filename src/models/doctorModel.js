const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    profile_picture: { type: String },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contact_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    education: { type: String, required: true },
    years_of_experience: { type: Number, required: true },
    registration_number: { type: String, required: true },
    department: { type: String, required: true },
    working_days: [{ type: String, required: true }],
    shift_timings: {
        start_time: { type: String, required: true },
        end_time: { type: String, required: true }
    },
    consultation_fee: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Inactive"], required: true },
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);