function base64URLEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

export async function loginWithSpotify() {
  const code_verifier = base64URLEncode(crypto.getRandomValues(new Uint8Array(64)));
  const code_challenge = base64URLEncode(await sha256(code_verifier));

  sessionStorage.setItem("spotify_code_verifier", code_verifier);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: "http://127.0.0.1:5173/",
    scope: "user-top-read",
    code_challenge_method: "S256",
    code_challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

export async function handleAuthCallback() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) return null;

  const code_verifier = sessionStorage.getItem("spotify_code_verifier");
  if (!code_verifier) return null;

  const response = await fetch("http://localhost:3000/api/auth/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      redirect_uri: "http://127.0.0.1:5173/",
      code_verifier,
    }),
  });

  const data = await response.json();
  sessionStorage.setItem("spotify_refresh_token", data.refresh_token);
  sessionStorage.setItem("spotify_access_token", data.access_token);
  history.replaceState(null, "", "/"); // clean URL
  return data.access_token;
}
