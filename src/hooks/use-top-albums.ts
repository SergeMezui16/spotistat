import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import type { SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

export function useTopAlbums(
	timeRange: "short_term" | "medium_term" | "long_term" = "short_term",
) {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topAlbums", timeRange],
		queryFn: async () => {
			const { items: topTracks } = await spotify.currentUser.topItems(
				"tracks",
				timeRange,
				50,
			);

			const albumMap = new Map<
				string,
				{ album: SimplifiedAlbum; count: number }
			>();

			for (const track of topTracks) {
				const album = track.album;

				if (album.album_type === "album") {
					if (!albumMap.has(album.id)) {
						albumMap.set(album.id, { album, count: 1 });
					} else {
						albumMap.get(album.id)!.count += 1;
					}
				}
			}

			const sortedAlbums = Array.from(albumMap.values())
				.sort((a, b) => b.count - a.count)
				.map((entry) => entry.album);

			return sortedAlbums;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
