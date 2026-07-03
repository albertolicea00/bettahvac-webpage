<script>
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

<section id="contact" class="section section-alt">
  <div class="container contact-wrapper">
    <div class="map-col">
      <img src="/assets/kentucky-map.png" alt="Kentucky state silhouette map showing bettaHVAC service area" class="map-img" width="600" height="400" loading="lazy" />
      <div class="map-caption">
        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
        <span>Proudly serving Central Kentucky</span>
      </div>
    </div>

    <div class="info-col">
      <h2 class="contact-title">Areas We Serve</h2>

      <ul class="cities" aria-label="Cities we serve">
        {#each cities as city}
          <li>
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
            {city}, KY
          </li>
        {/each}
      </ul>
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

  .map-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-premium);
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
</style>