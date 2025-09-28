import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Result from "../models/Result.js";

async function analyzeXray(base64Image) {
  // Replace with your real AI API call
  return {
    case: "covid", // "covid" | "normal" | "viral"
    confidence: Math.random(), // Example confidence
  };
}

const predict = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Convert file to Base64
    const filePath = path.join(file.destination, file.filename);
    const fileData = fs.readFileSync(filePath);
    const base64Image = fileData.toString("base64");

    // Call AI Analyzer
    const aiResult = await analyzeXray(base64Image);

    // Optional: store file URL (can be uploaded to cloud storage)
    const imageUrl = `/uploads/${file.filename}`;

    // Prepare MongoDB document
    const resultDoc = new Result({
      userId: new mongoose.Types.ObjectId(userId),
      case: aiResult.case,
      confidence: aiResult.confidence,
      date: new Date(),
      imageUrl,
    });

    await resultDoc.save();

    // Delete local file after processing
    fs.unlinkSync(filePath);

    res.status(200).json(resultDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export { predict };
