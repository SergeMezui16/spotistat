import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import type {
	SimplifiedAlbum,
	SpotifyApi,
	Track,
} from "@spotify/web-api-ts-sdk";
import type { TimeRange, TopCount } from "@/types";

export interface TopAlbum {
	id: string;
	name: string;
	artist: string;
	image: string;
	score: number;
	trackCount: number;
}

export function useTopAlbums(timeRange: TimeRange = "short_term", limit: TopCount = 10) {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["topAlbums", timeRange, limit],
		queryFn: async () => {
			return await getTopAlbumsLinearDecay(spotify, timeRange, limit);
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}

export async function getTopAlbumCount(
	sdk: SpotifyApi,
	timeRange: TimeRange,
): Promise<TopAlbum[]> {
	const limit = 50;
	const maxTracks = 300;
	const offsets = Array.from(
		{ length: maxTracks / limit },
		(_, i) => i * limit,
	);

	const allTracks: Track[] = [];

	// Fetch up to 300 tracks
	for (const offset of offsets) {
		const result = await sdk.currentUser.topItems(
			"tracks",
			timeRange,
			limit,
			offset,
		);
		allTracks.push(...result.items);
	}

	const albumMap = new Map<string, { album: SimplifiedAlbum; count: number }>();

	for (const track of allTracks) {
		const album = track.album;

		if (album.album_type === "album") {
			if (!albumMap.has(album.id)) {
				albumMap.set(album.id, { album, count: 1 });
			} else {
				// biome-ignore lint/style/noNonNullAssertion: Siaa
				albumMap.get(album.id)!.count += 1;
			}
		}
	}

	const sortedAlbums = Array.from(albumMap.values())
		.sort((a, b) => b.count - a.count)
		.map(({ album, count }) => ({
			id: album.id,
			name: album.name,
			artist: album.artists.map((a) => a.name).join(", "),
			image: album.images?.[0]?.url || "",
			score: count,
			trackCount: album.total_tracks,
		}));

	return sortedAlbums;
}

/**
 * Fetches and ranks the user's top albums based on their top tracks.
 * Weights each track by rank, aggregates by album, and normalizes by album size.
 */
export async function getTopAlbumsLinearDecay(
	sdk: SpotifyApi,
	timeRange: TimeRange,
	limitAlbum: TopCount
): Promise<TopAlbum[]> {
	const limit = 50;
	const maxTracks = 300;
	const offsets = Array.from(
		{ length: maxTracks / limit },
		(_, i) => i * limit,
	);

	const allTracks: Track[] = [];

	// Fetch up to 300 tracks
	for (const offset of offsets) {
		const result = await sdk.currentUser.topItems(
			"tracks",
			timeRange,
			limit,
			offset,
		);
		allTracks.push(...result.items);
	}

	// Weight function (linear decay)
	const rankWeight = (rank: number) => maxTracks + 1 - rank;

	const albumScores = new Map<
		string,
		{
			name: string;
			artist: string;
			image: string;
			totalScore: number;
			trackCount: number;
		}
	>();

	allTracks.forEach((track, index) => {
		const albumId = track.album.id;
		const albumName = track.album.name;
		const artist = track.album.artists.map((a) => a.name).join(", ");
		const image = track.album.images?.[0]?.url || "";
		const score = rankWeight(index + 1);

		if (!albumScores.has(albumId)) {
			albumScores.set(albumId, {
				name: albumName,
				artist,
				image,
				totalScore: 0,
				trackCount: 0,
			});
		}

		// biome-ignore lint/style/noNonNullAssertion: CALMA
		const album = albumScores.get(albumId)!;
		album.totalScore += score;
		album.trackCount += 1;
	});

	for (const album of albumScores.values()) {
		album.totalScore = album.totalScore / Math.sqrt(album.trackCount);
	}

	const topAlbums: TopAlbum[] = Array.from(albumScores.entries())
		.map(([id, album]) => ({
			id,
			name: album.name,
			artist: album.artist,
			image: album.image,
			score: album.totalScore,
			trackCount: album.trackCount,
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, limitAlbum);

	return topAlbums;
}
