# 📚 BookMind — Smart Book Recommendation System

🚀 **BookMind** is a full-stack AI-powered book recommendation platform that suggests similar books using **Collaborative Filtering & KNN**. Built with **Machine Learning + Node.js + React**, deployed live on **Vercel**.

🌐 **Live Demo** 👉 [https://bookmind-seven.vercel.app/](https://bookmind-seven.vercel.app/)

---

## ✨ Features

* 🔍 **Instant Book Recommendations**
* 🤖 **ML-based Collaborative Filtering (KNN)**
* ⚡ **Fast REST API Backend**
* 🎯 **Clean & Responsive Frontend**
* 🌍 **Deployed Online (Backend + Frontend)**
* 📊 **Pre-trained ML model for quick responses**

---

## 🧠 How It Works

1. User selects a book 📖
2. Backend loads a pre-trained KNN model
3. Finds similar users & books using rating patterns
4. Returns Top-N recommended books
5. Frontend displays results instantly ⚡

---

## 🏗️ Tech Stack

### 🔹 Frontend
* ⚛️ **React**
* 🌐 **Fetch API / Axios**
* 🎨 **CSS / Modern UI**
* 🚀 **Deployed on Vercel**

### 🔹 Backend
* 🟢 **Node.js**
* ⚡ **Express.js**
* 🤖 **Python ML model (KNN)**
* 🌐 **REST API**
* 🚀 **Deployed on Render / Railway**

### 🔹 Machine Learning
* 🧮 **Collaborative Filtering**
* 📐 **Nearest Neighbors (KNN)**
* 📊 **User-Item Rating Matrix**
* 🗂️ **Pickle Models (`.pkl`)**

---

## 📂 Project Structure

```
BookMind/
│
├── backend/
│   ├── server.js
│   ├── model.pkl
│   ├── book_pivot.pkl
│   ├── final_rating.pkl
│   ├── book_names.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ API Endpoint

### 🔹 Get Recommendations

```http
POST /recommend
```

**Request Body**

```json
{
  "book_name": "Harry Potter and the Sorcerer's Stone"
}
```

**Response**

```json
{
  "recommendations": [
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban",
    "The Hobbit",
    "Percy Jackson and the Lightning Thief"
  ]
}
```

---

## 🧪 Machine Learning Details

* **Algorithm:** K-Nearest Neighbors
* **Distance Metric:** Cosine Similarity
* **Input:** User-Book Rating Matrix
* **Output:** Top-N Similar Books

📦 Stored as serialized `.pkl` files for fast inference.

---

## 🚀 Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sane-eagle/BookMind.git
cd BookMind
```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
node server.js
```

Backend will start on:
```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on:
```
http://localhost:5173
```

---

## 🌍 Deployment

* **Frontend:** Vercel
* **Backend:** Render / Railway
* **ML Model:** Preloaded Pickle Files

✅ Fully connected production environment.

---

## 📊 Dataset

* 📚 **Book Recommendation Dataset**
* 👥 **User-Book Ratings**
* ⭐ **Explicit feedback based system**

**Source:** [Kaggle](https://www.kaggle.com/)

---

## 🙌 Author

**Yash Sawant**  
👨‍💻 Full-Stack Developer | ML Enthusiast  
📧 yashsawant868@gmail.com  
🌐 GitHub: [https://github.com/sane-eagle](https://github.com/sane-eagle)

---

## ⭐ Support the Project

If you like **BookMind**:

* ⭐ **Star the repo**
* 🍴 **Fork it**
* 🧠 **Improve the model**
* 🎨 **Enhance the UI**

---

**Made with ❤️ by Yash Sawant**
