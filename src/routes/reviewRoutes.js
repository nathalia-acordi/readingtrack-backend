import express from 'express';
import Review from '../models/Review.js';  

const router = express.Router();


router.get('/reviews', async (req, res) => {
    try {
      console.log('Buscando avaliações no banco de dados...'); 
      const reviews = await Review.find();
      console.log('Avaliações encontradas:', reviews); 
  
      if (reviews.length === 0) {
        console.log('Nenhuma avaliação encontrada no banco de dados.'); 
        return res.status(404).json({
          success: false,
          message: 'Nenhuma avaliação encontrada.',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Avaliações listadas com sucesso!',
        reviews,
      });
    } catch (error) {
      console.error('Erro ao listar as avaliações:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar as avaliações. Tente novamente.',
      });
    }
  });
  

router.post('/reviews', async (req, res) => {
  const { image, title, bookId, rating, comment } = req.body;

  if (!image || !title || !bookId || !rating || !comment) {
    console.log('Erro: Dados obrigatórios não fornecidos');
    return res.status(400).json({
      success: false,
      message: 'Faltando dados obrigatórios: bookId, rating ou comment!',
    });
  }

  if (rating < 1 || rating > 5) {
    console.log('Erro: rating fora do intervalo permitido (1 a 5)');
    return res.status(400).json({
      success: false,
      message: 'A nota deve ser entre 1 e 5.',
    });
  }

  const newReview = new Review({
    title,
    bookId,
    rating,
    comment,
    image
  });

  try {
    const savedReview = await newReview.save();

    return res.status(201).json({
      success: true,
      message: 'Avaliação salva com sucesso!',
      review: savedReview,
    });
  } catch (error) {
    console.error('Erro ao salvar a avaliação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao salvar a avaliação. Tente novamente.',
    });
  }
});

router.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Avaliação encontrada com sucesso!',
      review,
    });
  } catch (error) {
    console.error('Erro ao buscar a avaliação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar a avaliação. Tente novamente.',
    });
  }
});

router.put('/reviews/:id', async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada.',
      });
    }

    // Atualizando os campos permitidos
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    const updatedReview = await review.save();

    return res.status(200).json({
      success: true,
      message: 'Avaliação atualizada com sucesso!',
      review: updatedReview,
    });
  } catch (error) {
    console.error('Erro ao atualizar a avaliação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar a avaliação. Tente novamente.',
    });
  }
});

router.delete('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Avaliação excluída com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao excluir a avaliação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao excluir a avaliação. Tente novamente.',
    });
  }
});

export default router;