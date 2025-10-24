import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PROJECT_NAME } from "@/lib/constant";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";

import { useRecentlyPlayed } from "@/hooks/use-recently-played";
import { timeAgo } from "@/lib/string";

export const GreetingsSection = () => {
	return (
		<div className="flex gap-4">
			<Greetings />
			<RecentlyPlayedChart />
		</div>
	);
};

export const Greetings = () => {
	return (
		<Card className="flex-2">
			<CardHeader>
				<CardTitle className="text-3xl">Hello Serge Mezui 👋</CardTitle>
				<CardDescription>Welcome (back) to {PROJECT_NAME}!</CardDescription>
			</CardHeader>
			<CardContent>
				<div className=""></div>
			</CardContent>
			<CardFooter>
				<p>Enjoy!</p>
			</CardFooter>
		</Card>
	);
};

const chartConfig = {
	duration: {
		label: "Duration",
		color: "var(--color-chart-1)",
	},
} satisfies ChartConfig;

export function RecentlyPlayedChart() {
	const { data: tracks } = useRecentlyPlayed(50);

	return (
		<Card className="flex-3">
			<CardHeader>
				<CardTitle>Recently Played</CardTitle>
				<CardDescription>Your listening history!</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer className="max-h-[200px] w-full" config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={tracks?.items.map(({ track, played_at }) => ({
							name: track.name,
							duration: track.duration_ms,
							image: track.album.images[0].url,
							artist: track.artists.map((a) => a.name).join(", "),
							playedAt: played_at,
						}))}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="name"
							tickLine={true}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={true}
							content={(data) => {
								const track = data.payload?.[0]?.payload;
								return (
									<div className="flex flex-col rounded border bg-card p-2">
										<img
											className="rounded"
											src={track?.image}
											alt={track?.name}
											width={90}
											height={90}
										/>
										<p>{track?.name}</p>
										<p>{track?.artist}</p>
										<p>{track?.playedAt && timeAgo(track.playedAt)}</p>
									</div>
								);
							}}
						/>
						<Bar
							dataKey="duration"
							strokeWidth={1}
							radius={4}
							fill="var(--color-chart-1)"
							color="var(--color-chart-1)"
							activeIndex={0}
							activeBar={({ ...props }) => {
								return (
									<Rectangle
										{...props}
										fillOpacity={0.8}
										stroke={"var(--color-chart-2)"}
										strokeDasharray={4}
										strokeDashoffset={4}
									/>
								);
							}}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
