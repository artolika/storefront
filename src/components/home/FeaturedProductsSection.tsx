// src/components/home/FeaturedProductsSection.tsx
import Link from "next/link";
import { Suspense } from "react";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { ArrowRight } from "lucide-react";

function CarouselSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={`skeleton-card-${i}`} />
            ))}
        </div>
    );
}

interface FeaturedProductsSectionProps {
    basePath: string;
    locale: string;
    country: string;
    currency?: string;
}

export async function FeaturedProductsSection({
    basePath,
    locale,
    country,
    currency,
}: FeaturedProductsSectionProps) {
    return (
        <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100/60 font-sans antialiased text-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Clean, minimalist conversion segment header alignment */}
                <div className="flex items-end justify-between border-b border-gray-100 pb-5">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Bespoke Masterpieces
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 font-medium">
                            Explore popular frame blueprints curated live by our Karimnagar design studio.
                        </p>
                    </div>
                    
                    <Link 
                        href={`${basePath}/products`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 tracking-wider uppercase hover:opacity-70 transition-opacity whitespace-nowrap"
                    >
                        <span>View All Artworks</span>
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </Link>
                </div>

                <Suspense fallback={<CarouselSkeleton />}>
                    <FeaturedProducts
                        basePath={basePath}
                        locale={locale}
                        country={country}
                        currency={currency}
                    />
                </Suspense>
            </div>
        </section>
    );
}
