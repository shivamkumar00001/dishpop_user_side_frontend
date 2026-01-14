export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left - Brand */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-white/90 rounded-full" />
            </div>
            <span className="text-sm font-semibold text-gray-800">DishPop</span>
          </div>
          
          {/* Center - Links */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-800 transition-colors">AR Experience</a>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <a href="#" className="hover:text-gray-800 transition-colors">Support</a>
          </div>
          
          {/* Right - Copyright */}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}