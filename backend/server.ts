import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({   origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true }));

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

app.post("/api/auth/callback", async (req, res) => {
  const { code, redirect_uri, code_verifier } = req.body;
  console.log("Received auth callback with code:", code);

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri,
    code_verifier,
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log("Token response status:", response.status);

  const data = await response.json();
  res.json(data);
});

app.post("/api/auth/refresh", async (req, res) => {
  const { refresh_token } = req.body;

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    grant_type: "refresh_token",
    refresh_token,
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("✅ Backend running on http://localhost:3000"));
