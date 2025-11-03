import { useFilterTop, useTopTracks } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { FilterTopButtonGroup } from "../molecules/filter-top-button-group";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "../ui/card";
import { TopList } from "../molecules/top-list";
import { TopImage } from "../molecules/top-image";
import { Slicer } from "../ui/slicer";
import { IconButton } from "../ui/icon-button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
	title: z
		.string()
		.min(5, "Bug title must be at least 5 characters.")
		.max(32, "Bug title must be at most 32 characters."),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters.")
		.max(100, "Description must be at most 100 characters."),
});

export function TopTrackSection() {
	const filter = useFilterTop();
	const { data, isFetching, refetch } = useTopTracks(
		filter.timeRange,
		filter.top,
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
		toast("Your playlist has been created!");
	}

	return (
		<Card className="h-fit flex-1">
			<CardHeader>
				<CardTitle>Top Tracks</CardTitle>
				<CardDescription>Your top track calcuted from spotify.</CardDescription>
				<CardAction>
					<Dialog>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<DialogTrigger asChild>
								<IconButton icon={PlusIcon} variant="ghost" />
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Create a playlist</DialogTitle>
									<DialogDescription>
										Make a playlist with this top tracks.
									</DialogDescription>
								</DialogHeader>
								<FieldGroup>
									<Controller
										name="title"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="form-rhf-demo-title">
													Bug Title
												</FieldLabel>
												<Input
													{...field}
													aria-invalid={fieldState.invalid}
													placeholder="Login button not working on mobile"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
									<Controller
										name="description"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="form-rhf-demo-description">
													Description
												</FieldLabel>
												<InputGroup>
													<InputGroupTextarea
														{...field}
														placeholder="I'm having an issue with the login button on mobile."
														rows={3}
														className="min-h-24 resize-none"
														aria-invalid={fieldState.invalid}
													/>
													<InputGroupAddon align="block-end">
														<InputGroupText className="tabular-nums">
															{field.value.length}/100 characters
														</InputGroupText>
													</InputGroupAddon>
												</InputGroup>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</FieldGroup>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button type="submit">Save playlist</Button>
								</DialogFooter>
							</DialogContent>
						</form>
					</Dialog>
				</CardAction>
			</CardHeader>
			<CardContent>
				<FilterTopButtonGroup
					{...filter}
					refetch={refetch}
					isFetching={isFetching}
				/>
				<TrackList data={data} />
			</CardContent>
		</Card>
	);
}

function TrackList({
	data,
}: {
	data?: ReturnType<typeof useTopTracks>["data"];
}) {
	return (
		<TopList isLoading={!data}>
			{data?.items.map((track, index) => (
				<div key={track.id} className="mb-2 flex gap-4">
					<TopImage
						rank={index + 1}
						imageAlt={track.album.name}
						imageUrl={track.album.images[0]?.url}
					/>
					<div className="">
						<p className="font-semibold">
							<Slicer size={30} text={track.name} />
						</p>
						<p className="text-muted-foreground text-sm">
							<Slicer
								size={50}
								text={track.artists.map((artist) => artist.name).join(", ")}
							/>
						</p>
					</div>
				</div>
			))}
		</TopList>
	);
}
