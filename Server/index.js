import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/Users.js";

dotenv.config();

const app = express();

// ✅ Allow requests only from your frontend domain
app.use(
  cors({
    origin: [
      "https://crud-operation-frontend-amber.vercel.app", // your frontend
      "http://localhost:5173", // local dev (optional)
      "https://amya-verboten-nonmethodically.ngrok-free.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connection (global-safe for Vercel)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas:", conn.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// ✅ Root Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend running successfully on Vercel!" });
});

// ✅ Create User
app.post("/create-user", async (req, res) => {
  try {
    const { username, email, age } = req.body;
    if (!username || !email || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await UserModel.create({ username, email, age });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Single User by ID
app.get("/getuser/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update User
app.put("/update-user/:id", async (req, res) => {
  try {
    const { username, email, age } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { username, email, age },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete User
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Localhost runnin on http://localhost:${PORT}`)
})

// ✅ Export for Vercel
export default app;
