<script>
  import { onMount } from "svelte";

  const rawPhone = "(555) 123-4567";
  const rawEmail = "fake@bettahvac.com";

  let phoneStr = "";
  let emailStr = "";

  let honeypot = "";

  onMount(() => {
    const reverseString = (str) => str.split("").reverse().join("");
    phoneStr = reverseString(rawPhone.split("").reverse().join(""));
    emailStr = reverseString(rawEmail.split("").reverse().join(""));
  });

  const handleContactSubmit = () => {
    if (honeypot !== "") {
      console.warn("Bot detected by honeypot in contact form.");
      return;
    }
    alert("Message Sent!");
  };
</script>

<section id="contact" class="section section-alt">
  <div class="container contact-wrapper">
    <div class="contact-col glass-panel">
      <h3 class="contact-title">Contact Us Now</h3>
      <p class="contact-subtitle">Get your free quote today.</p>

      <div class="info-group">
        <div class="info-item">
          <strong>Phone:</strong>
          {#if phoneStr}
            <a href="tel:{phoneStr}">{phoneStr}</a>
          {:else}
            <span>Loading...</span>
          {/if}
        </div>
        <div class="info-item">
          <strong>Email:</strong>
          {#if emailStr}
            <a href="mailto:{emailStr}">{emailStr}</a>
          {:else}
            <span>Loading...</span>
          {/if}
        </div>
      </div>

      <form class="contact-form" on:submit|preventDefault={handleContactSubmit}>
        <div class="oh-no-bots" aria-hidden="true">
          <label for="address-field">Leave this empty</label>
          <input
            id="address-field"
            type="text"
            bind:value={honeypot}
            autocomplete="off"
            tabindex="-1"
          />
        </div>

        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="How can we help?" rows="4" required></textarea>
        <button type="submit" class="btn btn-secondary w-full"
          >Send Message</button
        >
      </form>
    </div>

    <div class="map-col">
      <div class="map-frame">
        <iframe
          title="BettaHVAC Location - Lexington, Kentucky"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201065.87441399814!2d-84.62198949999999!3d38.0464066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884244ef9aaaaaab%3A0x813583e76c11fba4!2sLexington%2C%20KY!5e0!3m2!1sen!2sus!4v1700000000000"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="map-caption">
        <i class="fa-solid fa-location-dot"></i>
        <span>Serving Lexington, KY & surrounding areas</span>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-col {
    padding: 3rem;
    box-shadow: var(--shadow-lg);
    border-top: 5px solid var(--color-primary);
  }

  .contact-title {
    font-size: 2rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  .contact-subtitle {
    color: var(--color-text-light);
    margin-bottom: 2rem;
  }

  .info-group {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .info-item {
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
  }

  .info-item strong {
    color: var(--color-primary);
    display: inline-block;
    width: 80px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(15, 59, 140, 0.1);
  }

  .oh-no-bots {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    z-index: -1;
  }

  .w-full {
    width: 100%;
  }

  .map-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .map-frame {
    width: 100%;
    height: 450px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-premium);
    border: 3px solid var(--color-accent);
  }

  .map-frame iframe {
    display: block;
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

  @media (max-width: 900px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .map-frame {
      height: 300px;
    }
  }
</style>
