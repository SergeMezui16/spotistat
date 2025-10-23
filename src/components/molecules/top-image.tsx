import { cn } from "@/lib/utils";


export const TopImage = ({
	rank,
	imageUrl,
	imageAlt,
}: {
	rank: number;
	imageUrl: string;
	imageAlt: string;
}) => {
	return (
		<div className="relative inline-block">
			<span
				className={cn(
					"absolute right-0 bottom-0 flex h-full w-full select-none items-end justify-end font-extrabold text-5xl italic backdrop-brightness-75",
					rank === 1 && "text-[#f9e125]",
					rank === 2 && "text-[#d2c2c1]",
					rank === 3 && "text-[#cd7f32]",
				)}
			>
				{rank}
			</span>
			<img
				className="aspect-square rounded object-cover"
				src={imageUrl}
				alt={imageAlt}
				width={70}
				height={70}
			/>
		</div>
	);
};
