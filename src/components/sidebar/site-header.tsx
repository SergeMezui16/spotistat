import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/sidebar/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useCurrentTrack } from "@/hooks";
import { Skeleton } from "../ui/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export function SiteHeader() {
	const { toggleSidebar } = useSidebar();

	return (
		<header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
			<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
				<Button
					className="h-8 w-8"
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
				>
					<SidebarIcon />
				</Button>
				<Separator orientation="vertical" className="mr-2 h-4" />
				<TrackInfo />
				<div className="flex w-full items-center justify-end gap-2">
					<SearchForm className=" hidden sm:block" />
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}

function TrackInfo() {
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
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger>
				<div className="flex cursor-pointer gap-2 rounded px-2 py-1 hover:bg-secondary">
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
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className="flex max-w-sm gap-2 p-2">
					<div className="mx-auto flex justify-center">
						<img
							src={track.item.album.images[0].url}
							alt=""
							width={100}
							height={100}
							className="rounded"
						/>
					</div>
					<div className="flex flex-col justify-between text-start">
						<div className="">
							<span className="font-medium text-primary-foreground">
								{track.item.name}
							</span>
							<span className="flex gap-1">
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ProgressBarPlayback({
	progress,
	duration,
}: {
	progress: number;
	duration: number;
}) {
	return <Progress value={(progress * 100) / duration} className="w-full" />;
}
