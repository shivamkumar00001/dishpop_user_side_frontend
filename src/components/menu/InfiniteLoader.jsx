export default function InfiniteLoader({ isFetching, hasMore }) {
  return (
    <div className="flex flex-col items-center mt-6">
      {isFetching && (
        <>
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-sm text-gray-600 mt-2">Loading more…</p>
        </>
      )}

      {!hasMore && (
        <p className="text-sm text-gray-500 mt-4">— You have reached the end —</p>
      )}
    </div>
  );
}
