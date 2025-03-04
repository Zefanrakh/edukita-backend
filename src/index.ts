import { config } from "dotenv";
import { createApp } from "./createApp";

config();

const app = createApp();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
