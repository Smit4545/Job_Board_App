"use client";

import Link from "next/link";
import { useState } from "react";
import DarkMode from "./DarkMode";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store"; // Ensure you import RootState

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fetch applied jobs from Redux store
  const appliedJobsCount = useSelector(
    (state: RootState) => state.jobs.appliedJobs.length
  );

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logoo.webp"
                alt="JBA Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <span className="text-3xl font-bold">JBA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/">
              <h1 className="text-xl mt-0  font-bold hover:text-blue-400 transition duration-300">
                Home
              </h1>
            </Link>
            <Link href="/applied">
              <h1 className="text-lg  font-bold hover:text-blue-400 transition duration-300">
                Jobs Applied ({appliedJobsCount})
              </h1>
            </Link>
            <Link href="/generateResume">
              <h1 className="text-lg  font-bold hover:text-blue-400 transition duration-300">
                Generate Resume
              </h1>
            </Link>
          </div>
          <DarkMode />
          {/* Mobile Menu Button */}

          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <div className="px-4 py-2 flex flex-col space-y-2">
            <NavLink href="/" label={`Home`} />
            <NavLink
              href="/applied"
              label={`Jobs Applied (${appliedJobsCount})`}
            />
            <NavLink href="/generateResume" label={`Generate Resume`} />
          </div>
        </div>
      )}
    </header>
  );
}

// Reusable Navigation Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-lg hover:text-blue-400 transition duration-300"
  >
    {label}
  </Link>
);
