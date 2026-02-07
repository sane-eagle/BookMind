from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

# -----------------------------
# App setup
# -----------------------------
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -----------------------------
# Load artifacts safely
# -----------------------------
model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
book_pivot = pickle.load(open(os.path.join(BASE_DIR, "book_pivot.pkl"), "rb"))
final_rating = pickle.load(open(os.path.join(BASE_DIR, "final_rating.pkl"), "rb"))

# -----------------------------
# Health check (IMPORTANT for Railway)
# -----------------------------
@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "BookMind backend running"}), 200

# -----------------------------
# Recommendation endpoint
# -----------------------------
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    book_name = data.get("bookName")

    if not book_name:
        return jsonify({"error": "bookName is required"}), 400

    # Case-insensitive partial match
    matches = [
        title for title in book_pivot.index
        if book_name.lower() in title.lower()
    ]

    # IMPORTANT: return empty list, NOT 404
    if not matches:
        return jsonify({
            "query": book_name,
            "matched": None,
            "recommended_books": []
        }), 200

    matched_title = matches[0]
    book_id = np.where(book_pivot.index == matched_title)[0][0]

    distances, indices = model.kneighbors(
        book_pivot.iloc[book_id].values.reshape(1, -1),
        n_neighbors=min(6, len(book_pivot))
    )

    recommended_books = []

    for i in indices[0][1:]:
        title = book_pivot.index[i]

        row = final_rating[final_rating["title"] == title]
        if row.empty:
            continue

        book = row.iloc[0]

        # RETURN ONLY TITLE (frontend handles Google Books)
        recommended_books.append({
            "title": book["title"]
        })

    return jsonify({
        "query": book_name,
        "matched": matched_title,
        "recommended_books": recommended_books
    }), 200

# -----------------------------
# App entry
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
