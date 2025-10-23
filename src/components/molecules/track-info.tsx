import { useCurrentTrack } from "@/hooks";
import { Skeleton } from "../ui/skeleton";

export function TrackInfo() {
	const { data: track, isLoading } = useCurrentTrack();

	if (isLoading) {
		return (
			<div className="flex gap-2 px-2 py-1">
				<Skeleton className="h-10 w-10 rounded" />
				<div className="flex flex-col">
					<Skeleton className="mt-1 mb-1 h-4 w-24" />
					<Skeleton className="h-3 w-20" />
				</div>
			</div>
		);
	}

	if (!track) {
		return (
			<div className="px-2 py-1 text-muted-foreground text-sm">
				No track playing.
			</div>
		);
	}

	return (
		<div className="flex cursor-pointer gap-2 rounded px-2 py-1">
			<img
				src={track.item.album.images[0].url}
				alt=""
				width={40}
				height={40}
				className="rounded"
			/>
			<div className="flex flex-col">
				<span className="text-start font-medium text-sm">
					{track.item.name}
				</span>
				<span className="text-start text-muted-foreground text-xs">
					{track.item.artists.map((a) => a.name).join(", ")}
				</span>
			</div>
		</div>
	);
}
