import { Player } from "../molecules/player";
import { useQueueTracks } from "@/hooks";
import type { Episode, Track } from "@spotify/web-api-ts-sdk";

export const RecentlyPlayedSection = () => {
	const { data: tracks } = useQueueTracks();
	return (
		<div className="my-4 flex h-full flex-col">
			<Player />
			<div className="flex h-full flex-col gap-2 overflow-scroll scroll-smooth border-t pt-1 pb-4">
				<h3 className="pl-4 text-lg text-primary-foreground">
					Queue • Next Tracks
				</h3>
				{tracks?.queue.map((q) => {
					if (q.type === "track") {
						return <TrackView key={q.id} track={q as Track} />;
					}

					return <EpisodeView key={q.id} episode={q as Episode} />;
				})}
			</div>
		</div>
	);
};

function TrackView({ track }: { track: Track }) {
	return (
		<div
			className="flex gap-2 pl-4"
			title={`${track.name} • ${track.artists.map((a) => a.name).join(", ")}`}
		>
			<img
				className="h-12 w-12 rounded"
				src={track.album.images[0].url}
				alt={track.album.name}
			/>
			<div className="flex flex-col text-xs">
				<span>{track.name}</span>
				<span className="">{track.artists[0].name}</span>
			</div>
		</div>
	);
}

function EpisodeView({ episode }: { episode: Episode }) {
	return (
		<div
			className="flex gap-2 pl-4"
			title={`${episode.name} • ${episode.description}`}
		>
			<img
				className="h-12 w-12 rounded"
				src={episode.images[0].url}
				alt={episode.name}
			/>
			<div className="flex flex-col text-xs">
				<span>{episode.name}</span>
				<span className="">{episode.show.name}</span>
			</div>
		</div>
	);
}
