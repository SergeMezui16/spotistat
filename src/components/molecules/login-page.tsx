import type { useAuth } from "@/hooks";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { ScanFaceIcon } from "lucide-react";
import { BubbleBackground } from "../ui/bubble-background";

export const LoginPage = ({
	login,
}: {
	login: ReturnType<typeof useAuth>["login"];
}) => {
	return (
		<BubbleBackground interactive>
			<div className="z-50 flex h-screen w-screen items-center justify-center backdrop-blur-3xl">
				<div className="mx-auto rounded-lg bg-card">
				<Empty className="">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<ScanFaceIcon />
						</EmptyMedia>
						<EmptyTitle>Hey, You're not logged.</EmptyTitle>
						<EmptyDescription>
							Spotify Top need you to login to your Spotify account and the
							authorization to get data from your taste. Click on the button
							bellow to start!
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button onClick={login}>Login with Spotify</Button>
					</EmptyContent>
				</Empty></div>
			</div>
		</BubbleBackground>
	);
};
