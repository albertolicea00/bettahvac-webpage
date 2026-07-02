<script>
  import "./app.css";
  import Navbar from "./lib/components/Navbar.svelte";
  import Hero from "./lib/components/Hero.svelte";
  import Reviews from "./lib/components/Reviews.svelte";
  import About from "./lib/components/About.svelte";
  import Services from "./lib/components/Services.svelte";
  import FAQ from "./lib/components/FAQ.svelte";
  import Contact from "./lib/components/Contact.svelte";
  import FixedSocials from "./lib/components/FixedSocials.svelte";
</script>

<svelte:head>
  <title>bettaHVAC | Professional HVAC Services in Lexington, KY</title>
  <meta name="description" content="bettaHVAC provides expert heating, ventilation, and air conditioning services in Lexington, KY. Licensed professionals, 24/7 emergency service, and free quotes. Call us today!" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://bettahvac.com/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="bettaHVAC | Professional HVAC Services in Lexington, KY" />
  <meta property="og:description" content="Expert heating, ventilation, and air conditioning services. Licensed professionals, 24/7 emergency service, free quotes." />
  <meta property="og:url" content="https://bettahvac.com/" />
  <meta property="og:site_name" content="bettaHVAC" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="bettaHVAC | Professional HVAC Services in Lexington, KY" />
  <meta name="twitter:description" content="Expert heating, ventilation, and air conditioning services in Lexington, KY." />

  <!-- LocalBusiness Structured Data -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "bettaHVAC",
    "description": "Professional heating, ventilation, and air conditioning services in Lexington, KY and surrounding areas.",
    "url": "https://bettahvac.com",
    "telephone": "(555) 123-4567",
    "email": "fake@bettahvac.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lexington",
      "addressRegion": "KY",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 38.0406,
        "longitude": -84.5037
      },
      "geoRadius": "80000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://facebook.com/bettahvac",
      "https://instagram.com/bettahvac"
    ]
  }
  <\/script>`}

  <!-- FAQPage Structured Data -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often should I service my HVAC equipment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend scheduling preventative maintenance at least twice a year: once in the spring for the air conditioning and once in the fall for the heating."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer 24/7 emergency service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our team is available 24 hours a day, 7 days a week to handle any emergency in Lexington and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to install a new air conditioning system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, a standard installation takes one business day (8 to 10 hours). However, the time may vary depending on the complexity of the system and necessary modifications."
        }
      },
      {
        "@type": "Question",
        "name": "What brands of equipment do you install?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with the leading and best brands on the market, guaranteeing quality, energy efficiency, and durability in all our installations."
        }
      }
    ]
  }
  <\/script>`}
</svelte:head>

<!-- Skip to main content (accessibility) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<Navbar />
<main id="main-content">
  <FixedSocials />
  <Hero />
  <Reviews />
  <About />
  <Services />
  <FAQ />
  <Contact />
</main>

<style>
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 99999;
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    font-weight: 700;
    font-family: var(--font-heading);
    text-decoration: none;
    transition: top 0.2s ease;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
