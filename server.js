import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";
const corsOrigins = isProduction
	? process.env.FRONTEND_URL
	: ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
	cors({
		origin: corsOrigins,
		credentials: true,
	}),
);

if (isProduction) {
	app.use(express.static(path.join(__dirname, "dist")));
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// Use Netlify's deploy URL, with a fallback for local development
const REDIRECT_URI = process.env.URL
	? `${process.env.URL}/`
	: "http://127.0.0.1:5173/";

app.post("/api/auth/callback", async (req, res) => {
	const code = req.body.code;
	if (!code) return res.status(400).json({ error: "Missing code" });

	try {
		const params = new URLSearchParams();
		params.append("grant_type", "authorization_code");
		params.append("code", code);
		params.append("redirect_uri", REDIRECT_URI);

		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			params,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		res.json(response.data);
	} catch (err) {
		console.error(err.response?.data || err.message);
		res.status(500).json({ error: "Failed to exchange code" });
	}
});

app.post("/api/auth/refresh", async (req, res) => {
	const refresh_token = req.body.refresh_token;
	if (!refresh_token)
		return res.status(400).json({ error: "Missing refresh token" });

	try {
		const params = new URLSearchParams();
		params.append("grant_type", "refresh_token");
		params.append("refresh_token", refresh_token);

		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			params,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		res.json(response.data);
	} catch (err) {
		console.error(err.response?.data || err.message);
		res.status(500).json({ error: "Failed to refresh token" });
	}
});

if (isProduction) {
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
