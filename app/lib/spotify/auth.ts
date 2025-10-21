import { env } from "~/lib/env";
import type { AccessToken } from "./types";
import { getAccessToken as retrieveToken, saveAccessToken } from "./store";

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

export async function getAccessToken(code: string): Promise<AccessToken> {
	const codeVerifier = localStorage.getItem("code_verifier");

	if (!codeVerifier) {
		throw new Error("Code verifier not found in local storage");
	}

	const body = new URLSearchParams({
		client_id: clientId,
		grant_type: "authorization_code",
		code,
		redirect_uri: env.VITE_SPOTIFY_REDIRECT_URI,
		code_verifier: codeVerifier,
	});

	const response = await fetch(`${env.VITE_SPOTIFY_AUTH_BASE_URL}/api/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	return (await response.json()) as AccessToken;
}

export async function refreshAccessToken(): Promise<AccessToken> {
	const refreshToken = retrieveToken()?.refresh_token;

	if (!refreshToken) {
		throw new Error("Refresh token not available");
	}

	const body = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
		client_id: clientId,
	});

	const response = await fetch(`${env.VITE_SPOTIFY_AUTH_BASE_URL}/api/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	if (!response.ok) {
		throw new Error(`Failed to refresh token: ${response.statusText}`);
	}

	const data = (await response.json()) as AccessToken;

	// Update stored tokens
	if (data.access_token) {
		saveAccessToken(data);
	}

	return data;
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
