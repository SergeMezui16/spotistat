import { useAuth } from "./lib/store";
import { useEffect } from "react";
import { handleAuthCallback, loginWithSpotify } from "./lib/auth";
import Dashboard from "./Dashboard";

function App() {
  const { isAuthenticated, setAccessToken, accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      const existingToken = sessionStorage.getItem("spotify_access_token");
      if (existingToken) {
        setAccessToken(existingToken);
        return;
      }

      const token = await handleAuthCallback();
      if (token) setAccessToken(token);
    })();
  }, [setAccessToken]);

  if (!isAuthenticated) return <LoginButton onLogin={loginWithSpotify} />;
  return <Dashboard accessToken={accessToken!} />;
}

export default App;


function LoginButton({ onLogin }: {
  onLogin: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
      type="button"
        onClick={onLogin}
        className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
      >
        Login with Spotify
      </button>
    </div>
  );
}
