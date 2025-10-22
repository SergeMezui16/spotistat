import { useQuery } from "@tanstack/react-query";
import { useSpotify } from ".";

export function useTopTracks(timeRange: "short_term" | "medium_term" | "long_term" = "short_term") {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topTracks", timeRange],
		queryFn: async () => {
			return await spotify.currentUser.topItems("tracks", timeRange, 20);
		},
		staleTime: 1000 * 60 * 5,
	});
}