export const GlobalLoader = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center gap-4">
			<div className="h-8 w-8 animate-bounce rounded-full bg-primary"></div>
			<div className="h-8 w-8 animate-bounce rounded-full bg-primary delay-100"></div>
			<div className="h-8 w-8 animate-bounce rounded-full bg-primary delay-200"></div>
		</div>
	);
};