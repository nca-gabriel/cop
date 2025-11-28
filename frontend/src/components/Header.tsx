"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "@/utils/axios";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await axios.post("/logout"); // backend clears JWT cookie
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      router.push("/login");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Bookings", path: "/bookings" },
  ];

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      {/* Branding & Navigation */}
      <div className="flex items-center gap-4 md:gap-8">
        <div
          className="text-2xl font-bold cursor-pointer text-blue-600 hover:text-blue-700 transition"
          onClick={() => router.push("/")}
        >
          Customer Portal
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer ${
                pathname.startsWith(item.path)
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 hover:bg-gray-100 transition"
        >
          <span className="font-medium">{userName}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg ring-1 ring-gray-200 py-1 z-20">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden z-20">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                router.push(item.path);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-6 py-3 hover:bg-gray-100 transition ${
                pathname.startsWith(item.path)
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
