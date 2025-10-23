import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/sidebar/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { TrackInfo } from "../molecules/track-info";

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
				<div className="w-full">
					<TrackInfo />
				</div>
				<div className="flex w-full items-center justify-end gap-2">
					<SearchForm className="hidden sm:block" />
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
