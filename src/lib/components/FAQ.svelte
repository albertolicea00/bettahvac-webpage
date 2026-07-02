<script>
  let visibleCount = $state(0);

  const faqs = [
    {
      question: "How often should I service my HVAC equipment?",
      answer: "We recommend scheduling preventative maintenance at least twice a year: once in the spring for the air conditioning and once in the fall for the heating."
    },
    {
      question: "Do you offer 24/7 emergency service?",
      answer: "Yes, our team is available 24 hours a day, 7 days a week to handle any emergency in Lexington and surrounding areas."
    },
    {
      question: "How long does it take to install a new air conditioning system?",
      answer: "Generally, a standard installation takes one business day (8 to 10 hours). However, the time may vary depending on the complexity of the system and necessary modifications."
    },
    {
      question: "What brands of equipment do you install?",
      answer: "We work with the leading and best brands on the market, guaranteeing quality, energy efficiency, and durability in all our installations."
    }
  ];

  $effect(() => {
    const interval = setInterval(() => {
      if (visibleCount < faqs.length * 2) {
        visibleCount++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  });
</script>

<section id="faq" class="section chat-faq-section">
  <div class="container">
    <div class="chat-header">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>

    <div class="chat-window">
      <div class="chat-messages">
        {#each faqs as faq, i}
          <div
            class="chat-row customer-row {visibleCount > i * 2 ? 'visible' : ''}"
            style="animation-delay: {i * 0.6}s;"
          >
            <div class="avatar customer-avatar">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="bubble-wrap customer-wrap">
              <div class="bubble customer-bubble">
                <p>{faq.question}</p>
              </div>
              <span class="chat-label">Customer</span>
            </div>
          </div>

          <div
            class="chat-row team-row {visibleCount > i * 2 + 1 ? 'visible' : ''}"
            style="animation-delay: {i * 0.6 + 0.3}s;"
          >
            <div class="bubble-wrap team-wrap">
              <span class="team-badge">
                <i class="fa-solid fa-circle-check"></i> BettaHVAC Team
              </span>
              <div class="bubble team-bubble">
                <p>{faq.answer}</p>
              </div>
              <span class="chat-label team-label">BettaHVAC Team</span>
            </div>
            <div class="avatar team-avatar">
              <i class="fa-solid fa-headset"></i>
            </div>
          </div>
        {/each}
      </div>

      <div class="typing-indicator">
        <div class="avatar team-avatar small">
          <i class="fa-solid fa-headset"></i>
        </div>
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </div>

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
    </div>
  </div>
</section>

<style>
  .chat-faq-section {
    padding-bottom: 0;
  }

  .chat-header {
    margin-bottom: 3rem;
  }

  .chat-window {
    max-width: 720px;
    margin: 0 auto 3rem auto;
    padding: 2rem 1rem;
    position: relative;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .chat-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .chat-row.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .customer-row {
    justify-content: flex-start;
    padding-right: 3rem;
  }

  .team-row {
    justify-content: flex-end;
    padding-left: 3rem;
  }

  .avatar {
    width: 42px;
    height: 42px;
    min-width: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .customer-avatar {
    background: var(--color-bg-alt);
    color: var(--color-text-light);
    border: 2px solid #e2e8f0;
  }

  .team-avatar {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-light)
    );
    color: white;
    box-shadow: 0 4px 12px rgba(15, 59, 140, 0.3);
  }

  .team-avatar.small {
    width: 32px;
    height: 32px;
    min-width: 32px;
    font-size: 0.8rem;
  }

  .bubble-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-width: 85%;
  }

  .customer-wrap {
    align-items: flex-start;
  }

  .team-wrap {
    align-items: flex-end;
  }

  .bubble {
    padding: 1rem 1.25rem;
    border-radius: 18px;
    line-height: 1.55;
  }

  .bubble p {
    margin: 0;
    font-size: 1rem;
  }

  .customer-bubble {
    background: var(--color-glass-bg);
    border: 1px solid var(--color-glass-border);
    color: var(--color-text);
    border-radius: 18px 18px 18px 4px;
    box-shadow: var(--shadow-sm);
  }

  .team-bubble {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-light)
    );
    color: white;
    border-radius: 18px 18px 4px 18px;
    box-shadow: 0 4px 15px rgba(15, 59, 140, 0.25);
  }

  .chat-label {
    font-size: 0.72rem;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
    padding: 0 0.25rem;
  }

  .team-label {
    display: none;
  }

  .team-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    padding: 0 0.25rem;
  }

  .team-badge i {
    color: var(--color-primary-light);
    font-size: 0.7rem;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-left: 0;
  }

  .typing-dots {
    display: flex;
    gap: 4px;
    padding: 0.6rem 1rem;
    background: var(--color-glass-bg);
    border: 1px solid var(--color-glass-border);
    border-radius: 18px;
  }

  .typing-dots span {
    width: 8px;
    height: 8px;
    background: var(--color-text-light);
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
    opacity: 0.4;
  }

  .typing-dots span:nth-child(1) {
    animation-delay: 0s;
  }
  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typingBounce {
    0%,
    80%,
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
    40% {
      transform: scale(1.3);
      opacity: 1;
    }
  }

  .cta-banner {
    background: var(--color-bg-alt);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    text-align: center;
    padding: 3.5rem 2rem;
    width: 100%;
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
    box-shadow: 0 4px 15px rgba(15, 59, 140, 0.3);
  }

  .cta-primary:hover {
    background: var(--color-primary-light);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(15, 59, 140, 0.35);
  }

  @media (max-width: 768px) {
    .chat-window {
      padding: 1rem 0;
    }

    .customer-row {
      padding-right: 1rem;
    }

    .team-row {
      padding-left: 1rem;
    }

    .bubble-wrap {
      max-width: 90%;
    }

    .avatar {
      width: 36px;
      height: 36px;
      min-width: 36px;
      font-size: 0.85rem;
    }

    .bubble p {
      font-size: 0.92rem;
    }

    .cta-banner {
      padding: 2.5rem 1.5rem;
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
