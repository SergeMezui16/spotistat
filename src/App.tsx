import Dashboard from "@/Dashboard";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "@/hooks/use-auth";
import { SpotifyProvider } from "./providers/spotify-context";

function App() {
	const { accessToken, isLoading, login, error, refreshToken } = useAuth();

	if (error) return <p>❌ {error}</p>;

	if (isLoading) return <p>Loading authentication...</p>;
	if (!accessToken || !refreshToken)
		return (
			<button type="button" onClick={login}>
				Login with Spotify
			</button>
		);

	return (
		<ErrorBoundary FallbackComponent={SpotifyErrorFallback}>
			<SpotifyProvider refreshToken={refreshToken} accessToken={accessToken}>
				<Dashboard />
			</SpotifyProvider>
		</ErrorBoundary>
	);
}

export default App;

function SpotifyErrorFallback({ error }: { error: Error }) {
	return (
		<div className="rounded bg-red-100 p-4 text-red-800">
			<h2>⚠️ Spotify Error</h2>
			<p>{error.message}</p>
		</div>
	);
}
