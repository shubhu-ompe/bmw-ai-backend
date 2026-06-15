const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {

    try {

        const question = req.body.question;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: question
                        }]
                    }]
                })
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Server Error"
        });

    }

});

app.listen(3000, () => {
    console.log("BMW AI Backend Running On Port 3000");
});