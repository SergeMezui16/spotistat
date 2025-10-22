import Dashboard from "@/Dashboard";
import { useAuth } from "@/hooks/use-auth";
import { SpotifyProvider } from "./providers/spotify-context";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
							<div className="flex flex-1 flex-col gap-4 p-4">
								<div className="grid auto-rows-min gap-4 md:grid-cols-3">
									<div className="aspect-video rounded-xl bg-muted/50" />
									<div className="aspect-video rounded-xl bg-muted/50" />
									<div className="aspect-video rounded-xl bg-muted/50" />
								</div>
								<div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
							</div>
							<Dashboard />
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</SpotifyProvider>
	);
}

export default App;
