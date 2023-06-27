import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.POSTGRES_URI, { logging: false });

const healthCheck = async () => {
  console.log("🩺 Performing DB Health Check...");
  try {
    await db.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

healthCheck();

export { db };
