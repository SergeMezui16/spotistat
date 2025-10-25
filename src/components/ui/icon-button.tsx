import * as BT from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export type IconButtonProps = ComponentProps<typeof BT.Button> & {
	icon: LucideIcon;
	tooltip?: string;
	iconClassName?: string;
};

const Wrapper = ({
	children,
	content,
}: PropsWithChildren & { content: string }) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent>
				<p>{content}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

export const IconButton = ({
	variant,
	size,
	icon: Icon,
	tooltip,
	iconClassName,
	className,
	...rest
}: IconButtonProps) => {
	const btn = (
		<BT.Button
			className={cn("cursor-pointer", className)}
			variant={variant ?? "outline"}
			size={size ?? "icon"}
			{...rest}
		>
			<Icon className={cn(iconClassName ,"h-4 w-4")} />
		</BT.Button>
	);

	if (tooltip && !rest.disabled)
		return <Wrapper content={tooltip}>{btn}</Wrapper>;
	else return btn;
};
