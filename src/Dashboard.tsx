import { useTopTracks } from "@/hooks";

export default function Dashboard() {
  const {data: tracks} = useTopTracks("short_term");

	return (
		<div className="p-4">
			<h1 className="mb-4 font-bold text-2xl">🎧 Your Top Songs This last 4 Week</h1>
			<ul>
				{tracks?.items.map((t, index) => (
					<li key={t.id} className="mb-2">
						{index + 1}. {t.name} – {t.artists.map((a) => a.name).join(", ")}
					</li>
				))}
			</ul>
		</div>
	);
}
