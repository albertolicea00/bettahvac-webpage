<script>
  import { onMount } from "svelte";

  const contactEmail = "fake@bettahvac.com";

  let show = false;

  onMount(() => {
    const timer = setTimeout(() => {
      show = true;
    }, 3000);

    return () => clearTimeout(timer);
  });

  const closePopup = () => {
    show = false;
  };

  const claimOffer = () => {
    const subject = encodeURIComponent(`Claiming Special Popup Offer`);
    const body = encodeURIComponent(
      `Hello BettaHVAC,\n\nI would like to claim the special offer from the popup (Free inspection / 30% OFF 3rd job).\n\nPlease let me know how to proceed.\n\nThank you.`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    closePopup();
  };
</script>

{#if show}
  <div class="popup-overlay" on:click={closePopup}>
    <div class="popup-box glass-panel" on:click|stopPropagation>
      <button class="close-btn" on:click={closePopup}>&times;</button>

      <div class="popup-content">
        <div class="popup-icon">
          <i class="fa-solid fa-gift pulse-icon"></i>
        </div>
        <h2 class="popup-title text-gradient">Special Offers!</h2>

        <button class="btn btn-secondary w-full claim-btn" on:click={claimOffer}
          >Claim Now</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  .popup-box {
    position: relative;
    max-width: 90%;
    width: 450px;
    padding: 2.5rem 2rem;
    text-align: center;
    border-top: 5px solid var(--color-secondary);
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: var(--color-text-light);
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: var(--color-secondary);
  }

  .popup-icon {
    font-size: 3rem;
    color: var(--color-secondary);
    margin-bottom: 1rem;
  }

  .pulse-icon {
    animation: simplePulse 2s infinite;
  }

  .popup-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .w-full {
    width: 100%;
  }

  .claim-btn {
    font-size: 1.2rem;
    animation: pulseGlow 2s infinite;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popIn {
    0% {
      transform: scale(0.8) translateY(20px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  @keyframes simplePulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
  }
</style>
