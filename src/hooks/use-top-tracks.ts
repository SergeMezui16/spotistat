import { useQuery } from "@tanstack/react-query";
import { useSpotify } from ".";
import type { TimeRange, TopCount } from "@/types";

export function useTopTracks(timeRange: TimeRange = "short_term", limit: TopCount = 10) {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topTracks", timeRange, limit],
		queryFn: async () => {
			return await spotify.currentUser.topItems("tracks", timeRange, limit);
		},
		staleTime: 1000 * 60 * 5,
	});
}