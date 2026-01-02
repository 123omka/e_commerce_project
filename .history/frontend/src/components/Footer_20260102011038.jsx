import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#232F3E] text-gray-300 text-sm">
      {/* TOP LINKS */}
      <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Our Science</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Connect with Us</h3>
          <ul className="space-y-2">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">
            Make Money with Us
          </h3>
          <ul className="space-y-2">
            <li>Sell on Our Platform</li>
            <li>Sell Under Accelerator</li>
            <li>Protect & Build Your Brand</li>
            <li>Global Selling</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment Services</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recalls & Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-600"></div>

      {/* LANGUAGE / COUNTRY */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
        <div className="text-xl font-bold text-white">yourShop</div>

        <button className="border border-gray-500 px-4 py-1 rounded">
          English
        </button>
        <button className="border border-gray-500 px-4 py-1 rounded">
          India
        </button>
      </div>

      {/* BOTTOM SERVICES */}
      <div className="bg-[#131A22] py-8">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-gray-400">
          <div>
            <p className="text-white">Books</p>
            <p>Books, Art & Collectibles</p>
          </div>

          <div>
            <p className="text-white">Cloud Services</p>
            <p>Scalable Computing</p>
          </div>

          <div>
            <p className="text-white">Audio & Media</p>
            <p>Music & Podcasts</p>
          </div>

          <div>
            <p className="text-white">Movies</p>
            <p>Films & Celebrities</p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 yourShop.com, Inc. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
