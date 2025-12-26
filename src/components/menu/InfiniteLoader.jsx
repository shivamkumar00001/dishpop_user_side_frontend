export default function InfiniteLoader({ isFetching, hasMore }) {
  return (
    <div className="flex flex-col items-center mt-6 mb-6">
      {isFetching && (
        <>
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p className="text-sm text-slate-600 mt-2 font-medium">Loading more…</p>
        </>
      )}

      {!hasMore && (
        <p className="text-sm text-slate-500 mt-4 font-medium">— You have reached the end —</p>
      )}
    </div>
  );
}