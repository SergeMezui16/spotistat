import { useTopAlbums } from "@/hooks";

export default function Dashboard() {
  const {data: albums} = useTopAlbums("long_term");

	return (
		<div className="flex-1 p-4">
			<h1 className="mb-4 font-bold text-2xl">🎧 Your Top Albums This last 12 month</h1>
			<ul>
				{albums?.map((album, index) => (
					<li key={album.id} className="mb-2">
						{index + 1}. {album.name} – {album.artist} -- {album.score} points
					</li>
				))}
			</ul>
		</div>
	);
}
