const Evaluation = require("../models/evaluation");

exports.getEmployeeReport = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ employeeId: req.params.id });
    const report = { employeeId: req.params.id, evaluations };
    res.json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al generar reporte de evaluación", error });
  }
};
