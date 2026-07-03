<script>
  const MAX_TILT = 10;

  let tiltX = $state(0);
  let tiltY = $state(0);
  let tilting = $state(false);

  const trustItems = [
    "Licensed & Insured Professionals",
    "24/7 Emergency Service",
    "100% Satisfaction Guarantee"
  ];

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
</script>

<section id="about" class="section">
  <div class="container about-wrapper">
    <div class="about-col">
      <h2 class="section-title">About bettaHVAC</h2>
      <p class="about-desc">
        With years of experience, bettaHVAC provides top-tier heating, ventilation, and air conditioning services in Lexington, KY. We are dedicated to delivering reliable, efficient, and cost-effective comfort solutions for homes and businesses.
      </p>

      <ul class="trust-list" aria-label="Why choose bettaHVAC">
        {#each trustItems as item}
          <li class="trust-item">
            <i class="fa-solid fa-check trust-icon" aria-hidden="true"></i>
            <span class="trust-text">{item}</span>
          </li>
        {/each}
      </ul>
    </div>

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
        <img
          src="/assets/kentucky-map.webp"
          alt="Kentucky state silhouette map highlighting bettaHVAC service area"
          class="map-img"
          width="600"
          height="400"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div class="map-caption">
        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
        <span>Proudly serving Central Kentucky</span>
      </div>
    </div>
  </div>
</section>

<style>
  .about-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .section-title {
    margin-bottom: 1rem;
    font-size: 2.8rem;
    text-align: left;
  }

  .about-desc {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  .trust-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .trust-item {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .trust-icon {
    color: var(--color-primary);
    font-size: 1rem;
    margin-top: 0.15rem;
    line-height: 1.4;
  }

  .trust-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.4;
  }

  .map-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .map-tilt {
    perspective: 900px;
    touch-action: pan-y;
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

  @media (max-width: 900px) {
    .about-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .trust-item {
      align-items: flex-start;
      text-align: left;
    }

    .section-title {
      text-align: left;
    }

    .about-desc {
      text-align: left;
    }

    .trust-list {
      max-width: 34rem;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
