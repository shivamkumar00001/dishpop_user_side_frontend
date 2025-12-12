export default function RetryScreen({ retry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <p className="text-lg font-semibold text-red-700">⚠️ Unable to load menu</p>
      <p className="mt-2 text-gray-700 text-center px-6">
        Possible internet issue or server timeout.
      </p>

      <button
        onClick={retry}
        className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}
