import "./db";
import "./models/video";
import app from "./server";
import * as path from "path";
const PORT = 4000;
const handleListening = () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
};
app.listen(PORT, handleListening);
