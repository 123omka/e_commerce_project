import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#232F3E] text-gray-300 text-sm">
      {/* TOP LINKS */}
      <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2">
            <li>About ModaElite</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Fashion Insights</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Connect with Us</h3>
          <ul className="space-y-2">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>X (Twitter)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">
            Sell with ModaElite
          </h3>
          <ul className="space-y-2">
            <li>Become a Seller</li>
            <li>Brand Protection</li>
            <li>Global Selling</li>
            <li>Affiliate Program</li>
            <li>Fulfilment Services</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2">
            <li>Your Account</li>
            <li>Returns & Refunds</li>
            <li>Shipping Information</li>
            <li>100% Purchase Protection</li>
            <li>Customer Support</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-600"></div>

      {/* BRAND + LANGUAGE */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
        <div className="text-2xl font-bold text-white tracking-wide">
          ModaElite
        </div>

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
            <p className="text-white">ModaElite Store</p>
            <p>Premium Fashion & Lifestyle</p>
          </div>

          <div>
            <p className="text-white">Cloud & Tech</p>
            <p>Secure Shopping Platform</p>
          </div>

          <div>
            <p className="text-white">Digital Content</p>
            <p>Style Guides & Lookbooks</p>
          </div>

          <div>
            <p className="text-white">Entertainment</p>
            <p>Fashion Shows & Events</p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 ModaElite.com, Inc. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
