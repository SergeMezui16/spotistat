import type { PropsWithChildren } from "react";
import { Skeleton } from "../ui/skeleton";

export const TopList = ({
	children,
	isLoading,
	elementCount = 10,
}: PropsWithChildren & { isLoading: boolean; elementCount?: number }) => {
	if (isLoading) {
		return Array.from({ length: elementCount }).map((_, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: what do you whant from me?
			<div key={index} className="flex gap-4">
				<Skeleton className="mb-2 h-20 w-20 rounded" />
				<div className="">
					<Skeleton className="mb-2 h-6 w-32 rounded" />
					<Skeleton className="h-4 w-24 rounded" />
				</div>
			</div>
		));
	}

	return <div className="animate-fade-left overflow-y-scroll">{children}</div>;
};
