<script>
  const services = [
    {
      id: "ac-repair",
      title: "A/C Repair",
      description: "Fast and reliable air conditioning repair services to keep you cool."
    },
    {
      id: "heating-installation",
      title: "Heating Installation",
      description: "Expert installation of energy-efficient heating systems."
    },
    {
      id: "maintenance",
      title: "Preventative Maintenance",
      description: "Regular maintenance to extend the life of your equipment and save on energy costs."
    }
  ];
</script>

<section id="services" class="section section-alt">
  <div class="container">
    <h2 class="section-title text-center">Our Services</h2>
    <p class="section-subtitle text-center">
      Professional and reliable HVAC solutions tailored to your needs.
    </p>

    <div class="services-grid">
      {#each services as service, i}
        <div class="service-card" style="animation-delay: {i * 0.15}s">
          <div class="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </div>
          <h3 class="card-title">{service.title}</h3>
          <p class="card-desc">{service.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .service-card {
    background: var(--color-bg);
    padding: 2.5rem 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-bottom: 4px solid transparent;
    border-image: linear-gradient(
        to right,
        var(--color-primary),
        var(--color-secondary)
      )
      1;
    border-bottom: 0;
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
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
    background: var(--color-primary-light);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(29, 78, 216, 0.3);
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-primary);
  }

  .card-desc {
    color: var(--color-text-light);
    line-height: 1.6;
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
</style>
