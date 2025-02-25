import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true, 
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: [3, 'O comentário deve ter pelo menos 3 caracteres.'],
  },
  image: { 
    type: String, 
    default: null, 
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
