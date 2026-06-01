// src/app/[country]/[locale]/(storefront)/catalog/catalogs.ts

export interface CatalogItem {
    id: string;
    slug: string;
    title: string;
    collection: string;
    description: string;
    imageSrc: string;
    viewLink: string;
    tags: string[];
}

export const CATALOGS_DATA: CatalogItem[] = [
    {
        id: "divine-2025",
        slug: "divine-2025",
        title: "Divine 2025",
        collection: "Gods Collection",
        description: "Experience spiritual luxury with intricately structured high-definition visual layouts.",
        imageSrc: "/images/catalog/divine.webp",
        viewLink: "http://hc8koswws0co0c8cws0go0g0.147.79.67.138.sslip.io/artolika/",
        tags: ["Divine", "Premium", "New Releases"]
    },
    {
        id: "rexa-2023",
        slug: "rexa-2023",
        title: "Rexa 2023",
        collection: "Premium Collection",
        description: "Minimalistic architectural framing hardware engineered for premium contemporary spaces.",
        imageSrc: "/images/catalog/rexa.webp",
        viewLink: "http://hc8koswws0co0c8cws0go0g0.147.79.67.138.sslip.io/rexa/",
        tags: ["Rexa", "Minimalist", "Hardware"]
    },
    {
        id: "arturo-2023",
        slug: "arturo-2023",
        title: "Arturo 2023",
        collection: "Modern Exclusivity",
        description: "Luxury integrated profile lighting setups and architectural design installations.",
        imageSrc: "/images/catalog/arturo.webp",
        viewLink: "http://hc8koswws0co0c8cws0go0g0.147.79.67.138.sslip.io/arturo/",
        tags: ["Arturo", "Lighting", "Luxury"]
    },
    {
        id: "doorware-2023",
        slug: "doorware-2023",
        title: "Doorware 2023",
        collection: "Premium Doors",
        description: "Italian collection handle accents and bespoke premium solid-surface passages.",
        imageSrc: "/images/catalog/doorware.webp",
        viewLink: "http://hc8koswws0co0c8cws0go0g0.147.79.67.138.sslip.io/doorware/",
        tags: ["Doorware", "Handles", "Italian"]
    }
];

export const ITEMS_PER_PAGE = 8;