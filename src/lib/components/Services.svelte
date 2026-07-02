<script>
  const services = [
    {
      id: "ac-repair",
      title: "A/C Repair",
      description: "Fast and reliable air conditioning repair services to keep you cool all summer long.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 9h10M9 12h6"/></svg>`
    },
    {
      id: "heating-installation",
      title: "Heating Installation",
      description: "Expert installation of energy-efficient heating systems for lasting comfort during winter.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-4-4-8-4-8z"/><path d="M8.5 14.5C7 16 7 18 8.5 19.5"/><path d="M15.5 14.5C17 16 17 18 15.5 19.5"/><line x1="12" y1="22" x2="12" y2="19"/></svg>`
    },
    {
      id: "maintenance",
      title: "Preventative Maintenance",
      description: "Regular tune-ups to extend equipment life, improve efficiency, and prevent costly breakdowns.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`
    }
  ];
</script>

<section id="services" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Services</h2>
      <p class="section-lead">
        Professional and reliable HVAC solutions tailored to your home and business needs.
      </p>
    </div>

    <div class="services-grid">
      {#each services as service, i}
        <article class="service-card" style="animation-delay: {i * 0.15}s" aria-labelledby="service-{service.id}">
          <div class="card-icon" aria-hidden="true">
            {@html service.icon}
          </div>
          <h3 class="card-title" id="service-{service.id}">{service.title}</h3>
          <p class="card-desc">{service.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-header {
    margin-bottom: 3rem;
  }

  .section-lead {
    font-size: 1.1rem;
    color: var(--color-text-light);
    max-width: 560px;
    line-height: 1.7;
    margin: 0;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .service-card {
    background: var(--color-bg);
    padding: 2.5rem 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
    border-bottom: 4px solid transparent;
  }

  .service-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-accent),
      var(--color-secondary)
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }

  .service-card:hover::after {
    transform: scaleX(1);
  }

  .card-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(15, 59, 140, 0.3);
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    color: var(--color-primary);
  }

  .card-desc {
    color: var(--color-text-light);
    line-height: 1.7;
    margin: 0;
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
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
