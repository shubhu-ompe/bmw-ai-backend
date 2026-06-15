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
"https://bmw-ai-backend.onrender.com/ask",
{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    question: systemPrompt + "\n\n" + finalQuestion
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`BMW AI Backend Running On Port ${PORT}`);
});