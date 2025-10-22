import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:5173/";

app.post("/api/auth/callback", async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);

    const response = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to exchange code" });
  }
});

app.post("/api/auth/refresh", async (req, res) => {
  const refresh_token = req.body.refresh_token;
  if (!refresh_token) return res.status(400).json({ error: "Missing refresh token" });

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);

    const response = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

app.listen(3000, () => console.log("🚀 Backend running on http://localhost:3000"));
