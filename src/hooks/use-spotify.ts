import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useContext } from "react";
import { SpotifyContext } from "@/providers/spotify-context";

export function useSpotify(): SpotifyApi {
	const context = useContext(SpotifyContext);
	if (!context) {
		throw new Error("useSpotify must be used within a SpotifyProvider");
	}
	return context.sdk;
}
