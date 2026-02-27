import { Skeleton as SkeletonBase } from "@/components/ui/skeleton";

interface SkeletonProps {
  isArtist?: boolean;
}

export default function Skeleton({ isArtist = false }: SkeletonProps) {
  return (
    <section className="px-8 mb-10">
      <div className="flex justify-between items-end mb-4">
        <SkeletonBase className="h-8 w-48 bg-zinc-800" />
        <SkeletonBase className="h-4 w-16 bg-zinc-800" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 bg-zinc-900/40 rounded-xl"
          >
            <SkeletonBase
              className={`aspect-square w-full bg-zinc-800 ${
                isArtist ? "rounded-full" : "rounded-md"
              }`}
            />
            <div className="space-y-2 mt-2">
              <SkeletonBase className="h-4 w-3/4 bg-zinc-800" />
              <SkeletonBase className="h-3 w-1/2 bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
