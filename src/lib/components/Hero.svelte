<script>
  export let data;
  export let emergencyPhone = "";
</script>

<header class="hero">
  <div class="overlay"></div>
  <div class="container hero-content">
    <div class="text-container glass-panel">
      <!-- Emergency Badge -->
      {#if emergencyPhone}
        <div class="emergency-badge animate-float">
          <span class="badge badge-emergency">
            <i class="fa-solid fa-phone-volume"></i> 24/7 Emergency: {emergencyPhone}
          </span>
        </div>
      {/if}
      <img
        src="/assets/img/logo_raw.jpg"
        alt="BettaHVAC Logo"
        class="hero-logo"
      />
      <h1 class="hero-title">{data.headline}</h1>
      <p class="hero-subtitle">{data.subheadline}</p>
      <div class="cta-group">
        <a href="#contact" class="btn btn-primary">{data.ctaText}</a>
        <a href="#services" class="btn btn-secondary">Our Services</a>
      </div>
    </div>
  </div>
</header>

<style>
  .hero {
    position: relative;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("https://images.unsplash.com/photo-1581094369796-7c91ad9bb6eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")
      center/cover no-repeat;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(15, 59, 140, 0.7),
      rgba(193, 18, 31, 0.4)
    );
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding-top: 5rem;
  }

  .text-container {
    max-width: 800px;
    padding: 3rem;
    text-align: center;
    animation: fadeInUp 1s ease forwards;
  }

  .emergency-badge {
    margin-bottom: 2rem;
  }

  .hero-logo {
    width: 200px; /* Fixed width for consistency */
    height: 200px; /* Fixed height for consistency */
    object-fit: cover; /* Ensures the image fills the circle */
    border-radius: 50%; /* Makes it circular */
    margin-bottom: 2rem;
    border: 4px solid var(--color-gold, #d4af37); /* Added a premium gold border */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: var(--color-primary);
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5); /* contrast against glass */
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    color: var(--color-text);
    margin-bottom: 2.5rem;
    font-weight: 500;
  }

  .cta-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .text-container {
      padding: 2rem 1.5rem;
    }
  }
</style>
