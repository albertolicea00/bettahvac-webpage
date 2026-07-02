<script>
  let imgFailed = false;
</script>

<section id="about" class="section">
  <div class="container about-wrapper">
    <div class="about-col">
      <h2 class="section-title">About bettaHVAC</h2>
      <div class="divider"></div>
      <p class="about-desc">
        With years of experience, bettaHVAC provides top-tier heating, ventilation, and air conditioning services. We are dedicated to delivering reliable, efficient, and cost-effective comfort solutions.
      </p>

      <ul class="features">
        <li>
          <span class="check">✓</span> Licensed & Insured Professionals
        </li>
        <li>
          <span class="check">✓</span> 24/7 Emergency Service
        </li>
        <li>
          <span class="check">✓</span> 100% Satisfaction Guarantee
        </li>
      </ul>
    </div>

    <div class="about-image-col">
      <div class="image-frame" class:placeholder-active={imgFailed}>
        {#if !imgFailed}
          <img
            src="/assets/img/owner.jpg"
            alt="BettaHVAC Owner"
            class="owner-photo"
            on:error={() => (imgFailed = true)}
          />
        {/if}
        <div class="image-placeholder">
          <i class="fa-solid fa-user-tie"></i>
          <span>Our Team</span>
        </div>
      </div>
      <div class="image-caption">
        <span class="caption-name">BettaHVAC</span>
        <span class="caption-role">Proudly serving Lexington, KY</span>
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
  }

  .divider {
    width: 60px;
    height: 4px;
    background: var(--color-accent);
    margin-bottom: 2rem;
    border-radius: 2px;
  }

  .about-desc {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 2rem;
    line-height: 1.7;
  }

  .features {
    list-style: none;
    padding: 0;
  }

  .features li {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text);
    font-weight: 500;
  }

  .check {
    color: var(--color-secondary);
    font-weight: bold;
    font-size: 1.2rem;
  }

  .about-image-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .image-frame {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 4 / 5;
    border-radius: var(--radius-lg);
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-premium);
    border: 3px solid var(--color-accent);
  }

  .owner-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-placeholder {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-light)
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
  }

  .image-frame:not(.placeholder-active) .image-placeholder {
    display: none;
  }

  .image-placeholder i {
    font-size: 4rem;
    opacity: 0.7;
  }

  .image-placeholder span {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1px;
    opacity: 0.8;
  }

  .image-caption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .caption-name {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .caption-role {
    font-size: 0.9rem;
    color: var(--color-text-light);
  }

  @media (max-width: 900px) {
    .about-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .about-image-col {
      order: -1;
    }

    .image-frame {
      max-width: 300px;
    }
  }
</style>
