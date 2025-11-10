import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Wrytflow AI</h3>
            <p className="text-sm text-gray-400">
              Professional AI book auditing and content quality solutions by
              <a
                href="https://zryth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline hover:text-white transition-colors"
              >
                Zryth Solutions
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+919870661438" className="hover:text-white transition-colors">+91-9870661438</a>
              </li>
              <li>
                <a href="mailto:contact@zryth.com" className="hover:text-white transition-colors">contact@zryth.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Wrytflow AI by Zryth Solutions. All rights reserved.</p>
          <div className="flex items-center gap-5 text-sm">
            <a href="https://www.linkedin.com/company/zryth/" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/zryth-solutions" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


