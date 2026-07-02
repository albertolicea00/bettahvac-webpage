<script>
  import { onMount } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  let scrolled = $state(false);
  let mobileOpen = $state(false);

  const navLinks = [
    { label: "Reviews", href: "#reviews" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    const handleKeydown = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        mobileOpen = false;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const closeMobile = () => {
    mobileOpen = false;
  };
</script>

<nav class="navbar" class:scrolled aria-label="Main">
  <div class="nav-inner">
    <!-- Left spacer for symmetry -->
    <div class="nav-spacer"></div>

    <!-- Center: Nav links -->
    <div class="nav-center">
      <ul class="nav-links" role="list">
        {#each navLinks as link}
          <li>
            <a href={link.href}>{link.label}</a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Right: Theme toggle + Mobile hamburger -->
    <div class="nav-right">
      <ThemeToggle />

      <div class="nav-mobile">
        <button
          class="hamburger"
          class:open={mobileOpen}
          onclick={() => (mobileOpen = !mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span class="bar" aria-hidden="true"></span>
          <span class="bar" aria-hidden="true"></span>
          <span class="bar" aria-hidden="true"></span>
        </button>

        {#if mobileOpen}
          <button type="button" class="mobile-overlay" onclick={closeMobile} aria-label="Close menu"></button>
          <div class="mobile-dropdown" id="mobile-menu" role="dialog" aria-label="Navigation menu">
            <ul class="dropdown-links" role="list">
              {#each navLinks as link}
                <li>
                  <a href={link.href} onclick={closeMobile}>
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    padding: 1rem 1.5rem;
    transition: padding 0.4s ease;
  }

  .navbar.scrolled {
    padding: 0.5rem 1.5rem;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1200px;
  }

  .nav-spacer {
    flex: 1;
  }

  .nav-center {
    display: flex;
    justify-content: center;
  }

  .nav-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 0.25rem;
    margin: 0;
    padding: 0.5rem 0.75rem;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.55), rgba(30, 41, 59, 0.55));
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: all 0.4s ease;
  }

  .navbar.scrolled .nav-links {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .nav-links li a {
    display: block;
    padding: 0.6rem 1.25rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    border-radius: 50px;
    transition: all 0.3s ease;
    white-space: nowrap;
    font-family: var(--font-body);
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  .nav-links li a:hover {
    background: rgba(255, 255, 255, 0.12);
    color: white;
  }

  .nav-links li a:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  .nav-mobile {
    display: none;
    position: relative;
  }

  .hamburger {
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.6));
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .hamburger:hover {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
    border-color: rgba(255, 255, 255, 0.2);
  }

  .hamburger:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 3px;
  }

  .bar {
    display: block;
    width: 20px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open .bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open .bar:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: fadeIn 0.2s ease;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .mobile-overlay:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: -4px;
  }

  .mobile-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 220px;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.92));
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    z-index: 10002;
    padding: 0.5rem;
    animation: dropIn 0.2s ease;
  }

  .dropdown-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown-links li a {
    display: flex;
    align-items: center;
    padding: 0.85rem 1.25rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 10px;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
    min-height: 44px;
  }

  .dropdown-links li a:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .dropdown-links li a:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    .navbar {
      justify-content: flex-start;
      padding: 0.75rem 1rem;
    }

    .nav-inner {
      justify-content: flex-start;
    }

    .nav-center {
      display: none;
    }

    .nav-right {
      flex: 1;
      justify-content: flex-end;
    }

    .nav-mobile {
      display: block;
    }

    .mobile-dropdown {
      right: 0;
    }
  }
</style>
