import { Sequelize, DataTypes, Model } from "sequelize";

// Initialize Sequelize
const sequelize = new Sequelize("sqlite::memory:");

// Define the model
class Todo extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
}

Todo.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);

// Synchronize the database
await sequelize.sync();

export { sequelize, Todo };
