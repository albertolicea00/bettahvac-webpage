<script>
  import { onMount } from "svelte";

  const services = [
    {
      id: "ac-repair",
      title: "A/C Repair",
      description: "Fast and reliable air conditioning repair services to keep you cool all summer long.",
      sprite: "ac"
    },
    {
      id: "heating-installation",
      title: "Heating Installation",
      description: "Expert installation of energy-efficient heating systems for lasting comfort during winter.",
      sprite: "panel"
    },
    {
      id: "maintenance",
      title: "Preventative Maintenance",
      description: "Regular tune-ups to extend equipment life, improve efficiency, and prevent costly breakdowns.",
      sprite: "car"
    }
  ];

  // Theme is set on <html data-theme="hot|cold"> by ThemeToggle.
  // We mirror it here so the sprite swaps when the user toggles.
  let theme = $state("hot");

  onMount(() => {
    theme = document.documentElement.getAttribute("data-theme") || "hot";
    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      if (t && t !== theme) theme = t;
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    return () => obs.disconnect();
  });

  const spriteSrc = $derived((name) => `/assets/generated/sprite-${name}-${theme}.webp`);
</script>

<section id="services" class="section section-alt">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Services</h2>
    </div>

    <div class="services-grid">
      {#each services as service, i}
        <article class="service-card" style="animation-delay: {i * 0.15}s" aria-labelledby="service-{service.id}">
          <div class="card-icon" aria-hidden="true">
            <img src={spriteSrc(service.sprite)} alt="" class="card-sprite" />
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
    text-align: center;
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
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    flex-shrink: 0;
  }

  .card-sprite {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transform: scale(3);
  }

  .card-title {
    font-size: 1.4rem;
    margin-top: 2.5rem;
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
