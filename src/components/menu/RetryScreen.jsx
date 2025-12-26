export default function RetryScreen({ retry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4 sm:px-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 text-center w-full max-w-md">
        <div className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-amber-100">
          <span className="text-2xl sm:text-3xl">⚠️</span>
        </div>
        
        <p className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Unable to load menu</p>
        <p className="text-sm sm:text-base text-slate-600 text-center px-2">
          Possible internet issue or server timeout.
        </p>
        
        <button
          onClick={retry}
          className="mt-6 w-full sm:w-auto bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                   px-6 sm:px-8 py-3 rounded-xl shadow-lg font-bold text-sm sm:text-base
                   hover:from-slate-700 hover:to-slate-600 hover:shadow-xl
                   active:scale-95 transition-all duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
}