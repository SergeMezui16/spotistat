import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: no need to check for null here
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<ErrorBoundary FallbackComponent={SpotifyErrorFallback}>
					<App />
				</ErrorBoundary>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>,
);

function SpotifyErrorFallback({ error }: { error: Error }) {
	return (
		<div className="rounded bg-red-100 p-4 text-red-800">
			<h2>⚠️ Spotify Error</h2>
			<p>{error.message}</p>
		</div>
	);
}
