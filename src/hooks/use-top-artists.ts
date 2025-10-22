import { useQuery } from "@tanstack/react-query";
import { useSpotify } from ".";

export function useTopArtists(timeRange: "short_term" | "medium_term" | "long_term" = "short_term") {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topArtists", timeRange],
		queryFn: async () => {
			return await spotify.currentUser.topItems("artists", timeRange, 20);
		},
		staleTime: 1000 * 60 * 5,
	});
}