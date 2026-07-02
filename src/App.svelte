<script>
  import "./app.css";
  import content from "./lib/content.json";

  // Import Sections
  import Navbar from "./lib/components/Navbar.svelte";
  import Hero from "./lib/components/Hero.svelte";
  import Services from "./lib/components/Services.svelte";
  import About from "./lib/components/About.svelte";
  import Contact from "./lib/components/Contact.svelte";
  import Reviews from "./lib/components/Reviews.svelte";
  import FAQ from "./lib/components/FAQ.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  
  import BackgroundFX from "./lib/components/BackgroundFX.svelte";
  import FixedSocials from "./lib/components/FixedSocials.svelte";
</script>

<svelte:head>
  <title>{content.companyName} | Premium Heating & Cooling</title>
</svelte:head>

<Navbar />
<main>
  <BackgroundFX />
  <ThemeToggle />
  <FixedSocials socialMedia={content.socialMedia} />
  <Hero data={content.hero} emergencyPhone={content.emergencyPhone} />
  <Services data={content.services} />

  <Reviews />
  <About aboutData={content.about} />
  <FAQ faqs={content.faqs} />
  <Contact contactData={content.contact} />
</main>

<style>
  /* Global Layout adjustments if any */
</style>
