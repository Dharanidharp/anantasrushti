// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors()); // Allow your HTML file to talk to this server
app.use(express.json());

// Initialize OpenAI (Example Provider)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST Endpoint: Generate
app.post('/api/generate', async (req, res) => {
    const { context, prompt, model } = req.body;

    console.log(`[${context.toUpperCase()}] Request for model: ${model}`);

    try {
        let resultUrl = "";

        // --- IMAGE GENERATION LOGIC ---
        if (context === 'image') {
            // Example: Using DALL-E 3
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });
            resultUrl = response.data[0].url;
        } 
        
        // --- VIDEO GENERATION LOGIC (Placeholder for Future APIs like Sora/Kling) ---
        else if (context === 'video') {
            // Note: Sora/Kling APIs are often closed beta. 
            // You would use 'axios' or their SDK here.
            // Example Logic:
            // const vid = await runway.generate({ prompt });
            
            // For now, we return a delay to simulate processing
            await new Promise(r => setTimeout(r, 3000));
            resultUrl = "https://placehold.co/1920x1080/111/FFF.mp4?text=Video+Generated+(Requires+Real+API)";
        }

        // --- AUDIO GENERATION LOGIC ---
        else if (context === 'audio') {
            // Call ElevenLabs or Suno API here
            resultUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
        }

        // Send Success Response
        res.json({ 
            success: true, 
            url: resultUrl, 
            model: model 
        });

    } catch (error) {
        console.error("Generation Error:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message || "Failed to generate content" 
        });
    }
});

const PORT = 3000;
// Add this simple route to verify the server is running
app.get('/', (req, res) => {
    res.send('✅ Srushti Backend is Active and Listening!');
});
app.listen(PORT, () => console.log(`Srushti Backend running on http://localhost:${PORT}`));