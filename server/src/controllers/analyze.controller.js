import { getRepoStructure } from "../services/github.service.js";

/**
 * FUNCTION: analyzeRepo
 * PURPOSE: GitHub repository URL ko process karke repo ki file/folder structure dena.
 * AI explanation ab yahan nahi hoga — user jab kisi file ka button click kare tab hoga.
 *
 * @param {Object} req - Express request object (req.body.repoUrl chahiye)
 * @param {Object} res - Express response object
 */
export const analyzeRepo = async (req, res) => {
  try {
    // ==========================================
    // 1. INPUT EXTRACTION
    // ==========================================
    const { repoUrl } = req.body;

    // ==========================================
    // 2. VALIDATION
    // ==========================================
    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL is required" });
    }

    // URL PARSING — trailing slash hatakar owner aur repo nikalo
    const parts = repoUrl.replace(/\/$/, "").split("/");
    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo || !repoUrl.includes("github.com")) {
      return res.status(400).json({ message: "Invalid repo link" });
    }

    // ==========================================
    // 3. FETCH STRUCTURE
    // ==========================================
    const structure = await getRepoStructure(owner, repo);

    return res.json({ owner, repo, structure });

  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error"
    });
  }
};