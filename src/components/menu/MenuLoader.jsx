export default function MenuLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading Menu…</p>
    </div>
  );
}
