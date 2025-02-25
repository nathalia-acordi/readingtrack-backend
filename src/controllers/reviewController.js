import axios from "axios";
import Review from "../models/Review.js";

export const saveReview = async (req, res) => {
  const { title, bookId, rating, comment } = req.body;

  try {
    if (!title || !bookId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

    const existingReview = await Review.findOne({ isbn });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "Já existe uma avaliação para este ISBN." });
    }

    const newReview = new Review({ bookId: isbn, rating, comment });

    await newReview.save();

    return res.status(201).json({ success: true, message: "Avaliação salva com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
    return res.status(500).json({ success: false, message: "Erro ao salvar a avaliação. Tente novamente mais tarde." });
  }
};

export const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find();

    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: "Nenhuma avaliação encontrada." });
    }

    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return res.status(500).json({ success: false, message: "Erro interno ao buscar avaliações." });
  }
};