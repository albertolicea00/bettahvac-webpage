<script>
  const MAX_TILT = 10; // degrees

  let tiltX = $state(0);
  let tiltY = $state(0);
  let tilting = $state(false);

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX = -y * MAX_TILT * 2;
    tiltY = x * MAX_TILT * 2;
    tilting = true;
  }

  function resetTilt() {
    tiltX = 0;
    tiltY = 0;
    tilting = false;
  }

  const cities = [
    "Lexington",
    "Georgetown",
    "Nicholasville",
    "Richmond",
    "Winchester",
    "Versailles",
    "Frankfort",
    "Berea",
    "Danville",
    "Lawrenceburg",
    "Paris",
    "Midway"
  ];
</script>

<section id="contact">
  <div class="cta-banner">
    <h3>Still have questions?</h3>
    <p>
      Our technicians are ready to provide technical support and personalized
      advice for your home or business.
    </p>
    <div class="cta-buttons">
      <a href="tel:1-800-911-HVAC" class="cta-btn cta-primary">
        <i class="fa-solid fa-phone"></i> Call Us Now
      </a>
      <a href="mailto:fake@bettahvac.com" class="cta-btn cta-secondary">
        <i class="fa-solid fa-envelope"></i> Email Us
      </a>
    </div>
  </div>

  <div class="areas-section section section-alt">
    <div class="container contact-wrapper">
      <div class="map-col">
        <div
          class="map-tilt"
          class:tilting
          role="presentation"
          style="--tilt-x: {tiltX}deg; --tilt-y: {tiltY}deg"
          onpointermove={handleMove}
          onpointerleave={resetTilt}
          onpointercancel={resetTilt}
        >
          <img src="/assets/kentucky-map.webp" alt="Kentucky state silhouette map showing bettaHVAC service area" class="map-img" width="600" height="400" loading="lazy" draggable="false" />
        </div>
        <div class="map-caption">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          <span>Proudly serving Central Kentucky</span>
        </div>
      </div>

      <div class="info-col">
        <h2 class="contact-title">Areas We Serve</h2>

        <ul class="cities" aria-label="Cities we serve">
          {#each cities as city (city)}
            <li>
              <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
              {city}, KY
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .map-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .map-tilt {
    perspective: 900px;
    touch-action: pan-y; /* keep vertical scroll working on mobile */
  }

  .map-img {
    display: block;
    width: 100%;
    height: auto;
    transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
    transform-style: preserve-3d;
    transition: transform 0.5s ease, filter 0.5s ease;
    filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.28));
    will-change: transform;
    user-select: none;
    -webkit-user-drag: none;
  }

  .map-tilt.tilting .map-img {
    transition: transform 0.08s linear, filter 0.3s ease;
    filter: drop-shadow(0 28px 45px rgba(0, 0, 0, 0.35));
  }

  @media (prefers-reduced-motion: reduce) {
    .map-img {
      transform: none;
      transition: none;
    }
  }

  .map-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--color-text-light);
    font-size: 0.95rem;
  }

  .map-caption i {
    color: var(--color-secondary);
  }

  .info-col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-title {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
    color: var(--color-primary);
  }

  .cities {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem 1.5rem;
  }

  .cities li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-text-light);
    font-weight: 500;
  }

  .cities li i {
    color: var(--color-secondary);
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .contact-title {
      text-align: center;
    }

    .cities {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .cities {
      grid-template-columns: repeat(2, 1fr);
    }

    .cities li {
      justify-content: center;
    }
  }
  .areas-section {
    background-color: var(--color-bg);
  }

  .cta-banner {
    background-color: var(--color-bg-alt);
    text-align: center;
    padding: 5rem 2rem;
    width: 100%;
    color: var(--color-text);
  }

  .cta-banner h3 {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 0.75rem;
  }

  .cta-banner p {
    color: var(--color-text-light);
    max-width: 480px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-btn {
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
  }

  .cta-primary {
    background: var(--color-primary);
    color: white;
    box-shadow: 0 4px 15px rgba(15, 59, 140, 0.3);
  }

  .cta-primary:hover {
    background: var(--color-primary-light);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(15, 59, 140, 0.35);
  }

  .cta-secondary {
    background-color: var(--color-bg);
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .cta-secondary:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    .cta-banner {
      padding: 3.5rem 1.5rem;
    }

    .cta-banner h3 {
      font-size: 1.6rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .cta-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
</style>