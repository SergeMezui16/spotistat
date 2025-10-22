import { useTopAlbums, useTopTracks } from "@/hooks";

export default function Dashboard() {
  const {data: tracks} = useTopTracks("long_term");
  const {data: albums} = useTopAlbums("long_term");

	return (
		<div className="p-4 flex-1">
			<h1 className="mb-4 font-bold text-2xl">🎧 Your Top Songs This last 4 Week</h1>
			<ul>
				{tracks?.items.map((t, index) => (
					<li key={t.id} className="mb-2">
						{index + 1}. {t.name} – {t.artists.map((a) => a.name).join(", ")}
					</li>
				))}
			</ul>
			<h1 className="mb-4 font-bold text-2xl">🎧 Your Top Albums This last 12 month</h1>
			<ul>
				{albums?.map((t, index) => (
					<li key={t.id} className="mb-2">
						{index + 1}. {t.name} – {t.artists.map((a) => a.name).join(", ")}
					</li>
				))}
			</ul>
		</div>
	);
}
