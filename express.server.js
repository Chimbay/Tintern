// For local server
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
const app = express();
const PORT = 8080;

export async function startExpressServer() {
  // Run CORS for react port
app.use(cors());
// Middleware to parse JSON request body
app.use(express.json());
// Get the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Path to the JSON file
const filePath = path.join(__dirname, "backend", "ignore_list.json");
// GET route to retrieve the JSON file
app.get("/api/data", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }
    res.json(JSON.parse(data));
  });
});
// POST route to modify and save data to the JSON file
app.post("/api/data", (req, res) => {
  const file = "ignore_list.json"
  fs.readFile(file, (err, data) => {
    const existingData = JSON.parse(data || []);
    existingData.push(req.body);
    fs.writeFile(file, JSON.stringify(existingData), () => {
      res.json({message: "Data added successfully"})
    })
  })
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
}