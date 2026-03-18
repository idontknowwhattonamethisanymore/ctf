import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const response = await fetch("https://api.ollama.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OLLAMA_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));
