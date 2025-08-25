'use client'

import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LUXE",
    "url": "https://luxe.com",
    "description": "Discover timeless elegance and premium luxury fashion for the modern lifestyle.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://luxe.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://facebook.com/luxe",
      "https://instagram.com/luxe",
      "https://twitter.com/luxe"
    ]
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LUXE",
    "url": "https://luxe.com",
    "logo": "https://luxe.com/logo.png",
    "description": "Premium luxury fashion and lifestyle retailer offering curated collections of designer clothing, accessories, and exclusive items.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Luxury Avenue",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "support@luxe.com"
    },
    "sameAs": [
      "https://facebook.com/luxe",
      "https://instagram.com/luxe",
      "https://twitter.com/luxe"
    ]
  }

  return (
    <>
      <Script id="structured-data-website" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <Script id="structured-data-organization" type="application/ld+json">
        {JSON.stringify(organizationData)}
      </Script>
    </>
  )
}