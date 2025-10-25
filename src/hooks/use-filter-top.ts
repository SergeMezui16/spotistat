import type { TimeRange, TopCount } from "@/types";
import { useState } from "react";

type TopArtistFilter = {
	timeRange: TimeRange;
	top: TopCount;
};

export const useFilterTop = () => {
	const [filter, setFilter] = useState<TopArtistFilter>({
		timeRange: "short_term",
		top: 10,
	});

	return {
		top: filter.top,
		timeRange: filter.timeRange,
		updateTimeRange: (timeRange: TimeRange) => {
			return setFilter((prev) => ({
				...prev,
				timeRange,
			}));
		},
		updateTop: (top: TopCount) => {
			return setFilter((prev) => ({
				...prev,
				top,
			}));
		},
	};
};
