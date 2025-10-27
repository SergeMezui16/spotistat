import { Player } from "../molecules/player";
import { QueueList } from "../molecules/queue-list";
import { useProfile } from "@/hooks";

export const PlayerSection = () => {
	const profile = useProfile();

	return (
		<div className="my-4 flex h-full flex-col">
			<Player />
			{profile && profile.type === "premium" && <QueueList />}
		</div>
	);
};
