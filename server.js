import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import bookRoutes from "./src/routes/bookRoutes.js";

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',  // Substitua com o URL correto do seu frontend
  }));
  

app.use("/api", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
