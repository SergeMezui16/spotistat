import { useCurrentTrack, useIsMobile } from "@/hooks";
import { Skeleton } from "../ui/skeleton";
import { MarqueeText } from "../ui/marquee-text";

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
		<div className="flex w-full cursor-pointer items-center gap-2 rounded bg-amber-10 px-2 py-1">
			<img
				src={track.item.album.images[0].url}
				alt={track.item.name}
				width={40}
				height={40}
				className="rounded"
			/>
			<div className="flex w-full min-w-0 flex-col">
				<span className="text-nowrap text-start">
					<Slicer text={track.item.name} />
				</span>
				<span className="text-nowrap text-start text-muted-foreground text-xs">
					<Slicer text={track.item.artists.map((a) => a.name).join(", ")} />
				</span>
			</div>
		</div>
	);
}

const Slicer = ({text}:{text: string}) => {
	const isMobile = useIsMobile();

	if (!isMobile) return text;

	if (text.length <= 10) return text;

	return `${text.slice(0, 10)}...`;
}