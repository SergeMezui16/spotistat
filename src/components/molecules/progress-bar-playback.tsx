import { Progress } from "../ui/progress";

export function ProgressBarPlayback({
	progress,
	duration,
}: {
	progress: number;
	duration: number;
}) {
	return <Progress value={(progress * 100) / duration} />;
}
