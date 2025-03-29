const express = require("express");
const { addDoctor, editDoctor, getAllDoctors, getDoctorById, deleteDoctor } = require("../controllers/doctorController");
const validateDoctor = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Doctor Routes (All require Authentication)
router.route("/").post(authMiddleware, validateDoctor, addDoctor).get(authMiddleware, getAllDoctors);
router.route("/:id").get(authMiddleware, getDoctorById).put(authMiddleware, validateDoctor, editDoctor).delete(authMiddleware, deleteDoctor);

module.exports = router;