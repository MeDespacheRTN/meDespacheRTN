require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./src/routes/payment");
const authRoutes = require("./src/routes/authRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const comercianteRoutes = require("./src/routes/comercianteRoutes");
const carrinhoRoutes = require("./src/routes/carrinhoRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// SOLUÇÃO: Passando um RegExp puro (/.*/) SEM aspas
app.options(/.*/, cors());

app.use(express.json());

app.use("/payment", paymentRoutes);
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/comerciante", comercianteRoutes);
app.use("/carrinho", carrinhoRoutes);

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "OK" : "UNDEFINED");

if (process.env.NODE_ENV !== "production") {
  app.listen(5005, () => {
    console.log("Servidor rodando na porta 5005");
  });
}

module.exports = app;