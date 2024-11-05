const Evaluation = require("../models/evaluation");

exports.getEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.find()
      .populate('employeeId', 'username') // Replace 'name' with the fields you want to show from the Employee model
      .select('_id employeeId score date');

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error });
  }
};


exports.createEvaluation = async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al crear evaluación", error });
  }
};

exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation)
      return res.status(404).json({ message: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evaluación", error });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!evaluation)
      return res.status(404).json({ message: "Evaluación no encontrada" });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar evaluación", error });
  }
};

exports.getEvaluationsByEmployee = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ employeeId: req.params.id });
    res.json(evaluations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener evaluaciones del empleado", error });
  }
};


exports.calculateEmployeeResults = async (req, res) => {
  try {
    const { id } = req.params; // ID del empleado
    const evaluations = await Evaluation.find({ employeeId: id });
    console.log(evaluations);


    if (evaluations.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron evaluaciones para este empleado" });
    }

    // Calcular el promedio de la puntuación
    const totalScore = evaluations.reduce((acc, eval) => acc + eval.score, 0);
    const averageScore = totalScore / evaluations.length;

    res.json({
      employeeId: id,
      averageScore,
      evaluationsCount: evaluations.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al calcular los resultados", error });
  }
};