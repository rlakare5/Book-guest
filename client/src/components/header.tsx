import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Our Team",
    "Event Details", 
    "Corporate Booking",
    "Career",
    "Our Policy",
    "Clubs",
    "Dinings",
    "About",
    "Contact Us"
  ];

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-4 bg-red-600 rounded"></div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-red-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-red-600 transition-colors py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
