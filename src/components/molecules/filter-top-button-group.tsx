import type { useFilterTop } from "@/hooks";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../ui/select";
import { InfoIcon, RefreshCcwIcon } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { IconButton } from "../ui/icon-button";

export const FilterTopButtonGroup = ({
	top,
	updateTimeRange,
	timeRange,
	updateTop,
	refetch,
	isFetching = false,
}: ReturnType<typeof useFilterTop> & {
	refetch: () => void;
	isFetching?: boolean;
}) => {
	return (
		<ButtonGroup className="mb-6 w-full">
			<Select
				defaultValue="short_term"
				onValueChange={(value) => updateTimeRange(value as typeof timeRange)}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="short_term">Last 4 Weeks</SelectItem>
					<SelectItem value="medium_term">Last 6 Months</SelectItem>
					<SelectItem value="long_term">Last year</SelectItem>
				</SelectContent>
			</Select>
			<Select
				defaultValue="10"
				onValueChange={(value) => updateTop(parseInt(value, 10) as typeof top)}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Top Count" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"10"}>Top 10</SelectItem>
					<SelectItem value="20">Top 20</SelectItem>
					<SelectItem value="30">Top 30</SelectItem>
					<SelectItem value="50">Top 50</SelectItem>
				</SelectContent>
			</Select>
			{refetch && (
				<IconButton
					tooltip="Refresh"
					icon={RefreshCcwIcon}
					variant="outline"
					disabled={isFetching}
					iconClassName={cn(isFetching && "animate-spin")}
					onClick={() => refetch()}
				/>
			)}
			<IconButton className="cursor-help" tooltip="The range take the last period from now back the actual last period." icon={InfoIcon} />
		</ButtonGroup>
	);
};
