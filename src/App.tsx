import { useAuth } from "@/hooks/use-auth";
import Dashboard from "@/Dashboard";

function App() {
  const { accessToken, isLoading, login, error } = useAuth();

  if (isLoading) return <p>Loading authentication...</p>;
  if (error) return <p>❌ {error}</p>;

  if (!accessToken) return <button type="button" onClick={login}>Login with Spotify</button>;

  return <Dashboard accessToken={accessToken} />;
}

export default App;
