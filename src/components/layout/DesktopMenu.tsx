// src/components/layout/DesktopMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Info, Phone, Box, PenTool, BookOpen } from "lucide-react";

interface DesktopMenuProps {
  rootCategories: any[];
  basePath: string;
  locale: string;
}

export function DesktopMenu({ basePath }: DesktopMenuProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Fixed widths matching your CSS calculations: absolute centered at 50% left with negative x-translation translation maps
  const baseLinkClass = "relative text-[17px] font-semibold tracking-normal transition-colors duration-200 py-2 px-3 block text-slate-900 hover:text-slate-900 after:content-[''] after:w-[calc(100%-1.2em)] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-current after:transition-transform after:duration-200 after:ease-in-out";
  const inactiveUnderline = "after:scale-x-0 hover:after:scale-x-100";
  const activeUnderline = "after:scale-x-100 text-slate-900";

  return (
    <nav className="hidden lg:flex items-center ml-auto relative">
      <ul className="flex items-center gap-1">
        {/* Products Link */}
        <li>
          <Link
            href={`${basePath}/products`}
            className={`${baseLinkClass} ${isActive(`${basePath}/products`) ? activeUnderline : inactiveUnderline}`}
          >
            Products
          </Link>
        </li>

        {/* Catalog Link */}
        <li>
          <Link
            href={`${basePath}/catalog`}
            className={`${baseLinkClass} ${isActive(`${basePath}/catalog`) ? activeUnderline : inactiveUnderline}`}
          >
            Catalog
          </Link>
        </li>

        {/* Where to Buy Link */}
        <li>
          <Link
            href={`${basePath}/locate-stores`}
            className={`${baseLinkClass} ${isActive(`${basePath}/locate-stores`) ? activeUnderline : inactiveUnderline}`}
          >
            Where to Buy?
          </Link>
        </li>

        {/* More Dropdown Wrapper Menu */}
        <li
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            type="button"
            className={`${baseLinkClass} flex items-center gap-1 cursor-pointer select-none ${isActive(`${basePath}/about`) || isActive(`${basePath}/contact`) ? activeUnderline : "after:scale-x-0"
              }`}
          >
            <span>More</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Overlay Flyout Menu Panel */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
              <Link
                href={`${basePath}/about`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-gray-900 transition-colors"
              >
                <Info className="w-4 h-4 text-gray-500" strokeWidth={2.2} />
                <span>About</span>
              </Link>

              <Link
                href={`${basePath}/contact`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4 text-gray-500" strokeWidth={2.2} />
                <span>Contact</span>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-400 hover:bg-slate-50 transition-colors cursor-not-allowed"
              >
                <Box className="w-4 h-4 text-gray-300" strokeWidth={2.2} />
                <span>VR 360°</span>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-400 hover:bg-slate-50 transition-colors cursor-not-allowed"
              >
                <PenTool className="w-4 h-4 text-gray-300" strokeWidth={2.2} />
                <span>ProDesign™</span>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-400 hover:bg-slate-50 transition-colors cursor-not-allowed"
              >
                <BookOpen className="w-4 h-4 text-gray-300" strokeWidth={2.2} />
                <span>Guide</span>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
