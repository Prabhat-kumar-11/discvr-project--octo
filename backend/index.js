require("dotenv").config();
const express = require("express");
const cors = require("cors");
const products = require("./products");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/api/ask", async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "text missing"});
  }

  console.log(query);

  try {
    const productText = products
      .map(
        (p) =>
          `${p.id}. ${p.name} - ${p.category} - ${p.price} - ${p.tags.join(", ")}`,
      )
      .join("\n");

      console.log("porudctText", productText);


    const prompt = `
User query: "${query}"

Available products:
${productText}

IMPORTANT:
Return ONLY valid JSON.
Do not add explanation.
Format exactly like this:

{
  "productIds": [numbers],
  "summary": "short explanation"
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Remove markdown formatting if Gemini adds it
    text = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.log("JSON Parse Error:", text);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const filteredProducts = products.filter((p) =>
      parsed.productIds.includes(p.id),
    );

    res.json({
      products: filteredProducts,
      summary: parsed.summary,
    });
  } catch (error) {
    console.log("AI Error:", error.message || error);
    res
      .status(503)
      .json({ error: "AI service temporarily unavailable. Please try again." });
  }
});

// GET all products — supports ?category= and ?q= filters
app.get("/api/products", (req, res) => {
  const { category, q } = req.query;
  let result = products;

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term)),
    );
  }

  res.json(result);
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server is not running:", error);
  } else {
    console.log("Server running on port", PORT);
  }
});
