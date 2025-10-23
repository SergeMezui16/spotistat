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

export const LoginPage = ({
	login,
}: {
	login: ReturnType<typeof useAuth>["login"];
}) => {
	return (
		<div className="flex h-screen w-screen items-center justify-center gap-4">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<ScanFaceIcon />
					</EmptyMedia>
					<EmptyTitle>You're not logged.</EmptyTitle>
					<EmptyDescription>
						Spoty Top need you to login to your Spotify account and the
						authorization to get data from your taste. Click on the button
						bellow to start!
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button onClick={login}>Login with Spotify</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
};
