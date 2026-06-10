import { AuthProvider } from "@/context/AuthContext";
import { FlightProvider } from "@/context/FlightContext";
import FixedBottomCTA from "@/components/FixedBottomCta";
import MobileCallExperience from "@/components/GenericComponent/MobileCallExperience";
import {
  ContactInfo,
  getStructuredContact,
  getWebsiteUrl,
} from "@/config/ContactInfo";
import { createMetadata } from "@/lib/seo";
import { Montserrat, Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";

// Updated fonts for Tripyzo
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const GTM_ID = "GTM-K3JMVVCZ";

export const metadata = createMetadata({
  title: "Tripyzo | Cheap Flights, Flight Deals & Travel Booking",
  description:
    "Book cheap flights with Tripyzo. Compare airfare, find flight deals, and get English-speaking travel support for domestic and international trips.",
  path: "/",
  keywords: [
    "Tripyzo cheap flights",
    "Tripyzo flight deals",
    "book airline tickets",
    "compare airfare",
    "flight booking agency",
    "US travel agency",
  ],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#c1272d",
};

export default function RootLayout({ children }) {
  const structuredContact = getStructuredContact();
  const siteUrl = getWebsiteUrl();
  const flightsUrl = getWebsiteUrl("/flights");

  return (
    <html lang="en">
      <head>
        {/* ===== PRELOADS & PRECONNECTS ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* ===== FAVICONS ===== */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link rel="icon" href="/images/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ===== SECURITY & HEADERS ===== */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ===== GOOGLE CONSENT MODE ===== */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* ===== GOOGLE TAG MANAGER ===== */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* ===== STRUCTURED DATA - ORGANIZATION ===== */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: ContactInfo.name,
              alternateName: "Tripyzo Travel",
              url: siteUrl,
              logo: getWebsiteUrl("/images/logo.png"),
              image: getWebsiteUrl("/images/hero-banner.jpg"),
              description:
                "Book cheap flights and find exclusive flight deals with Tripyzo. Compare prices from 100+ airlines for domestic and international travel.",
              sameAs: [
                "https://www.facebook.com/Tripyzo",
                "https://twitter.com/Tripyzo",
                "https://www.instagram.com/Tripyzo",
                "https://www.linkedin.com/company/Tripyzo",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: structuredContact.phone,
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: ["English"],
              },
              address: {
                "@type": "PostalAddress",
                ...structuredContact.address,
              },
              priceRange: "$$",
              openingHours: "Mo-Su 00:00-23:59",
              telephone: structuredContact.phone,
            }),
          }}
        />

        {/* ===== STRUCTURED DATA - WEBSITE ===== */}
        <Script
          id="structured-data-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: ContactInfo.name,
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    `${flightsUrl}?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ===== STRUCTURED DATA - LOCAL BUSINESS ===== */}
        <Script
          id="structured-data-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: ContactInfo.name,
              image: getWebsiteUrl("/images/logo.png"),
              telephone: structuredContact.phone,
              email: structuredContact.email,
              address: {
                "@type": "PostalAddress",
                ...structuredContact.address,
              },
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
            }),
          }}
        />

        {/* ===== STRUCTURED DATA - BREADCRUMBLIST ===== */}
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Flights",
                  item: flightsUrl,
                },
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${montserrat.variable} ${openSans.variable} ${poppins.variable} antialiased bg-white pb-24 text-[#1e293b] font-body md:pb-0`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <main id="main-content">
          <AuthProvider>
            <FlightProvider>
              <Suspense fallback={null}>
                <MobileCallExperience />
              </Suspense>
              {children}
              <FixedBottomCTA />
              {/* <CookieConsent /> */}
            </FlightProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
