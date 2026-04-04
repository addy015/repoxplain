/**
 * Ye file GitHub repository analysis ke liye API routes define karti hai.
 * Yahan par endpoints ko unke respective controller functions se map kiya jata hai.
 * Ye ek modular routing structure maintain karne mein help karta hai.
 */

import express from "express";
import { analyzeRepo } from "../controllers/analyze.controller.js";
import { explainFile } from "../controllers/explain.controller.js";

// Express Router ka instance create kar rahe hain
const router = express.Router();

// ENDPOINTS 

// POST /api/analyze — Repo ka file/folder structure fetch karo
router.post("/analyze", analyzeRepo);

// POST /api/explain — Kisi ek file ka AI explanation fetch karo (on-demand)
router.post("/explain", explainFile);

export default router;