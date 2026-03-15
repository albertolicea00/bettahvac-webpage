<script>
  import "./app.css";
  import content from "./lib/content.json";

  // Import Sections
  import Hero from "./lib/components/Hero.svelte";
  import Services from "./lib/components/Services.svelte";
  import Offers from "./lib/components/Offers.svelte";
  import AboutContact from "./lib/components/AboutContact.svelte";
  import Reviews from "./lib/components/Reviews.svelte";
  import FAQ from "./lib/components/FAQ.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import Popup from "./lib/components/Popup.svelte";
  import BackgroundFX from "./lib/components/BackgroundFX.svelte";
  import FixedSocials from "./lib/components/FixedSocials.svelte";
</script>

<svelte:head>
  <title>{content.companyName} | Premium Heating & Cooling</title>
</svelte:head>

<main>
  <BackgroundFX />
  <ThemeToggle />
  <FixedSocials socialMedia={content.socialMedia} />
  <Popup />
  <Hero data={content.hero} emergencyPhone={content.emergencyPhone} />
  <Services data={content.services} />
  <Offers offers={content.offers} />
  <Reviews />
  <FAQ faqs={content.faqs} />
  <AboutContact
    aboutData={content.about}
    contactData={content.contact}
    socialMedia={content.socialMedia}
  />
</main>

<style>
  /* Global Layout adjustments if any */
</style>
