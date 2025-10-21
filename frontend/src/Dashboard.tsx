import { useEffect, useState } from "react";

interface Props {
  accessToken: string;
}

export default function Dashboard({ accessToken }: Props) {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTopTracks() {
      const res = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setTracks(data.items || []);
    }
    fetchTopTracks();
  }, [accessToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎧 Your Top Songs This Week</h1>
      <ul>
        {tracks.map((t) => (
          <li key={t.id} className="mb-2">
            {t.name} – {t.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
