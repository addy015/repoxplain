import { generateExplanation } from "../services/ai.service.js";
import { getFileContent } from "../services/github.service.js";

/**
 * FUNCTION: explainFile
 * PURPOSE: User ke diye gaye file path ke liye AI-generated explanation return karna.
 *
 * @param {Object} req - Express request (req.body.filePath, owner, repo chahiye)
 * @param {Object} res - Express response
 */
export const explainFile = async (req, res) => {
  try {
    const { filePath, owner, repo } = req.body;

    if (!filePath || !owner || !repo) {
      return res.status(400).json({ error: "filePath, owner, and repo are required" });
    }

    // Fetch file content from GitHub
    const fileContent = await getFileContent(owner, repo, filePath);

    // Generate explanation using either code (if fetched) or just path
    const explanation = await generateExplanation(filePath, fileContent);

    return res.json({ explanation });
  } catch (error) {
    console.log("Explain Error:", error.message);
    return res.status(500).json({ error: "Failed to generate explanation" });
  }
};

