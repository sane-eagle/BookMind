import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// Load env vars FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ===== ENV CHECK =====
const ML_RECOMMENDER_URL = process.env.ML_RECOMMENDER_URL;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!ML_RECOMMENDER_URL) {
  console.error("❌ ML_RECOMMENDER_URL is missing in env variables");
}

// ===== Predefined mappings =====
const predefinedCategories = {
  genres: {
    adventure: "adventure",
    fantasy: "fantasy",
    mystery: "mystery",
    romance: "romance",
    "science fiction": "science+fiction",
    thriller: "thriller",
  },
  emotions: {
    happy: "happiness+positive",
    sad: "grief+melancholy",
    anxiety: "self-help+calm",
    motivated: "inspiration+motivation",
    inspirational: "biography+success",
  },
};

// ===== ROUTES =====

// Health check (IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.json({ status: "Backend running ✅" });
});

// 🔥 ML Recommendation Route
app.get("/api/recommend", async (req, res) => {
  const { book } = req.query;

  if (!book) {
    return res.status(400).json({ error: "Book name is required" });
  }

  try {
    const response = await axios.get(ML_RECOMMENDER_URL, {
      params: { book },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ ML Service Error:", error.message);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

// 📚 Google Books Search Route
app.get("/api/books", async (req, res) => {
  const { query, type } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  let searchTerm = query;

  if (type === "genre") {
    searchTerm = predefinedCategories.genres[query.toLowerCase()] || query;
  } else if (type === "emotion") {
    searchTerm = predefinedCategories.emotions[query.toLowerCase()] || query;
  } else if (type === "author") {
    searchTerm = `inauthor:${query}`;
  } else if (type === "name") {
    searchTerm = `intitle:${query}`;
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: {
          q: searchTerm,
          key: GOOGLE_API_KEY,
          maxResults: 20,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Google Books API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
