import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const api = SpotifyApi.withClientCredentials(
	"20d37400d4bf4280ad7f6a3a1f5d2e43",
	"69706a5617ff4a02a411a7b793c0c595",
);

const sdk = SpotifyApi.withAccessToken("20d37400d4bf4280ad7f6a3a1f5d2e43", {
	access_token: "wed",
	expires_in: 123,
	refresh_token: "qwd",
	token_type: "Bearer",
	expires: 4567,
});

sdk.player.getRecentlyPlayedTracks(20);
