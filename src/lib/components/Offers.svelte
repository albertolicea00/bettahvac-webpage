<script>
  export let offers = [];

  const contactEmail = "fake@bettahvac.com";

  const claimOffer = (offer) => {
    const subject = encodeURIComponent(`Claiming Offer: ${offer.title}`);
    const body = encodeURIComponent(
      `Hello BettaHVAC,\n\nI would like to claim the following offer:\n\nTitle: ${offer.title}\nDescription: ${offer.description}\nCode: ${offer.code}\n\nPlease let me know how to proceed.\n\nThank you.`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };
</script>

<section id="offers" class="section">
  <div class="container">
    <div class="offers-header text-center">
      <span class="badge badge-emergency mb-2 animate-float"
        >Limited Time Offers</span
      >
      <h2 class="section-title text-gradient">
        Exclusive Deals in <span class="text-secondary">Kentucky</span>
      </h2>
      <p class="section-subtitle mx-auto">
        Take advantage of these special savings on high-quality HVAC services,
        proudly serving Lexington and surrounding areas.
      </p>
    </div>

    <div class="offers-grid">
      {#each offers as offer, i}
        <div class="offer-card glass-panel" style="animation-delay: {i * 0.2}s">
          <div class="offer-icon">
            <i class="fa-solid fa-tags"></i>
          </div>
          <h3 class="offer-title">{offer.title}</h3>
          <p class="offer-desc">{offer.description}</p>
          <div class="offer-code-wrap">
            <span class="offer-code-label">Use Code:</span>
            <span class="offer-code">{offer.code}</span>
          </div>
          <button
            class="btn btn-secondary mt-4 w-full"
            on:click={() => claimOffer(offer)}>Claim Offer</button
          >
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .mb-2 {
    margin-bottom: 1rem;
  }
  .mt-4 {
    margin-top: 1.5rem;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .w-full {
    width: 100%;
  }

  .offers-header {
    margin-bottom: 3rem;
  }

  .offers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .offer-card {
    padding: 3rem 2rem;
    text-align: center;
    position: relative;
    border-top: 4px solid var(--color-secondary);
    transition:
      transform 0.4s ease,
      box-shadow 0.4s ease;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
    transform: translateY(30px);
  }

  .offer-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-premium);
  }

  .offer-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(
      135deg,
      var(--color-secondary),
      var(--color-secondary-light)
    );
    color: white;
    font-size: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -4.5rem auto 1.5rem auto;
    border: 5px solid var(--color-bg);
    box-shadow: var(--shadow-md);
  }

  .offer-title {
    font-size: 1.75rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .offer-desc {
    color: var(--color-text-light);
    margin-bottom: 2rem;
    min-height: 3em;
  }

  .offer-code-wrap {
    background: var(--color-bg-alt);
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    border: 1px dashed var(--color-primary-light);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .offer-code-label {
    font-size: 0.9rem;
    color: var(--color-text-light);
  }

  .offer-code {
    font-family: monospace;
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-secondary);
    letter-spacing: 2px;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
