<script>
  import { onMount } from "svelte";

  export let visible = true;

  const socials = [
    { platform: "facebook", url: "https://facebook.com/bettahvac", icon: "fa-brands fa-facebook-f", label: "Follow bettaHVAC on Facebook" },
    { platform: "instagram", url: "https://instagram.com/bettahvac", icon: "fa-brands fa-instagram", label: "Follow bettaHVAC on Instagram" }
  ];
</script>

{#if visible}
<div class="fixed-socials" aria-label="Social media links">
  {#each socials as sm}
    <a
      href={sm.url}
      target="_blank"
      rel="noopener noreferrer"
      class="social-side-btn {sm.platform}"
      aria-label={sm.label}
    >
      <i class={sm.icon} aria-hidden="true"></i>
    </a>
  {/each}
</div>
{/if}

<style>
  .fixed-socials {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    z-index: 5000;
    gap: 0;
  }

  .social-side-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    /* Glass styling */
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.55), rgba(30, 41, 59, 0.55));
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    color: rgba(255, 255, 255, 0.85);
    font-size: 1.2rem;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-right: none;
    border-radius: 8px 0 0 8px;
  }

  .social-side-btn:first-child {
    border-radius: 8px 0 0 0;
  }

  .social-side-btn:last-child {
    border-radius: 0 0 0 8px;
  }

  .social-side-btn:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  .social-side-btn.facebook:hover {
    background: #1877f2;
    color: white;
    width: 60px;
    border-color: #1877f2;
  }

  .social-side-btn.instagram:hover {
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
    color: white;
    width: 60px;
  }
</style>
