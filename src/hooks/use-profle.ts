import { useQuery } from "@tanstack/react-query";
import { useSpotify } from ".";

export function useProfile() {
	const spotify = useSpotify();

	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			return await spotify.currentUser.profile();
		},
		staleTime: 1000 * 60 * 20,
	}).data;
}