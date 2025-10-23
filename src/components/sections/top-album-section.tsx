import { useTopAlbums } from "@/hooks";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export function TopAlbumSection() {
	return (
		<section className="h-fit flex-1 space-y-4 rounded-xl bg-secondary p-4">
			<h2 className="font-semibold text-2xl">Your Top Album</h2>
			<Tabs defaultValue="short_term">
				<TabsList>
					<TabsTrigger value="short_term">Last 4 weeks</TabsTrigger>
					<TabsTrigger value="medium_term">Last 6 months</TabsTrigger>
					<TabsTrigger value="long_term">Last year</TabsTrigger>
				</TabsList>
				<TabsContent value="short_term">
					<AlbumList timeRange="short_term" />
				</TabsContent>
				<TabsContent value="medium_term">
					<AlbumList timeRange="medium_term" />
				</TabsContent>
				<TabsContent value="long_term">
					<AlbumList timeRange="long_term" />
				</TabsContent>
			</Tabs>
		</section>
	);
}

function AlbumList({
	timeRange,
}: {
	timeRange?: "short_term" | "medium_term" | "long_term";
}) {
	const { data } = useTopAlbums(timeRange);

	if (!data) {
		return Array.from({ length: 20 }).map((_, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: what do you whant from me?
			<div key={index} className="flex gap-4">
				<Skeleton className="mb-2 h-20 w-20 rounded" />
				<div className="">
					<Skeleton className="mb-2 h-6 w-32 rounded" />
					<Skeleton className="h-4 w-24 rounded" />
				</div>
			</div>
		));
	}

	return (
		<div className="mt-2 animate-fade-left">
			{data.map((album, index) => (
				<div key={album.id} className="mb-2 flex gap-4">
					<div className="relative inline-block">
						<span
							className={cn(
								"absolute right-0 bottom-0 flex h-full w-full select-none items-end justify-end font-extrabold text-5xl italic backdrop-brightness-75",
								index === 0 && "text-[#f9e125]",
								index === 1 && "text-[#d2c2c1]",
								index === 2 && "text-[#cd7f32]",
							)}
						>
							{index + 1}
						</span>
						<img
							className="aspect-square rounded-xs object-cover"
							src={album.image}
							alt={album.name}
							width={70}
							height={70}
						/>
					</div>
					<div className="">
						<p className="font-semibold text-xl">{album.name}</p>
						<p className="text-muted-foreground text-sm">
							{album.artist} • {album.trackCount} tracks
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
