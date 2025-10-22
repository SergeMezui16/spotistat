import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import type { PlaybackState, SimplifiedAlbum, SimplifiedArtist, TrackItem } from "@spotify/web-api-ts-sdk";

export const useCurrentTrack = () => {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["currentTrack"],
		queryFn: async () => {
			return (await spotify.player.getPlaybackState()) as PlaybackStateReturn;
		},
		staleTime: 1000 * 10,
        refetchInterval: 1000 * 10,
	});
};


interface PlaybackStateReturn extends PlaybackState {
    item: TrackItem & {
        artists: SimplifiedArtist[];
        album: SimplifiedAlbum;
    };
}