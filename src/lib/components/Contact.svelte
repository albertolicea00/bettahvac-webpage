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
    <div class="map-col">
      <img src="/assets/kentucky-map.png" alt="Kentucky state silhouette map showing bettaHVAC service area" class="map-img" width="600" height="400" loading="lazy" />
      <div class="map-caption">
        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
        <span>Serving Lexington, KY &amp; surrounding areas</span>
      </div>
    </div>
    <div class="contact-col glass-panel">
      <h2 class="contact-title">Contact Us Now</h2>
      <p class="contact-phone">
        <a href="tel:{phoneStr}" aria-label="Call bettaHVAC at {phoneStr}">{phoneStr}</a>
      </p>
      <p class="contact-subtitle">Get your free quote today. <a href="mailto:{emailStr}" class="email-inline">{emailStr}</a></p>
      <p class="contact-questions">Still have questions? Our technicians are ready to provide technical support and personalized advice for your home or business.</p>
      <form class="contact-form" onsubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
        <div class="oh-no-bots" aria-hidden="true">
          <label for="address-field">Leave this empty</label>
          <input id="address-field" type="text" bind:value={honeypot} autocomplete="off" tabindex="-1" />
        </div>
        <div class="field-group">
          <label for="contact-name">Your Name</label>
          <input id="contact-name" type="text" placeholder="John Doe" required />
        </div>
        <div class="field-group">
          <label for="contact-message">How can we help?</label>
          <textarea id="contact-message" placeholder="Describe your issue or request..." rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-secondary w-full">Send Message</button>
      </form>
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

  .contact-phone {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--color-primary);
    margin-bottom: 0.25rem;
  }

  .contact-phone a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .contact-phone a:hover {
    color: var(--color-secondary);
  }

  .contact-questions {
    font-size: 0.95rem;
    color: var(--color-text-light);
    line-height: 1.6;
    margin-bottom: 2rem;
    border-left: 3px solid var(--color-accent);
    padding-left: 1rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .field-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
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
    height: 100%;
  }

  .map-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-lg);
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
  }
</style>
