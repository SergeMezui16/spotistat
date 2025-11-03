import { useFilterTop, useTopArtists } from "@/hooks";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TopImage } from "../molecules/top-image";
import { TopList } from "../molecules/top-list";
import { FilterTopButtonGroup } from "../molecules/filter-top-button-group";
import { capitalize } from "@/lib/string";
import { Slicer } from "../ui/slicer";

export function TopArtistSection() {
	const filter = useFilterTop();
	const { data, isFetching, refetch } = useTopArtists(
		filter.timeRange,
		filter.top,
	);

	return (
		<Card className="h-fit flex-1">
			<CardHeader>
				<CardTitle>Top Artists</CardTitle>
				<CardDescription>
					Your top artist calcuted from spotify.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FilterTopButtonGroup
					{...filter}
					refetch={refetch}
					isFetching={isFetching}
				/>
				<ArtistList data={data} />
			</CardContent>
		</Card>
	);
}
function ArtistList({
	data,
}: {
	data?: ReturnType<typeof useTopArtists>["data"];
}) {
	return (
		<TopList isLoading={!data}>
			{data?.items.map((artist, index) => (
				<div key={artist.id} className="mb-2 flex gap-4">
					<TopImage
						rank={index + 1}
						imageAlt={artist.name}
						imageUrl={artist.images[0]?.url}
					/>
					<div className="">
						<p className="font-semibold text-xl"><Slicer size={30} text={artist.name} /></p>
						<p className="text-muted-foreground text-sm">
							<Slicer
								size={30}
								text={
									artist.genres.length === 0
										? "Unknown Genre"
										: artist.genres.map((g) => capitalize(g)).join(", ")
								}
							/>
						</p>
					</div>
				</div>
			))}
		</TopList>
	);
}
