// src/app/[country]/[locale]/(storefront)/about/page.tsx
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import AboutClientPage from "./AboutClientPage";

export const metadata: Metadata = {
    title: "Our Story - Premium Architectural Hardware & Design",
    description: "Discover our journey since 2014. Driven by quality, flexibility, durability, and efficiency to craft spaces with premium engineering.",
};

export default function AboutPage() {
    const publicDir = path.join(process.cwd(), "public");

    const getImagesFromDir = (subDirPath: string, webUrlPath: string, skipDirs: string[] = []) => {
        const fullPath = path.join(publicDir, subDirPath);

        if (!fs.existsSync(fullPath)) {
            return [];
        }

        return fs.readdirSync(fullPath)
            .filter(file => {
                const itemPath = path.join(fullPath, file);
                const isFile = fs.statSync(itemPath).isFile();
                const isNotHidden = !file.startsWith(".");
                const isNotSkipped = !skipDirs.includes(file);
                return isFile && isNotHidden && isNotSkipped;
            })
            .map(file => `${webUrlPath}/${file}`);
    };

    const storyImages = getImagesFromDir("images/about/story", "/images/about/story");
    const logoImages = getImagesFromDir("images/about/logos", "/images/about/logos");
    const galleryImages = getImagesFromDir("images/about", "/images/about", ["story", "logos", "icons"]);

    return (
        <AboutClientPage
            initialStoryImages={storyImages}
            initialGalleryImages={galleryImages}
            initialLogoImages={logoImages}
        />
    );
}
