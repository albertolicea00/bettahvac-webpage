<script>
  import { onMount } from "svelte";
  import { reveal } from "../actions/reveal.js";

  const MAX_TILT = 10;

  let tiltX = $state(0);
  let tiltY = $state(0);
  let tilting = $state(false);

  const trustItems = [
    "Licensed & Insured Professionals",
    "24/7 Emergency Service",
    "100% Satisfaction Guarantee"
  ];

  let aboutColElement;
  let typedItems = $state(trustItems.map(() => ""));
  let visibleLines = $state(0);
  let activeLine = $state(-1);
  let typingStarted = false;
  let stopTyping = () => {};

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

  function startTypingSequence() {
    const timers = [];

    const schedule = (callback, delay) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const typeLine = (index) => {
      if (index >= trustItems.length) {
        activeLine = -1;
        return;
      }

      visibleLines = Math.max(visibleLines, index + 1);
      activeLine = index;

      const fullText = trustItems[index];
      let charIndex = 0;

      const typeNextChar = () => {
        charIndex += 1;
        typedItems[index] = fullText.slice(0, charIndex);

        if (charIndex < fullText.length) {
          const nextDelay = charIndex < 8 ? 28 : 18;
          schedule(typeNextChar, nextDelay);
        } else {
          activeLine = index + 1;

          if (index < trustItems.length - 1) {
            schedule(() => typeLine(index + 1), 180);
          }
        }
      };

      schedule(typeNextChar, 80);
    };

    schedule(() => typeLine(0), 120);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }

  onMount(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      typedItems = [...trustItems];
      visibleLines = trustItems.length;
      activeLine = -1;
      return;
    }

    if (!aboutColElement) {
      typingStarted = true;
      stopTyping = startTypingSequence();
      return () => stopTyping();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typingStarted) {
          typingStarted = true;
          stopTyping = startTypingSequence();
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(aboutColElement);

    return () => {
      observer.disconnect();
      stopTyping();
    };
  });
</script>

<section id="about" class="section">
  <div class="container about-wrapper">
    <div
      class="about-col"
      bind:this={aboutColElement}
      use:reveal={{ from: "left" }}
    >
      <h2 class="section-title">About <span class="brand-light">betta</span>HVAC</h2>
      <p class="about-desc">
        With years of experience, bettaHVAC provides top-tier heating, ventilation, and air conditioning services in Lexington, KY. We are dedicated to delivering reliable, efficient, and cost-effective comfort solutions for homes and businesses.
      </p>

      <ul class="trust-list" aria-label="Why choose bettaHVAC">
        {#each trustItems as item, index}
          {#if visibleLines > index}
            <li class="trust-item">
              <i class="fa-solid fa-check trust-icon" aria-hidden="true"></i>
              <span class="trust-text">
                {typedItems[index]}
                {#if activeLine === index && typedItems[index].length < item.length}
                  <span class="typing-caret" aria-hidden="true">|</span>
                {/if}
              </span>
            </li>
          {/if}
        {/each}
      </ul>
    </div>

    <div class="map-col" use:reveal={{ from: "right", delay: 150 }}>
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
    justify-items: center;
  }

  .about-col {
    width: 100%;
    max-width: 34rem;
    text-align: left;
  }

  .section-title {
    margin-bottom: 1rem;
    font-size: 2.8rem;
    text-align: left;
  }

  .brand-light {
    color: white;
  }

  .about-desc {
    font-size: 1.1rem;
    color: var(--color-text);
    margin: 0 0 1.5rem;
    line-height: 1.7;
    max-width: 34rem;
  }

  .trust-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    justify-content: flex-start;
    width: 100%;
  }

  .trust-icon {
    color: var(--color-primary);
    font-size: 1rem;
    line-height: 1.4;
    flex-shrink: 0;
  }

  .trust-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.4;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    min-height: 1.4em;
    text-align: left;
  }

  .typing-caret {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 700;
    animation: caretBlink 0.9s steps(2, start) infinite;
  }

  .map-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
    max-width: 40rem;
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

  @keyframes caretBlink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .typing-caret {
      animation: none;
      opacity: 0;
    }
  }

  @media (max-width: 900px) {
    .about-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .section-title {
      text-align: center;
    }

    .about-desc {
      text-align: center;
    }

    .about-col {
      text-align: center;
    }

    .trust-list {
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 34rem;
    }

    .trust-item {
      justify-content: center;
    }
  }
</style>
