import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import type { TopCount } from "@/types";

export const useQueueTracks = (limit: TopCount = 10) => {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["queryTracks", limit],
		queryFn: async () => {
			return await spotify.player.getUsersQueue();
		},
		staleTime: 1000 * 10,
		refetchInterval: 1000 * 10,
	});
};
