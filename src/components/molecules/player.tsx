import { useCurrentTrack } from "@/hooks";
import { ProgressBarPlayback } from "./progress-bar-playback";

export const Player = () => {
	const { data: track, isLoading } = useCurrentTrack();

	if (!track || isLoading) {
		return "wait...";
	}

	return (
		<div className="flex max-w-sm flex-col gap-2 p-2">
			<div className="itemst mx-auto flex justify-center">
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
				<div className="flex flex-col gap-1">
					<span>{track.device.name}</span>
					<ProgressBarPlayback
						progress={track.progress_ms}
						duration={track.item.duration_ms}
					/>
				</div>
			</div>
		</div>
	);
};
