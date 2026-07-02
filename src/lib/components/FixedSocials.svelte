<script>
  const socials = [
    { platform: "facebook", url: "https://facebook.com/bettahvac", icon: "fa-brands fa-facebook-f" },
    { platform: "instagram", url: "https://instagram.com/bettahvac", icon: "fa-brands fa-instagram" }
  ];

  $: fixedSocials = socials.filter(
    (sm) =>
      sm.platform.toLowerCase() === "facebook" ||
      sm.platform.toLowerCase() === "instagram",
  );
</script>

<div class="fixed-socials">
  {#each fixedSocials as sm}
    <a
      href={sm.url}
      target="_blank"
      rel="noopener noreferrer"
      class="social-side-btn {sm.platform}"
    >
      <i class={sm.icon}></i>
    </a>
  {/each}
</div>

<style>
  .fixed-socials {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    z-index: 5000;
  }

  .social-side-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 1.5rem;
    box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid var(--color-glass-border);
    border-right: none;
  }

  .social-side-btn.facebook:hover {
    background: #1877f2;
    color: white;
    width: 65px;
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
    width: 65px;
  }
</style>
