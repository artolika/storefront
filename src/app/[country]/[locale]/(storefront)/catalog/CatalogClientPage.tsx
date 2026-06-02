// src/app/[country]/[locale]/(storefront)/catalog/CatalogClientPage.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronDown, ChevronLeft, ArrowUpRight } from "lucide-react";
import { CATALOGS_DATA, ITEMS_PER_PAGE } from "./catalogs";

export default function CatalogClientPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const allAvailableTags = useMemo(() => {
        const tagsSet = new Set<string>();
        CATALOGS_DATA.forEach(item => item.tags.forEach(t => tagsSet.add(t)));
        return ["all", ...Array.from(tagsSet)];
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedTag]);

    const filteredCatalogs = useMemo(() => {
        return CATALOGS_DATA.filter((catalog) => {
            const matchesSearch =
                catalog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                catalog.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
                catalog.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag === "all" || catalog.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [searchQuery, selectedTag]);

    const totalPages = Math.ceil(filteredCatalogs.length / ITEMS_PER_PAGE);

    const paginatedCatalogs = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCatalogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCatalogs, currentPage]);

    return (
        <div className="min-h-screen bg-[#fafafa] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
            <div className="w-full max-w-7xl mx-auto flex flex-col">

                {/* Centered Main Header Section */}
                <div className="py-10 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-400 text-gray-900 tracking-tight">Catalogs</h1>
                        <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
                            Experience our fresh 3D Lookbooks of Artolika with seamlessly integrated pages that let you find your choice faster, convenient and easier
                        </p>
                    </div>

                    {/* Brand-Aligned Search Pill */}
                    <div className="w-full sm:w-auto bg-[#f4f4f6] rounded-full p-1 pr-1.5 pl-5 flex items-center justify-between gap-2 border border-gray-100 shrink-0 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent text-xs font-semibold text-gray-700 outline-none placeholder-gray-400 w-full min-w-[160px] sm:w-52 py-2"
                            placeholder="Search lookbooks..."
                        />

                        <div className="h-4 w-[1px] bg-gray-300 mx-1 shrink-0" />

                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-0.5 text-[11px] font-bold text-gray-800 tracking-wider uppercase bg-transparent px-1 hover:opacity-80 transition-opacity whitespace-nowrap py-2"
                            >
                                <span>{selectedTag === "all" ? "Collections" : selectedTag}</span>
                                <ChevronDown className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-30 text-left max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-100">
                                        {allAvailableTags.map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => {
                                                    setSelectedTag(tag);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full px-4 py-2 text-xs font-semibold block transition-colors text-left capitalize ${selectedTag === tag
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                            >
                                                {tag === "all" ? "All Collections" : tag}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="bg-[#1c1c1e] text-white p-2 rounded-full shrink-0 shadow-xs flex items-center justify-center">
                            <Search className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>

                {/* Main Lookbook Showcase Grid */}
                <div className="py-10">
                    {filteredCatalogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                            {paginatedCatalogs.map((catalog) => (
                                <a
                                    key={catalog.id}
                                    href={catalog.viewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col outline-none"
                                >
                                    {/* Lookbook Card frame setup matching Screenshot 2026-06-01 at 5.17.16 PM.png */}
                                    <div className="w-full aspect-[3/4] bg-[#fdfdfd] border border-gray-200/90 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group-hover:shadow-md group-hover:border-gray-300 group-hover:bg-gray-50/40">
                                        <div className="absolute inset-0 w-full h-full p-0 flex items-center justify-center mix-blend-multiply">
                                            <div className="relative w-full h-full overflow-hidden rounded-lg">
                                                <Image
                                                    src={catalog.imageSrc}
                                                    alt={catalog.title}
                                                    fill
                                                    sizes="(max-w-7xl) 25vw, 50vw"
                                                    className="object-contain w-full h-full transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-[1.02]"
                                                    priority
                                                />
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs border border-gray-100 shadow-2xs p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            <ArrowUpRight className="w-4 h-4 text-gray-900" />
                                        </div>
                                    </div>

                                    {/* Text Layout sizing scaled precisely to balance lookbook viewframes */}
                                    <div className="mt-5 text-center space-y-1">
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-none group-hover:text-black transition-colors">
                                            {catalog.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 font-semibold tracking-normal">
                                            {catalog.collection}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-400 text-sm">
                            No catalogs match your filtering parameters.
                        </div>
                    )}

                    {/* Pagination Bar */}
                    {totalPages > 1 && (
                        <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500">
                                Page <span className="text-gray-900">{currentPage}</span> of {totalPages}
                            </span>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center"
                                >
                                    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                                </button>

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center rotate-180"
                                >
                                    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lower Highlights: Grid layout built with direct un-boxed SVGs scaled up */}
                <div className="mt-10 border-t border-gray-200/60 pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white border border-gray-200/70 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 shadow-2xs hover:shadow-xs transition-all duration-200">
                        <div className="w-12 h-12 relative flex items-center justify-center">
                            <Image
                                src="/images/catalog/icons/3d-lookbook.svg"
                                alt="3D Lookbook Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-gray-900 tracking-tight">3D Lookbook</h4>
                            <p className="text-sm text-gray-400 font-medium">Experience Lifelike Book</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-gray-200/70 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 shadow-2xs hover:shadow-xs transition-all duration-200">
                        <div className="w-10 h-10 relative flex items-center justify-center">
                            <Image
                                src="/images/catalog/icons/pdf-search.svg"
                                alt="Live Search Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-gray-900 tracking-tight">Live Search</h4>
                            <p className="text-sm text-gray-400 font-medium">Search Faster Than Real</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-gray-200/70 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 shadow-2xs hover:shadow-xs transition-all duration-200">
                        <div className="w-10 h-10 relative flex items-center justify-center">
                            <Image
                                src="/images/catalog/icons/easy-focus.svg"
                                alt="Easy Selection Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-gray-900 tracking-tight">Easy Selection</h4>
                            <p className="text-sm text-gray-400 font-medium">Hassle Free Selection</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
