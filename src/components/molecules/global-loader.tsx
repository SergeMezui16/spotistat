import { BubbleBackground } from "../ui/bubble-background";

export const GlobalLoader = () => {
	return (
		<BubbleBackground interactive>
			<div className="z-50 flex h-screen w-screen items-center justify-center gap-4 backdrop-blur-3xl">
				<div className="h-8 w-8 animate-bounce rounded-full bg-primary"></div>
				<div className="h-8 w-8 animate-bounce rounded-full bg-primary delay-100"></div>
				<div className="h-8 w-8 animate-bounce rounded-full bg-primary delay-200"></div>
			</div>
		</BubbleBackground>
	);
};
