import express, { Request, Response } from "express";
import { Todo } from "../models/todo.model";

const router = express.Router();

// Create a new to-do
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const newTodo = await Todo.create({ title, description, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all to-dos with optional filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { completed } = req.query;
    const where = completed !== undefined ? { completed: completed === "true" } : undefined;
    const todos = await Todo.findAll({ where });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single to-do by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a to-do by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const [updated] = await Todo.update(
      { title, description, completed },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updatedTodo = await Todo.findByPk(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a to-do by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
