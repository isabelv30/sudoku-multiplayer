import express from "express"; // or const express = require("express") if using CommonJS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Express API!" });
});

// Example of a POST route
app.post("/api/items", (req, res) => {
    const item = req.body;
    res.status(201).json({ message: "Item created", item });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
