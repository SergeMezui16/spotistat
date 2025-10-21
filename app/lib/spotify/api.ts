import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { requireAccessToken } from "./store";

// const accessToken = requireAccessToken();

const API = SpotifyApi.withAccessToken("20d37400d4bf4280ad7f6a3a1f5d2e43", {
	access_token: "BQDGCzow9TJ0n3wBTLHWqgMSK50N3ZlbJe5b4hcB1WDptPKX5sIjTEpqZ6-VBuNGdYwhn9D4IHdVRmOYO3ac1AmnjzIfMtDrobnM-kZr7Bl2yA7fo8bWTycC9fIqff0uhKTme6q9XXsKaxffHxR511aA4i_ZzQqBQtxzU_VHyVKdOAu_yd8DmkqFAnGUMG9LLH9HmzQY4tbWNRXdMa6yW-FY99rQC3iZkqdI7_-pFpEpbwHMq89CqhrxKVCPBoypVh0FJW6pAfYJ",
	token_type: "Bearer",
	expires_in: 3600,
	// scope: "user-read-currently-playing user-read-email user-read-recently-played user-read-private user-top-read",
	refresh_token: "AQDL-ZQw4qTPaHr6n1I69Kn9LMlXkHwlEPhV2yzoFhLCn1SpMBstRJ8v1nTCgaC93kuwh83dbN9L-JB7BbNXZ3_txSGs8b2g5LQcMb4MnE6DC9snnq_oRW4-VN_QfGe596w"
});

export const getUserProfile = async () => {
	return await API.currentUser.profile();
}