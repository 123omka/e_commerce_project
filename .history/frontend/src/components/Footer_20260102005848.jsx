import React from "react";
import { MdLocationOn } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-200 ">
      <div className="max-w-[1600px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-14 text-sm text-gray-700">

        {/* BRAND / ABOUT */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              EC
            </div>
            <span className="text-base font-semibold text-gray-800">
              E-Commerce
            </span>
          </div>

          <p className="text-[13px] leading-relaxed text-gray-600">
            E-Commerce is a modern online shopping platform focused on delivering
            quality products, reliable service, and a seamless shopping
            experience.
          </p>

          <p className="mt-3 text-[13px] leading-relaxed text-gray-600">
            We work with trusted sellers and logistics partners to ensure fast
            delivery and secure payments.
          </p>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">
            Shop
          </h3>
          <ul className="space-y-3 text-[13px] text-gray-600">
            <li className="hover:text-gray-900 cursor-pointer">All Products</li>
            <li className="hover:text-gray-900 cursor-pointer">New Arrivals</li>
            <li className="hover:text-gray-900 cursor-pointer">Best Sellers</li>
            <li className="hover:text-gray-900 cursor-pointer">Offers</li>
            <li className="hover:text-gray-900 cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-medium text-gray-800 ">
            Contact
          </h3>

          <ul className="space-y-2 text-[13px] text-gray-600">
            <li className="flex items-start gap-2">
              <MdLocationOn className="text-blue-600 text-lg mt-0.5" />
              <span>
                Business Park, Main Road<br />
                Pune, Maharashtra<br />
                India
              </span>
            </li>

            <li className="mt-2">📞 +91 98765 43210</li>
            <li>✉️ support@ecommerce.com</li>
          </ul>

          {/* SOCIAL + POLICIES */}
          <div className="mt-6">
            <div className="flex gap-5 text-gray-600">
              <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                <SlSocialFacebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-black">
                <FaXTwitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
                <SlSocialLinkedin size={18} />
              </a>
            </div>

            <div className="flex gap-2 mt-4 text-[12px] text-gray-400">
              <a href="#" className="hover:text-gray-600">Privacy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-600">Terms</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-600">Returns</a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200 py-4 text-center text-[12px] text-gray-500">
        © {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
