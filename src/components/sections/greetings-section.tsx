import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";

import { useRecentlyPlayed } from "@/hooks/use-recently-played";
import { timeAgo } from "@/lib/string";
import { motion } from "motion/react";
import { useProfile } from "@/hooks";

export const GreetingsSection = () => {
	return (
		<div className="flex gap-4">
			<Greetings />
			<RecentlyPlayedChart />
		</div>
	);
};

export const Greetings = () => {
	const profile = useProfile();
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6 }}
			className="relative mx-auto max-w-lg flex-2 overflow-hidden rounded-lg bg-linear-to-br from-[#1DB954] to-background p-8 text-center shadow-xl backdrop-brightness-75"
		>
			<img
				src="/wave-bg.svg"
				alt="Music wave"
				className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
			/>

			<div className="relative z-10 flex flex-col items-center">
				<motion.img
					src="/welcome.svg"
					alt="Welcome"
					className="h-36 w-36 drop-shadow-lg"
					initial={{ rotate: -10, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
				/>
				<h1 className="mb-3 font-extrabold text-3xl sm:text-4xl">
					Hello {profile?.display_name}. 👋
				</h1>
				<p className="mb-6 max-w-md text-secondary-foreground text-sm leading-relaxed sm:text-base">
					Dive into your personal music story — your top songs, artists, and
					albums. Built with ❤️ using Spotify’s API to help you rediscover what
					you love.
				</p>
			</div>
		</motion.div>
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
