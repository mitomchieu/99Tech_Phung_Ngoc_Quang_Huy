import express, { Application } from "express";
import todoRoutes from "./routes/todo.routes";
import { sequelize } from "./models/todo.model";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Initialize Sequelize and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to synchronize database:", err);
  });
