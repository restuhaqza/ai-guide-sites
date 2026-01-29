import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    author?: string;
    publishDate?: string;
    structuredData?: object;
}

export function useSEO({
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'article',
    twitterCard = 'summary_large_image',
    author,
    publishDate,
    structuredData,
}: SEOProps) {
    useEffect(() => {
        // Update document title
        if (title) {
            document.title = title;
        }

        // Helper function to update or create meta tag
        const updateMetaTag = (selector: string, attribute: string, content: string) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute.split('=')[0], attribute.split('=')[1].replace(/['"]/g, ''));
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Helper function to update or create link tag
        const updateLinkTag = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
            if (!element) {
                element = document.createElement('link');
                element.rel = rel;
                document.head.appendChild(element);
            }
            element.href = href;
        };

        // Update standard meta tags
        if (description) {
            updateMetaTag('meta[name="description"]', 'name="description"', description);
        }

        // Update canonical URL
        if (canonical) {
            updateLinkTag('canonical', canonical);
        }

        // Update Open Graph tags
        if (ogTitle) {
            updateMetaTag('meta[property="og:title"]', 'property="og:title"', ogTitle);
        }
        if (ogDescription) {
            updateMetaTag('meta[property="og:description"]', 'property="og:description"', ogDescription);
        }
        if (ogImage) {
            updateMetaTag('meta[property="og:image"]', 'property="og:image"', ogImage);
        }
        if (ogType) {
            updateMetaTag('meta[property="og:type"]', 'property="og:type"', ogType);
        }
        if (canonical) {
            updateMetaTag('meta[property="og:url"]', 'property="og:url"', canonical);
        }

        // Update Twitter Card tags
        if (twitterCard) {
            updateMetaTag('meta[name="twitter:card"]', 'name="twitter:card"', twitterCard);
        }
        if (ogTitle) {
            updateMetaTag('meta[name="twitter:title"]', 'name="twitter:title"', ogTitle);
        }
        if (ogDescription) {
            updateMetaTag('meta[name="twitter:description"]', 'name="twitter:description"', ogDescription);
        }
        if (ogImage) {
            updateMetaTag('meta[name="twitter:image"]', 'name="twitter:image"', ogImage);
        }

        // Add article-specific meta tags
        if (author) {
            updateMetaTag('meta[name="author"]', 'name="author"', author);
        }
        if (publishDate && ogType === 'article') {
            updateMetaTag('meta[property="article:published_time"]', 'property="article:published_time"', publishDate);
        }

        // Add structured data (JSON-LD)
        if (structuredData) {
            let scriptElement = document.querySelector('script[type="application/ld+json"]');
            if (!scriptElement) {
                scriptElement = document.createElement('script');
                scriptElement.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptElement);
            }
            scriptElement.textContent = JSON.stringify(structuredData);
        }

        // Cleanup function
        return () => {
            // We don't remove meta tags on cleanup to avoid flickering
            // They'll be updated by the next component that uses this hook
        };
    }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, author, publishDate, structuredData]);
}
