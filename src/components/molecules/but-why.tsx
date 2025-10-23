import { FileQuestionIcon } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const COOKIE_KEY = "spotify_top_acknowledge";

export const ButWhy = () => {
	const [cookie, setCookie] = useState<CookieListItem | null>();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const getCookie = async () => {
			const c = await cookieStore.get(COOKIE_KEY);
            setCookie(c)
			setOpen(!c);
		};

		getCookie();
	}, []);

	const handleClose = () => {
		if (!cookie) {
			cookieStore.set(COOKIE_KEY, "true");
		}

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={(o) => setOpen(o)} modal={true}>
			<DialogTrigger asChild>
				<SidebarMenuItem key="why">
					<SidebarMenuButton asChild size="sm">
						<span>
							<FileQuestionIcon />
							<span>But Why?</span>
						</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Hey there! 👋</DialogTitle>
					<DialogDescription>Welcome to your Spotify Top!</DialogDescription>
				</DialogHeader>

				<p>
					I built this little app for music lovers like you, it connects to your
					Spotify account and reveals your top tracks, albums, and listening
					patterns over time.
				</p>
				<p>
					Think of it as your personal{" "}
					<span className="font-semibold italic">“Spotify Wrapped”</span>, but
					you can check it anytime you want.
				</p>
				<p>Here’s what you can do:</p>
				<ul className="ml-3 list-disc">
					<li>🏆 See your top songs from the week, month, or year.</li>
					<li>💿 Discover your most played albums (with smarter ranking).</li>
					<li>
						🔍 Reflect on your listening journey, no judgment, just vibes.
					</li>
				</ul>

				<p className="rounded bg-yellow-500/10 p-2">
					💡 Note: This app uses Spotify’s official API to read your listening
					data. Your information is never stored, shared, or used for anything
					outside this app. I’m not affiliated with Spotify — this is just a
					personal project made for fun and learning. <br /> By continuing, you
					acknowledge that this app uses your Spotify data for display purposes
					only, and I’m not responsible for how it’s used beyond that.
				</p>

				<p>Enjoy exploring your sound world 🎶</p>

				<p>— Made with ❤️ and curiosity by Serge Mezui.</p>

				<DialogFooter>
					<Button onClick={() => handleClose()}>Let's Gooo</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
