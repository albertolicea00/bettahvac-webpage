<script>
  import { onMount } from "svelte";

  let theme = $state("hot");

  onMount(() => {
    const savedTheme = localStorage.getItem("hvac-theme");
    theme = savedTheme ?? "hot";
    document.documentElement.setAttribute("data-theme", theme);
  });

  const toggleTheme = () => {
    theme = theme === "hot" ? "cool" : "hot";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hvac-theme", theme);
  };
</script>

<div class="theme-toggle-container">
  <button
    class="theme-toggle-btn {theme}"
    onclick={toggleTheme}
    aria-label={theme === "hot" ? "Switch to cool mode" : "Switch to hot mode"}
    aria-pressed={theme === "cool"}
  >
    {#if theme === "hot"}
      <i class="fa-solid fa-fire text-hot animate-pulse" aria-hidden="true"></i>
      <span class="mode-text">Hot</span>
    {:else}
      <i class="fa-solid fa-snowflake text-cool animate-float-slow" aria-hidden="true"></i>
      <span class="mode-text">Cool</span>
    {/if}
  </button>
</div>

<style>
  .theme-toggle-container {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 9999;
  }

  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.6));
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    transition: all 0.3s ease;
    white-space: nowrap;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    min-height: 44px;
    min-width: 44px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .theme-toggle-btn:hover {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85));
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  .theme-toggle-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 3px;
  }

  .mode-text {
    color: white;
  }

  .text-hot {
    color: #ff6b35;
  }

  .text-cool {
    color: #7dd3fc;
  }

  .animate-pulse {
    animation: pulse 1.5s infinite;
  }

  .animate-float-slow {
    animation: float 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  @media (max-width: 768px) {
    .theme-toggle-btn .mode-text {
      display: none;
    }
    .theme-toggle-btn {
      padding: 0.5rem 0.75rem;
    }
  }
</style>
