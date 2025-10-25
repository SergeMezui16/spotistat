import { useAuth } from "@/hooks/use-auth";
import { GlobalLoader } from "./components/molecules/global-loader";
import { MainContent } from "./components/sections/main-content";
import { LoginPage } from "./components/molecules/login-page";

function App() {
	const { accessToken, isLoading, isRefreshing, login, error, refreshToken } =
		useAuth();

	if (error) throw error;

	if (isLoading || isRefreshing || (!!refreshToken && !accessToken)) {
		return <GlobalLoader />;
	}

	if (!accessToken || !refreshToken) {
		return <LoginPage login={login} />;
	}

	return <MainContent accessToken={accessToken} refreshToken={refreshToken} />;
}

export default App;
