import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { initials } from "@/lib/string";

export const TopImage = ({
	rank,
	imageUrl,
	imageAlt,
}: {
	rank: number;
	imageUrl?: string;
	imageAlt: string;
}) => {
	return (
		<div className="relative inline-block rounded">
			<Avatar className="aspect-square h-[70px] w-[70px] rounded object-cover">
				<AvatarImage src={imageUrl} alt={imageAlt} />
				<AvatarFallback className="rounded-lg">{initials(imageAlt)}</AvatarFallback>
			</Avatar>
			<span
				className={cn(
					"absolute right-0 bottom-0 flex h-full w-full select-none items-end justify-end rounded font-extrabold text-5xl italic backdrop-brightness-75 dark:backdrop-brightness-50",
					rank === 1 && "text-[#f9e125]",
					rank === 2 && "text-[#d2c2c1]",
					rank === 3 && "text-[#cd7f32]",
					rank > 3 && "text-white",
				)}
			>
				{rank}
			</span>
		</div>
	);
};
