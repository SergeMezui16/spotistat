import { useCurrentTrack } from "@/hooks";
import { ProgressBarPlayback } from "./progress-bar-playback";
import { Skeleton } from "../ui/skeleton";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { PauseIcon } from "lucide-react";

export const Player = () => {
	const { data: track, isLoading } = useCurrentTrack();

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-2 p-2">
				<Skeleton className="h-[110px] w-[110px]" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-2 w-24" />
				<Skeleton className="mt-2 h-2 w-full" />
			</div>
		);
	}

	if (!track) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<PauseIcon />
					</EmptyMedia>
					<EmptyTitle>No track playing.</EmptyTitle>
					<EmptyDescription>
						Open spotify and start listening music.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent></EmptyContent>
			</Empty>
		);
	}

	return (
		<div className="flex max-w-sm flex-col gap-2 p-2">
			<div className="mx-auto flex justify-center">
				<img
					src={track.item.album.images[0].url}
					alt=""
					width={110}
					height={110}
					className="rounded"
				/>
			</div>
			<div className="flex flex-col justify-between text-center">
				<div className="flex flex-col">
					<span className="font-medium text-primary-foreground">
						{track.item.name}
					</span>
					<span className="w-full">
						{track.item.artists.map((a) => a.name).join(", ")}
					</span>
				</div>
				<div className="flex flex-col gap-4">
					<span className="text-xs">{track.device.name}</span>
					<ProgressBarPlayback
						progress={track.progress_ms}
						duration={track.item.duration_ms}
					/>
				</div>
			</div>
		</div>
	);
};
