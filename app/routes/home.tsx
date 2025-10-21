import { use } from "react";
import { getUserProfile } from "~/lib/spotify/api";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	const profile = use(getUserProfile());
	return (
		<div>
			<h1>welcome to spotify</h1>
			Hello, {profile.display_name}
			<pre>{JSON.stringify(profile)}</pre>
		</div>
	);
}
