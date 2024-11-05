const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Credenciales incorrectas");
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.update_at,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
