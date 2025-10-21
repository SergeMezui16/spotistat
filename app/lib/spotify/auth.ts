import { env } from "~/lib/env";

const clientId = env.VITE_SPOTIFY_CLIENT_ID;
const scopes = [
	"user-read-private",
	"user-read-email",
	"user-read-recently-played",
	"user-read-currently-playing",
	"user-top-read",
];

export async function redirectToSpotifyAuth(): Promise<void> {
	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	localStorage.setItem("code_verifier", verifier);

	const authUrl = new URL(`${env.VITE_SPOTIFY_AUTH_BASE_URL}/authorize`);
	authUrl.searchParams.append("client_id", clientId);
	authUrl.searchParams.append("response_type", "code");
	authUrl.searchParams.append("redirect_uri", env.VITE_SPOTIFY_REDIRECT_URI);
	authUrl.searchParams.append("scope", scopes.join(" "));
	authUrl.searchParams.append("code_challenge_method", "S256");
	authUrl.searchParams.append("code_challenge", challenge);

	window.location.href = authUrl.toString();
}

export async function getAccessToken(code: string): Promise<any> {
	const codeVerifier = localStorage.getItem("code_verifier");

	const body = new URLSearchParams({
		client_id: clientId,
		grant_type: "authorization_code",
		code,
		redirect_uri: env.VITE_SPOTIFY_REDIRECT_URI,
		code_verifier: codeVerifier!,
	});

	const response = await fetch(`${env.VITE_SPOTIFY_AUTH_BASE_URL}/api/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	return await response.json();
}

export async function fetchProfile(token: string): Promise<any> {
	const result = await fetch("https://api.spotify.com/v1/me", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});

	return await result.json();
}

function generateCodeVerifier(length: number) {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return Array.from(
		{ length },
		() => possible[Math.floor(Math.random() * possible.length)],
	).join("");
}

async function generateCodeChallenge(codeVerifier: string) {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}
