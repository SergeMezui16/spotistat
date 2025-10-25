import { CircleXIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function ErrorFallback({ error }: { error: Error }) {
	const refresh = () => {
		location.reload();
	};

	return (
		<div className="flex h-screen w-screen items-center justify-center gap-4">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<CircleXIcon />
					</EmptyMedia>
					<EmptyTitle>Something went wrong.</EmptyTitle>
					<EmptyDescription>{error.message}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button onClick={() => refresh}>Refresh</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
