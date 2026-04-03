import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import app from "./app.js";

// ==========================================
// CONFIGURATION SECTION
// ==========================================
// Port define kar rahe hain jispar local server chalega
const PORT = 3000;

// ==========================================
// SERVER INITIALIZATION
// ==========================================
/**
 * app.listen function server ko start karta hai.
 * Ye port 3000 par incoming HTTP requests ka wait karega.
 * Jaise hi server start hota hai, console par confirmation print hoti hai.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});