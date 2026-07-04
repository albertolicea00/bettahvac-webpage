<script>
  import { reveal } from "../actions/reveal.js";
  import {
    getEmail,
    getEmailHref,
    getPhoneDisplay,
    getPhoneHref,
  } from "../contact.js";

  const phone = getPhoneDisplay();
  const email = getEmail();

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Services", href: "#services" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ];
</script>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand Column -->
      <div class="footer-brand" use:reveal>
        <div class="brand-logo">
          <span class="brand-white">betta</span><span class="brand-accent">HVAC</span>
        </div>
        <p class="brand-tagline">
          Professional Heating & Cooling Services in Lexington, KY and surrounding areas.
        </p>
        <div class="contact-info">
          <a href={getPhoneHref()} class="contact-item">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            {phone}
          </a>
          <a href={getEmailHref()} class="contact-item">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            {email}
          </a>
        </div>
      </div>

      <!-- Quick Links Column -->
      <div class="footer-col" use:reveal={{ delay: 120 }}>
        <h3 class="col-title">Quick Links</h3>
        <nav aria-label="Footer navigation">
          <ul class="footer-links">
            {#each navLinks as link (link.href)}
              <li>
                <a href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>

      <!-- Social Column -->
      <div class="footer-col" use:reveal={{ delay: 240 }}>
        <h3 class="col-title">Follow Us</h3>
        <div class="social-links">
          <a href="https://facebook.com/bettahvac" target="_blank" rel="noopener noreferrer" class="social-btn facebook" aria-label="Follow bettaHVAC on Facebook">
            <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
            <span>Facebook</span>
          </a>
          <a href="https://instagram.com/bettahvac" target="_blank" rel="noopener noreferrer" class="social-btn instagram" aria-label="Follow bettaHVAC on Instagram">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
            <span>Instagram</span>
          </a>
          <a href="https://g.page/bettahvac" target="_blank" rel="noopener noreferrer" class="social-btn google" aria-label="Find bettaHVAC on Google Business">
            <i class="fa-brands fa-google" aria-hidden="true"></i>
            <span>Google Business</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    position: relative;
    /* Hero background image */
    background: var(--hero-bg) center/cover no-repeat;
    padding: 5rem 0 0;
  }

  /* Dark overlay like the hero */
  .site-footer::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--hero-overlay);
    backdrop-filter: blur(6px) grayscale(15%);
    -webkit-backdrop-filter: blur(6px) grayscale(15%);
    pointer-events: none;
    z-index: 0;
  }

  /* Make children sit above the overlay */
  .site-footer > .container {
    position: relative;
    z-index: 1;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Brand Column */
  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .brand-logo {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -1px;
    text-transform: lowercase;
    line-height: 1;
  }

  .brand-white {
    color: white;
  }

  .brand-accent {
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .brand-tagline {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    max-width: 280px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .contact-item:hover {
    color: white;
  }

  .contact-item i {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    width: 16px;
    text-align: center;
  }

  /* Columns */
  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .col-title {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    display: inline-block;
    align-self: flex-start;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .footer-links li a {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s ease;
    display: inline-block;
  }

  .footer-links li a:hover {
    color: white;
    transform: translateX(4px);
  }

  /* Social Buttons */
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .social-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.25s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.85);
  }

  .social-btn i {
    font-size: 1rem;
    width: 18px;
    text-align: center;
  }

  .social-btn.facebook:hover {
    background: #1877f2;
    color: white;
    border-color: #1877f2;
    transform: translateX(4px);
  }

  .social-btn.google:hover {
    background: #4285f4;
    color: white;
    border-color: #4285f4;
    transform: translateX(4px);
  }

  .social-btn.instagram:hover {
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
    color: white;
    border-color: transparent;
    transform: translateX(4px);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }

    .footer-brand {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 600px) {
    .site-footer {
      padding: 3rem 0 0;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-brand {
      grid-column: auto;
      align-items: center;
      text-align: center;
    }

    .brand-tagline {
      max-width: 100%;
    }

    .contact-info {
      align-items: center;
    }

    .footer-col {
      align-items: center;
      text-align: center;
    }

    .col-title {
      align-self: center;
    }

    .footer-links li a:hover {
      transform: none;
    }

    .social-links {
      width: 100%;
    }

    .social-btn {
      justify-content: center;
    }

    .social-btn:hover {
      transform: none;
    }
  }
</style>
