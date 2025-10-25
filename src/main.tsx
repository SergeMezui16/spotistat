import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorFallback } from "./components/molecules/error-fallback.tsx";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: no need to check for null here
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<App />
				</ErrorBoundary>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
);
