import { useRecentlyPlayed } from "@/hooks/use-recently-played";
import { Player } from "../molecules/player";
import {format} from "timeago.js"

export const RecentlyPlayedSection = () => {
	const { data: tracks } = useRecentlyPlayed();
	return (
		<div className="my-4 flex h-full flex-col">
			<Player />
			<div className="flex h-full flex-col gap-2 overflow-scroll scroll-smooth border-t pt-1 pb-4">
				{tracks?.items.map(({ track, played_at }) => {
					return (
						<div key={played_at} className="flex gap-2 px-1">
							<img
								className="h-12 w-12 rounded"
								src={track.album.images[0].url}
								alt={track.album.name}
							/>
                            <div className="flex flex-col text-xs">
                                <span>{track.name}</span>
                                <span className="">{track.artists[0].name}</span>
                                <span>{format(new Date(played_at), "en")}</span>
                            </div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
