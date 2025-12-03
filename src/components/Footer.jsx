import { Mail, Smartphone, MapPin  } from 'lucide-react';

// Data structure for the footer links
const FOOTER_LINKS = [
  {
    title: "Shop & Discover",
    links: [
      { name: "New Arrivals", href: "#new-arrivals" },
      { name: "Best Sellers", href: "#best-sellers" },
      { name: "Electronics", href: "#electronics" },
      { name: "Home & Kitchen", href: "#home-kitchen" },
      { name: "Gift Cards", href: "#gift-cards" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { name: "FAQ & Help Center", href: "#faq" },
      { name: "Shipping & Returns", href: "#shipping" },
      { name: "Track Your Order", href: "#track" },
      { name: "Contact Us", href: "#contact" },
      { name: "Accessibility", href: "#accessibility" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Our Story", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press & Media", href: "#press" },
      { name: "Affiliate Program", href: "#affiliate" },
      { name: "Sustainability", href: "#sustainability" },
    ],
  },
];
// Helper component for rendering a column of links
const LinkColumn = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-700 pb-1">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="text-gray-300 hover:text-indigo-400 transition duration-150 text-sm"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Component for displaying payment and trust icons
const PaymentIcons = () => {
  // Using placeholder image URLs for visual fidelity
  const paymentMethods = [
    "https://placehold.co/60x30/1e293b/ffffff?text=Visa",
    "https://placehold.co/60x30/1e293b/ffffff?text=Master",
    "https://placehold.co/60x30/1e293b/ffffff?text=PayPal",
    "https://placehold.co/60x30/1e293b/ffffff?text=ApplePay",
  ];

  return (
    <div className="flex flex-wrap gap-2 pt-4 justify-center">
      {paymentMethods.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Payment method ${index + 1}`}
          className="h-6 opacity-70 hover:opacity-100 transition duration-300 rounded"
          // Fallback in case placeholder fails
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x30/475569/ffffff?text=Card"; }}
        />
      ))}
      <span className="text-xs text-green-400 border border-green-400 px-2 py-1 rounded-full ml-4 self-center hidden sm:inline-block">
        SECURE CHECKOUT
      </span>
    </div>
  );
};
// Main App Component
const App = () => {

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 font-sans mt-6 pb-3">
      <div className="max-w-7xl mx-auto px-8 pt-8">

        {/* Top Section: Branding, Newsletter & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-10">

          {/* Column 1: Brand & Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-3xl font-extrabold text-indigo-400 tracking-wider">
              K- <span className="text-white">Ecomerce</span>
            </h2>
            <p className="text-sm">
              Dedicated to delivering the best quality products right to your door. Shop Smart, Live Better.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-indigo-500" />
                <span>Hongdev168@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-indigo-500" />
                <span>27  St, Phnom Penh, Cambodia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone size={16} className="text-indigo-500" />
                <span>(+855) 09780 - 80208</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((column) => (
              <LinkColumn key={column.title} {...column} />
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} K- Ecomerce, Inc. All Rights Reserved.
            <span className="ml-2 hidden sm:inline-block">|</span>
            <span className="ml-2 block sm:inline-block">Built By HongDev.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default App;