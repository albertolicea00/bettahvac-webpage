<section id="contact">
  <div class="cta-banner">
    <h3>Still have questions?</h3>
    <p>
      Our technicians are ready to provide technical support and personalized
      advice for your home or business.
    </p>
    <div class="cta-buttons">
      <a href="tel:1-800-911-HVAC" class="cta-btn cta-primary">
        <i class="fa-solid fa-phone"></i> Call Us Now
      </a>
      <a href="mailto:fake@bettahvac.com" class="cta-btn cta-secondary">
        <i class="fa-solid fa-envelope"></i> Email Us
      </a>
    </div>
  </div>
</section>

<style>
  .cta-banner {
    background-color: var(--color-bg-alt);
    text-align: center;
    padding: 5rem 2rem;
    width: 100%;
    color: var(--color-text);
  }

  .cta-banner h3 {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 0.75rem;
  }

  .cta-banner p {
    color: var(--color-text-light);
    max-width: 480px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-btn {
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
  }

  .cta-primary {
    background: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-md);
  }

  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .cta-secondary {
    background-color: var(--color-bg);
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .cta-secondary:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .cta-banner {
      padding: 3.5rem 1.5rem;
    }

    .cta-banner h3 {
      font-size: 1.6rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .cta-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
</style>
