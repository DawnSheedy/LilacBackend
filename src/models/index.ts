import "./DiscordUser";
import "./DiscordServer";
import "./MinecraftRoleConfig";
import "./MinecraftClient";
import "./MinecraftUser";
import "./MinecraftSession";
import { db } from "../services/db";

console.log("🔃 Snychronizing Models!");

const isDev = process.env.ENV === "DEVELOPMENT" || process.env.ENV === "TEST";

if (isDev) {
  console.log(
    "🧪 Running in DEVELOPMENT or TEST Environment! 🚧🚧 MODELS WILL FORCIBLY SYNC! 🚧🚧"
  );
}

db.sync({ force: isDev, alter: isDev }).then((syncedDb) => {
  Object.values(syncedDb.models).forEach((model) => {
    console.log(`🔃 Model ${model.name} synced to table ${model.tableName}!`);
  });
  console.log(`✅ All Models Snychronized!`);
});
