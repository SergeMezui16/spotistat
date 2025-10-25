import { useQuery } from "@tanstack/react-query";
import { useSpotify } from ".";
import type { TimeRange, TopCount } from "@/types";

export function useTopArtists(timeRange: TimeRange = "short_term", limit: TopCount = 10) {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topArtists", timeRange, limit],
		queryFn: async () => {
			return await spotify.currentUser.topItems("artists", timeRange, limit);
		},
		staleTime: 1000 * 60 * 5,
	});
}