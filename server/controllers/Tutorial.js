import Tutorial from "../models/Tutorial.js";
import { createError } from "../error.js";

export const addTutorial = async (req, res, next) => {
  try {
    const {
      workoutName,
      category,
      youtubeUrl,
      description,
      benefits,
      precautions,
      preventiveMeasures,
    } = req.body;

    if (!workoutName || !category || !youtubeUrl) {
      return next(
        createError(400, "workoutName, category and youtubeUrl are required")
      );
    }

    const tutorial = new Tutorial({
      workoutName,
      category,
      youtubeUrl,
      description,
      benefits,
      precautions,
      preventiveMeasures,
    });

    await tutorial.save();
    return res.status(201).json(tutorial);
  } catch (err) {
    next(err);
  }
};

export const getAllTutorials = async (req, res, next) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    return res.status(200).json(tutorials);
  } catch (err) {
    next(err);
  }
};

export const getTutorialById = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return next(createError(404, "Tutorial not found"));
    return res.status(200).json(tutorial);
  } catch (err) {
    next(err);
  }
};