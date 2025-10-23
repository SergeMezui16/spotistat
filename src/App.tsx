import { useAuth } from "@/hooks/use-auth";
import { SpotifyProvider } from "./providers/spotify-context";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopTrackSection } from "./components/sections/top-track-section";
import { TopArtistSection } from "./components/sections/top-artist-section";
import { TopAlbumSection } from "./components/sections/top-album-section";

function App() {
	const { accessToken, isLoading, login, error, refreshToken } = useAuth();

	if (error) throw error;

	if (isLoading) return <p>Loading authentication...</p>;
	if (!accessToken || !refreshToken)
		return (
			<button type="button" onClick={login}>
				Login with Spotify
			</button>
		);

	return (
		<SpotifyProvider refreshToken={refreshToken} accessToken={accessToken}>
			<div className="[--header-height:calc(--spacing(14))]">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1">
						<AppSidebar variant="inset" />
						<SidebarInset>
							<div className="flex h-fit space-x-4 p-4">
								<TopAlbumSection />
								<TopTrackSection />
								<TopArtistSection />
							</div>
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</SpotifyProvider>
	);
}

export default App;
