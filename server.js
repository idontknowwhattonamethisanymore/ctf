const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Serve static files (your HTML)
app.use(express.static(path.join(__dirname, "templates")));

// Proxy chat requests to Flask
app.post("/api/chat", async (req, res) => {
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Proxy error" });
    }
});

app.listen(3000, () => {
    console.log("Frontend server running on http://localhost:3000");
});
