import { Progress } from "@radix-ui/react-progress";

export function ProgressBarPlayback({
	progress,
	duration,
}: {
	progress: number;
	duration: number;
}) {
	return <Progress value={(progress * 100) / duration} className="w-full bg-primary" />;
}
