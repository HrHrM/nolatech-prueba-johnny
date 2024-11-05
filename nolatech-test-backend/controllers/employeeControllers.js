const Employee = require("../models/user");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("_id username role");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
};