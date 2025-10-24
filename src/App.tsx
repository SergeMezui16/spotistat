import { useAuth } from "@/hooks/use-auth";
import { SpotifyProvider } from "./providers/spotify-context";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopTrackSection } from "./components/sections/top-track-section";
import { TopArtistSection } from "./components/sections/top-artist-section";
import { TopAlbumSection } from "./components/sections/top-album-section";
import { LoginPage } from "./components/molecules/login-page";
import { GlobalLoader } from "./components/molecules/global-loader";

function App() {
	const { accessToken, isLoading, login, error, refreshToken } = useAuth();

	if (error) throw error;

	if (isLoading) {
		return <GlobalLoader />;
	}

	if (!accessToken || !refreshToken) return <LoginPage login={login} />;

	return (
		<SpotifyProvider refreshToken={refreshToken} accessToken={accessToken}>
			<div className="[--header-height:calc(--spacing(14))]">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1">
						<AppSidebar variant="sidebar" />
						<SidebarInset>
							<div className="flex h-fit flex-col gap-4 p-4 lg:flex-row">
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
