<script>
  import { onMount } from "svelte";

  const brand = "betta";
  const brandHighlight = "HVAC";

  // Static prefix that anchors the typing line.
  const staticPrefix = "Professional Services in ";

  // Words that rotate via the typing effect.
  const typingWords = ["Heating", "Ventilation", "Air Conditioning"];

  let typedText = $state(staticPrefix);
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pausedAtEnd = false;

  onMount(() => {
    // Respect reduced-motion preference — show the first word statically
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      typedText = staticPrefix + typingWords[0];
      return;
    }

    const tick = () => {
      const currentWord = typingWords[wordIndex];

      if (pausedAtEnd) {
        isDeleting = true;
        pausedAtEnd = false;
        // Schedule the next tick so the loop keeps going
        setTimeout(tick, 30);
        return;
      }

      if (!isDeleting) {
        charIndex++;
        typedText = staticPrefix + currentWord.slice(0, charIndex);
        if (charIndex === currentWord.length) {
          pausedAtEnd = true;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        charIndex--;
        typedText = staticPrefix + currentWord.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % typingWords.length;
        }
      }

      setTimeout(tick, isDeleting ? 30 : 60);
    };

    setTimeout(tick, 60);
  });
</script>

<header class="hero-section">
  <div class="background-overlay"></div>

  <div class="hero-container container">
    <!-- Main Content -->
    <div class="hero-main">
      <div class="text-area animate-fade-in-up" style="animation-delay: 0.4s;">
        <h1 class="main-title">
          <span class="brand-white">{brand}</span><span class="brand-accent">{brandHighlight}</span>
        </h1>
        <h2 class="hero-subheadline">
          <span class="sub-line typing-line">
            {typedText}<span class="typing-caret" aria-hidden="true">|</span>
          </span>
          <span class="sub-line">in Lexington, KY and surrounding areas</span>
        </h2>
      </div>

      <div
        class="action-area animate-fade-in-up"
        style="animation-delay: 0.6s;"
      >
        <div class="button-row">
          <a href="#contact" class="btn-premium">
            <span>Contact Us</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Explorer (fixed at bottom) -->
    <a href="#reviews" class="scroll-explorer animate-fade-in" style="animation-delay: 1s;" aria-label="Scroll to explore content below">
      <span class="scroll-label">Scroll to Explore</span>
      <div class="scroll-line"></div>
    </a>
  </div>
</header>

<style>
  .hero-section {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--hero-bg) center/cover no-repeat;
    overflow: hidden;
    color: white;
  }

  .background-overlay {
    position: absolute;
    inset: 0;
    background: var(--hero-overlay);
    backdrop-filter: blur(6px) grayscale(15%);
    z-index: 1;
  }

  .hero-container {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  /* Main Area */
  .hero-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .main-title {
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 0.95;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 1.5rem;
  }

  .brand-white {
    color: white;
  }

  .brand-accent {
    color: var(--color-accent);
    text-shadow: 0 5px 15px rgba(223, 177, 91, 0.2);
  }

  .hero-subheadline {
    font-family: var(--font-heading);
    font-size: clamp(1rem, 2vw, 1.4rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 1.25rem;
    margin-bottom: 0;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
    letter-spacing: 0.5px;
  }

  .sub-line {
    display: block;
  }

  .typing-line {
    min-height: 1.5em;
  }

  .typing-caret {
    display: inline-block;
    margin-left: 2px;
    color: var(--color-accent);
    font-weight: 700;
    animation: caretBlink 0.9s steps(2, start) infinite;
  }

  @keyframes caretBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .typing-caret {
      animation: none;
      opacity: 0;
    }
  }

  /* Actions */
  .button-row {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .btn-premium {
    background: var(--color-accent);
    color: #0f172a;
    padding: 1.25rem 2.5rem;
    border-radius: 8px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    box-shadow: 0 10px 25px rgba(223, 177, 91, 0.3);
  }

  .btn-premium:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(223, 177, 91, 0.4);
    background: #fce7a1;
  }

  /* Scroll explorer — pinned to bottom */
  .scroll-explorer {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 1s;
  }

  .scroll-explorer:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .scroll-line {
    width: 2px;
    height: 60px;
    background: linear-gradient(to bottom, var(--color-accent), transparent);
    position: relative;
    overflow: hidden;
  }

  .scroll-line::after {
    content: "";
    position: absolute;
    top: -60px;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    animation: scroll-line-move 2s infinite;
  }

  @keyframes scroll-line-move {
    0% {
      top: -60px;
    }
    100% {
      top: 60px;
    }
  }

  .scroll-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    opacity: 0.5;
    color: white;
  }

  /* Animations */
  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 1s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .main-title {
      font-size: 3.5rem;
    }
    .hero-subheadline {
      font-size: 1rem;
      padding: 0 1rem;
    }
    .button-row {
      flex-direction: column;
      width: 100%;
    }
    .btn-premium {
      width: 100%;
      justify-content: center;
    }
  }
</style>
