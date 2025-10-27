import { useFilterTop, useTopAlbums } from "@/hooks";
import { TopImage } from "../molecules/top-image";
import { TopList } from "../molecules/top-list";
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
import { Slicer } from "../ui/slicer";

export function TopAlbumSection() {
	const filter = useFilterTop();
	const { data, isFetching, refetch } = useTopAlbums(
		filter.timeRange,
		filter.top,
	);

	return (
		<Card className="h-fit flex-1">
			<CardHeader>
				<CardTitle>Top Album</CardTitle>
				<CardDescription>
					Your top artist calcuted from your last played tracks.
				</CardDescription>
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
				<AlbumList data={data} />
			</CardContent>
		</Card>
	);
}

function AlbumList({
	data,
}: {
	data?: ReturnType<typeof useTopAlbums>["data"];
}) {
	return (
		<TopList isLoading={!data}>
			{data?.map((album, index) => (
				<div key={album.id} className="mb-2 flex gap-4">
					<TopImage
						rank={index + 1}
						imageAlt={album.name}
						imageUrl={album.image}
					/>
					<div className="">
						<p className="font-semibold text-xl">
							<Slicer size={30} text={album.name} />
						</p>
						<p className="text-muted-foreground text-sm">
							<Slicer size={50} text={album.artist} />
						</p>
						<p className="text-muted-foreground text-xs">
							{album.trackCount} tracks
						</p>
					</div>
				</div>
			))}
		</TopList>
	);
}
