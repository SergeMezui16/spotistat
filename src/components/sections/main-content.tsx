import { SpotifyProvider } from "@/providers/spotify-context";
import { AppSidebar } from "../sidebar/app-sidebar";
import { SiteHeader } from "../sidebar/site-header";
import { BubbleBackground } from "../ui/bubble-background";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { GreetingsSection } from "./greetings-section";
import { TopAlbumSection } from "./top-album-section";
import { TopArtistSection } from "./top-artist-section";
import { TopTrackSection } from "./top-track-section";

export const MainContent = ({
	refreshToken,
	accessToken,
}: {
	refreshToken: string;
	accessToken: string;
}) => {
	return (
		<SpotifyProvider refreshToken={refreshToken} accessToken={accessToken}>
			<div className="[--header-height:calc(--spacing(14))]">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1">
						<AppSidebar variant="sidebar" />
						<SidebarInset>
							<BubbleBackground interactive>
								<div className="z-50 flex flex-col gap-4 p-4 backdrop-blur-3xl">
									<div className="">
										<GreetingsSection />
									</div>
									<div className="flex h-fit flex-col gap-4 lg:flex-row">
										<TopAlbumSection />
										<TopTrackSection />
										<TopArtistSection />
									</div>
								</div>
							</BubbleBackground>
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</SpotifyProvider>
	);
};
