import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { useFilterTop, useTopTracks } from "@/hooks";
import { useCreatePlaylist } from "@/hooks/use-create-playlist.ts";
import type { TimeRange, TopCount } from "@/types";
import { FilterTopButtonGroup } from "../molecules/filter-top-button-group";
import { TopImage } from "../molecules/top-image";
import { TopList } from "../molecules/top-list";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { IconButton } from "../ui/icon-button";
import { Slicer } from "../ui/slicer";

const formSchema = z.object({
  name: z.string(),
  description: z.string()
});

const timeRangeOptions: Record<TimeRange, string> = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "Last 12 months"
};

const date = (() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
})();

export function TopTrackSection() {
  const filter = useFilterTop();
  const {data, isFetching, refetch} = useTopTracks(
    filter.timeRange,
    filter.top
  );

  return (
    <Card className="h-fit flex-1">
      <CardHeader>
        <CardTitle>Top Tracks</CardTitle>
        <CardDescription>
          Your top track calculated from spotify.
        </CardDescription>
        <CardAction>
          <CreatePlaylistForm
            timeRange={filter.timeRange}
            top={filter.top}
            tracksUri={data?.items.map((track) => track.uri) || []}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <FilterTopButtonGroup
          {...filter}
          refetch={refetch}
          isFetching={isFetching}
        />
        <TrackList data={data}/>
      </CardContent>
    </Card>
  );
}

export const CreatePlaylistForm = ({
                                     timeRange,
                                     top,
                                     tracksUri
                                   }: {
  timeRange: TimeRange;
  top: TopCount;
  tracksUri: string[];
}) => {
  const {mutate, isPending} = useCreatePlaylist();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `Top ${top} Tracks ${date}`,
      description: `Top ${top} Tracks ${timeRangeOptions[timeRange]} from ${date}`
    }
  });

  function onSubmit(result: z.infer<typeof formSchema>) {
    mutate(
      {...result, trackUriList: tracksUri},
      {
        onSuccess: () => {
          toast.success(
            "Your playlist has been created! Check your playlist list for more details."
          );
          form.reset();
        },
        onError: (error) => {
          console.log(error);
          toast.error("Something went wrong!");
        }
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton icon={PlusIcon} variant="ghost"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a playlist</DialogTitle>
            <DialogDescription>
              Make a playlist with this top tracks.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="My brand new playlist for the summer"
                      rows={3}
                      disabled={isPending}
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
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save playlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

function TrackList({
                     data
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
              <Slicer size={30} text={track.name}/>
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
