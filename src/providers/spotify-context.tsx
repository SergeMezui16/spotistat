import { type PropsWithChildren, createContext } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

type SpotifyContextValue = {
	sdk: SpotifyApi;
};

type Props = PropsWithChildren & {
	refreshToken: string;
	accessToken: string;
};

export const SpotifyContext = createContext<SpotifyContextValue | null>(null);

export const SpotifyProvider = ({
	children,
	refreshToken,
	accessToken,
}: Props) => {
	const sdk = (() => {
		return SpotifyApi.withAccessToken(import.meta.env.VITE_SPOTIFY_CLIENT_ID, {
			access_token: accessToken,
			token_type: "Bearer",
			expires_in: 3600,
			refresh_token: refreshToken,
		});
	})();

	if (!sdk) return null;

	return (
		<SpotifyContext.Provider value={{ sdk }}>
			{children}
		</SpotifyContext.Provider>
	);
};
