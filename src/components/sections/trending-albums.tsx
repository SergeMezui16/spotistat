export function TrendingAlbums() {
    return (
        <section>
            <h2 className="mb-4 text-2xl font-semibold">Your Top Tracks</h2>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
        </section>
    );
}