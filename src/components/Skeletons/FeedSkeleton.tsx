interface FeedSkeletonProps {
  count?: number;
}

const FeedSkeleton = ({ count = 6 }: FeedSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex w-32 flex-col items-center justify-center gap-5 rounded-lg bg-white/10 p-3"
        >
          <div className="size-20 animate-pulse rounded-full bg-white/20" />
          <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
          <div className="h-6 w-full animate-pulse rounded bg-white/20" />
        </div>
      ))}
    </>
  );
};

export default FeedSkeleton;
