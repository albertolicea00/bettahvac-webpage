<script>
  import "./app.css";

  import Navbar from "./lib/components/Navbar.svelte";
  import Hero from "./lib/components/Hero.svelte";
  import Services from "./lib/components/Services.svelte";
  import About from "./lib/components/About.svelte";
  import Contact from "./lib/components/Contact.svelte";
  import Reviews from "./lib/components/Reviews.svelte";
  import FAQ from "./lib/components/FAQ.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";

  import FixedSocials from "./lib/components/FixedSocials.svelte";
</script>

<svelte:head>
  <title>bettaHVAC | Premium Heating & Cooling</title>
</svelte:head>

<Navbar />
<main>
  <ThemeToggle />
  <FixedSocials />
  <Hero />
  <Services />
  <Reviews />
  <About />
  <FAQ />
  <Contact />
</main>

<style>
</style>
