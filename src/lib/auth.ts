import { API_URL } from "./api-config";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.DEV
	? "http://127.0.0.1:5173/"
	: import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = [
	"user-top-read",
	"ugc-image-upload",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"streaming",
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-private",
	"playlist-modify-public",
	"user-follow-modify",
	"user-follow-read",
	"user-read-recently-played",
	"user-library-modify",
	"user-library-read",
	"user-read-private",
];

export function login() {
	const params = new URLSearchParams({
		client_id: CLIENT_ID,
		response_type: "code",
		redirect_uri: REDIRECT_URI,
		scope: SCOPES.join(" "),
	});

	window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
	const res = await fetch(`${API_URL}/api/auth/callback`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code }),
	});
	return res.json();
}

export async function refreshAccessToken(refresh_token: string) {
	const res = await fetch(`${API_URL}/api/auth/refresh`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refresh_token }),
	});
	return res.json();
}
