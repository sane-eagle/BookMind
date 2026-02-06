from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# -----------------------------
# Load artifacts
# -----------------------------
model = pickle.load(open("model.pkl", "rb"))
book_pivot = pickle.load(open("book_pivot.pkl", "rb"))
book_names = pickle.load(open("book_names.pkl", "rb"))
final_rating = pickle.load(open("final_rating.pkl", "rb"))

print("FINAL_RATING COLUMNS:")
print(list(final_rating.columns))

# -----------------------------
# Debug titles
# -----------------------------
print("===== SAMPLE BOOK TITLES (first 20) =====")
for title in book_pivot.index[:20]:
    print(repr(title))
print("========================================")

# -----------------------------
# Recommendation endpoint
# -----------------------------
@app.route("/recommend", methods=["GET"])
def recommend():
    book_name = request.args.get("book")

    if not book_name:
        return jsonify({"error": "Missing 'book' query parameter"}), 400

    matches = [
        t for t in book_pivot.index
        if book_name.lower() in t.lower()
    ]

    if not matches:
        return jsonify({"error": "Book not found"}), 404

    matched_title = matches[0]
    book_id = np.where(book_pivot.index == matched_title)[0][0]

    distances, indices = model.kneighbors(
        book_pivot.iloc[book_id].values.reshape(1, -1),
        n_neighbors=min(6, len(book_pivot))
    )

    recommendations = []

    for i in indices[0][1:]:
        title = book_pivot.index[i]

        book_rows = final_rating[final_rating["title"] == title]
        if book_rows.empty:
            continue

        book_info = book_rows.iloc[0]

        recommendations.append({
            "title": book_info["title"],
            "author": book_info["author"],
            "image": book_info["image_url"]
        })

    return jsonify({
        "query": book_name,
        "matched": matched_title,
        "recommendations": recommendations
    })



# -----------------------------
# App entry
# -----------------------------
if __name__ == "__main__":
    app.run(port=5002, debug=False, use_reloader=False)
