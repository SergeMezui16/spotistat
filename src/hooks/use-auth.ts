import { useState, useEffect, useCallback } from "react";
import { login, exchangeCodeForToken, refreshAccessToken } from "@/lib/auth";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
	isRefreshing: boolean;
	error: string | null;
	login: () => void;
	logout: () => void;
}

/**
 * useAuth hook manages Spotify login, token exchange, refresh, and state
 */
export function useAuth(): AuthState {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(
		localStorage.getItem("spotify_refresh"),
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = useCallback(() => {
		login();
	}, []);

	const handleLogout = useCallback(() => {
		setAccessToken(null);
		setRefreshToken(null);
		localStorage.removeItem("spotify_refresh");
		window.location.href = "/";
	}, []);

	const doRefresh = useCallback(async () => {
		if (!refreshToken) return;
		try {
			setIsRefreshing(true);
			const data = await refreshAccessToken(refreshToken);
			if (data.access_token) {
				setAccessToken(data.access_token);
			} else {
				throw new Error("No access token received");
			}
		} catch (err: any) {
			console.error("Refresh failed:", err);
			setError(err.message);
		} finally {
			setIsRefreshing(false);
		}
	}, [refreshToken]);

	/** Initial load: check URL for code or try refreshing existing token */
	useEffect(() => {
		async function initAuth() {
			try {
				const params = new URLSearchParams(window.location.search);
				const code = params.get("code");

				if (code) {
					const data = await exchangeCodeForToken(code);
					if (data.access_token && data.refresh_token) {
						setAccessToken(data.access_token);
						setRefreshToken(data.refresh_token);
						localStorage.setItem("spotify_refresh", data.refresh_token);
					} else {
						throw new Error("Invalid token response");
					}

					window.history.replaceState({}, "", "/");
				} else if (refreshToken) {
					await doRefresh();
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		initAuth();
	}, [refreshToken, doRefresh]);

	return {
		accessToken,
		refreshToken,
		isLoading,
		isRefreshing,
		error,
		login: handleLogin,
		logout: handleLogout,
	};
}
