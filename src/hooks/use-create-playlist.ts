import { useMutation } from "@tanstack/react-query";
import { useSpotify } from "./use-spotify";
import { useProfile } from ".";

export function useCreatePlaylist() {
	const spotify = useSpotify();
	const profile = useProfile();

	return useMutation({
		mutationKey: ["createPlaylist"],
		mutationFn: async ({
			name,
			description,
			trackUriList,
		}: {
			name: string;
			description: string;
			trackUriList: string[];
		}) => {
			if (!profile) {
				throw new Error("You must login first");
			}

			const playlist = await spotify.playlists.createPlaylist(profile.id, {
				name: name,
				description: description,
				public: false,
				collaborative: false,
			});

			await spotify.playlists.addItemsToPlaylist(playlist.id, trackUriList);
			return playlist;
		},
	});
}
