const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwtHelper.js");
const UserRepository = require("../repository/userRepository.js");

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserRepository.findByEmail(email);
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await UserRepository.createUser({ name, email, password: hashedPassword });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const {email, password } = req.body;

    const user = await UserRepository.findByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
