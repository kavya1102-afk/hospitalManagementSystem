const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

// **Doctor Data Validation Schema**
const doctorSchema = Joi.object({
    full_name: Joi.string().required(),
    profile_picture: Joi.string().optional(),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    contact_number: Joi.string().required(),
    email: Joi.string().email().required(),
    specialization: Joi.string().required(),
    education: Joi.string().required(),
    years_of_experience: Joi.number().required(),
    registration_number: Joi.string().required(),
    department: Joi.string().required(),
    working_days: Joi.array().items(Joi.string()).required(),
    shift_timings: Joi.object({
        start_time: Joi.string().required(),
        end_time: Joi.string().required()
    }).required(),
    consultation_fee: Joi.number().required(),
    status: Joi.string().valid("Active", "Inactive").required(),
    hospital_id: Joi.string().required()
});

// **JWT Authentication Middleware**
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// **Validation Middleware**
const validateDoctor = (req, res, next) => {
    const { error } = doctorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { authMiddleware, validateDoctor };