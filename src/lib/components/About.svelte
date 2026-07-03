<script>
  let imgFailed = $state(false);

  const trustItems = [
    { icon: "fa-shield-halved", text: "Licensed & Insured Professionals" },
    { icon: "fa-clock", text: "24/7 Emergency Service" },
    { icon: "fa-check-circle", text: "100% Satisfaction Guarantee" }
  ];
</script>

<section id="about" class="section">
  <div class="container about-wrapper">
    <div class="about-col">
      <h2 class="section-title">About bettaHVAC</h2>
      <div class="divider" role="presentation"></div>
      <p class="about-desc">
        With years of experience, bettaHVAC provides top-tier heating, ventilation, and air conditioning services in Lexington, KY. We are dedicated to delivering reliable, efficient, and cost-effective comfort solutions for homes and businesses.
      </p>
    </div>

    <div class="trust-col">
      <ul class="trust-list" aria-label="Why choose bettaHVAC">
        {#each trustItems as item}
          <li class="trust-item">
            <div class="trust-icon" aria-hidden="true">
              <i class="fa-solid {item.icon}"></i>
            </div>
            <span class="trust-text">{item.text}</span>
          </li>
        {/each}
      </ul>
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
    margin-bottom: 0;
    line-height: 1.7;
  }

  .trust-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    align-items: center;
    gap: 1.25rem;
  }

  .trust-icon {
    width: 56px;
    height: 56px;
    min-width: 56px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-light)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(15, 59, 140, 0.25);
    color: white;
    font-size: 1.25rem;
  }

  .trust-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    .about-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .trust-col {
      align-items: center;
    }

    .trust-list {
      align-items: center;
    }

    .trust-item {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }

    .section-title {
      text-align: center;
    }

    .divider {
      margin-left: auto;
      margin-right: auto;
    }

    .about-desc {
      text-align: center;
    }
  }
</style>