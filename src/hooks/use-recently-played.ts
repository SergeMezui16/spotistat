import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import type { TopCount } from "@/types";

export const useRecentlyPlayed = (limit: TopCount = 10) => {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["recentlyPlayed"],
		queryFn: async () => {
			return await spotify.player.getRecentlyPlayedTracks(limit);
		},
		staleTime: 1000 * 10,
		refetchInterval: 1000 * 10,
	});
};
