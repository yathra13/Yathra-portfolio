const express = require("express");

const app = express();

app.use(express.json());

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.json({ message: "Data received by backend!" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});