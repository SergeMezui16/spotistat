import { redirectToSpotifyAuth } from "~/lib/spotify/auth";

export default function Login() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<button
				type="button"
				onClick={redirectToSpotifyAuth}
				className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
			>
				Log in with Spotify
			</button>
		</div>
	);
}
