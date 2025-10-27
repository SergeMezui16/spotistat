import { useFilterTop, useTopTracks } from "@/hooks";
import { EllipsisIcon } from "lucide-react";
import { FilterTopButtonGroup } from "../molecules/filter-top-button-group";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "../ui/card";
import { TopList } from "../molecules/top-list";
import { TopImage } from "../molecules/top-image";
import { Slicer } from "../ui/slicer";

export function TopTrackSection() {
	const filter = useFilterTop();
	const { data, isFetching, refetch } = useTopTracks(
		filter.timeRange,
		filter.top,
	);
	return (
		<Card className="h-fit flex-1">
			<CardHeader>
				<CardTitle>Top Tracks</CardTitle>
				<CardDescription>Your top track calcuted from spotify.</CardDescription>
				<CardAction>
					<EllipsisIcon />
				</CardAction>
			</CardHeader>
			<CardContent>
				<FilterTopButtonGroup
					{...filter}
					refetch={refetch}
					isFetching={isFetching}
				/>
				<TrackList data={data} />
			</CardContent>
		</Card>
	);
}

function TrackList({
	data,
}: {
	data?: ReturnType<typeof useTopTracks>["data"];
}) {
	return (
		<TopList isLoading={!data}>
			{data?.items.map((track, index) => (
				<div key={track.id} className="mb-2 flex gap-4">
					<TopImage
						rank={index + 1}
						imageAlt={track.album.name}
						imageUrl={track.album.images[0]?.url}
					/>
					<div className="">
						<p className="font-semibold"><Slicer size={30} text={track.name} /></p>
						<p className="text-muted-foreground text-sm">
							<Slicer size={50} text={track.artists.map((artist) => artist.name).join(", ")} />
						</p>
					</div>
				</div>
			))}
		</TopList>
	);
}
