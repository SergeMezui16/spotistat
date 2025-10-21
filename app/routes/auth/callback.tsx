import { getAccessToken } from "~/lib/spotify/auth";
import { saveAccessToken } from "~/lib/spotify/store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function Callback() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const code = params.get("code");
		if (!code) return;

		getAccessToken(code).then((data) => {
			saveAccessToken(data);
			navigate("/");
		});
	}, [params, navigate]);

	return <p>Loading...</p>;
}
