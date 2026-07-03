<script>
  import { onMount } from "svelte";
  import { reveal } from "../actions/reveal.js";

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
      title: "Prev Maintenance",
      description: "Regular tune-ups to extend equipment life, improve efficiency, and prevent costly breakdowns.",
      sprite: "car"
    }
  ];

  // Theme is set on <html data-theme="hot|cold"> by ThemeToggle.
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

  const spriteSrc = $derived(
    (/** @type {string} */ name) =>
      `/assets/generated/sprite-${name}-${theme}.webp`
  );

  // Per-sprite 3D tilt — same effect as the Kentucky map:
  // the cursor position drives rotateX/rotateY on the sprite only,
  // and the drop-shadow grows while tilting.
  const MAX_TILT = 10; // degrees
  let tilts = $state(services.map(() => ({ x: 0, y: 0, active: false })));

  /**
   * @param {number} i
   * @param {PointerEvent & { currentTarget: HTMLElement }} event
   */
  function handleMove(i, event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tilts[i].x = -y * MAX_TILT * 2;
    tilts[i].y = x * MAX_TILT * 2;
    tilts[i].active = true;
  }

  /** @param {number} i */
  function resetTilt(i) {
    tilts[i].x = 0;
    tilts[i].y = 0;
    tilts[i].active = false;
  }
</script>

<section id="services" class="section section-alt">
  <div class="container">
    <div class="section-header" use:reveal>
      <h2 class="section-title">Services</h2>
      <p class="section-subtitle">
        Heating, cooling, and maintenance solutions tailored to your home or
        business... done right the first time.
      </p>
    </div>

    <div class="services-grid">
      {#each services as service, i}
        <article
          class="service-card"
          class:tilting={tilts[i].active}
          aria-labelledby="service-{service.id}"
          use:reveal={{ from: "scale", delay: i * 130 }}
          style="--tilt-x: {tilts[i].x}deg; --tilt-y: {tilts[i].y}deg"
          onpointermove={(e) => handleMove(i, e)}
          onpointerleave={() => resetTilt(i)}
          onpointercancel={() => resetTilt(i)}
        >
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

  .section-title {
    margin-buttom: 1rem;
  }
  .section-subtitle {
    margin: 0.75rem auto 0;
    max-width: 540px;
    color: var(--color-text-light);
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  /* Liquid glass base card — the tilt only affects the sprite, not the card */
  .service-card {
    background: var(--color-bg);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: var(--radius-lg);
    padding: 2.5rem 2rem;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                box-shadow 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .service-card:hover {
    transform: translateY(-8px);
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .card-icon {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    perspective: 900px;
    position: relative;
    z-index: 1;
  }

  .card-sprite {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
    transform-style: preserve-3d;
    transition: transform 0.5s ease, filter 0.5s ease;
    filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.28));
    will-change: transform;
    user-select: none;
    transform: scale(2.8);
    -webkit-user-drag: none;
  }

  .service-card.tilting .card-sprite {
    transition: transform 0.08s linear, filter 0.3s ease;
    filter: drop-shadow(0 28px 45px rgba(0, 0, 0, 0.35));
  }

  @media (prefers-reduced-motion: reduce) {
    .service-card,
    .card-sprite {
      transform: none;
      transition: none;
    }
  }

  .card-title {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    color: var(--color-primary);
    position: relative;
    z-index: 1;
  }

  .card-desc {
    color: var(--color-text-light);
    line-height: 1.7;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
