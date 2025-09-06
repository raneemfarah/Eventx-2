import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; 
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRouter from "./routes/ticketRouter.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongo");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server is running ${PORT}`));
  })
  .catch((err) => console.error("connection error:", err));
