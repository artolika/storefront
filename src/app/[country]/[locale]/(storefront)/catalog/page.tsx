// src/app/[country]/[locale]/(storefront)/catalog/page.tsx

import { Metadata } from "next";
import CatalogClientPage from "./CatalogClientPage";

export const metadata: Metadata = {
    title: "Official 3D Lookbooks & Catalogs",
    description: "Browse through our collection lookbooks to find your choice faster, convenient and easier.",
};

export default function CatalogPage() {
    return <CatalogClientPage />;
}