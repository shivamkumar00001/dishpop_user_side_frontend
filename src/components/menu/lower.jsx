export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100">
      <div className="max-w-4xl mx-auto px-2 py-0">
        <div className="flex items-baseline justify-between text-sm leading-[1]">
          
          {/* Brand */}
          <div className="flex items-baseline gap-1">
            <span className="inline-flex w-2.5 h-2.5 rounded-sm bg-green-600" />
            <span className="font-semibold text-green-700">
              DishPop
            </span>
          </div>

          {/* Links */}
          <div className="flex items-baseline gap-2 font-medium text-green-600">
            <a href="#" className="hover:text-green-700">AR</a>
            <span className="text-green-300">•</span>
            <a href="#" className="hover:text-green-700">Support</a>
          </div>

          {/* Copyright */}
          <span className="font-medium text-green-500">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
