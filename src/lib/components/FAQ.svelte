<script>
  import { onMount } from "svelte";
  import { reveal } from "../actions/reveal.js";

  const faqs = [
    {
      question: "How often should I service my HVAC equipment?",
      answer: "We recommend scheduling preventative maintenance at least twice a year: once in the spring for the air conditioning and once in the fall for the heating."
    },
    {
      question: "Do you offer 24/7 emergency service?",
      answer: "Yes, our team is available 24 hours a day, 7 days a week to handle any emergency in Luisville and surrounding areas."
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

  /** @type {HTMLElement | undefined} */
  let chatWindowElement;
  let typedQuestions = $state(faqs.map(() => ""));
  let typedAnswers = $state(faqs.map(() => ""));
  let visibleQuestions = $state(faqs.map(() => false));
  let visibleAnswers = $state(faqs.map(() => false));
  let activeLine = $state({ role: "", index: -1 });
  let typingStarted = false;
  let cancelled = false;

  /** @param {number} duration */
  const wait = (duration) =>
    new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });

  /**
   * @param {string[]} target
   * @param {boolean[]} visibility
   * @param {number} index
   * @param {string} text
   * @param {string} role
   * @param {number} speed
   * @param {number} [startDelay]
   */
  async function typeLine(
    target,
    visibility,
    index,
    text,
    role,
    speed,
    startDelay = 0
  ) {
    if (startDelay > 0) {
      await wait(startDelay);
    }

    if (cancelled) {
      return;
    }

    visibility[index] = true;
    activeLine = { role, index };
    target[index] = "";

    for (let charIndex = 0; charIndex < text.length; charIndex += 1) {
      if (cancelled) {
        return;
      }

      target[index] = text.slice(0, charIndex + 1);
      await wait(speed);
    }

    if (!cancelled && activeLine.role === role && activeLine.index === index) {
      activeLine = { role: "", index: -1 };
    }
  }

  async function runConversation() {
    if (typingStarted) {
      return;
    }

    typingStarted = true;

    for (const [index, faq] of faqs.entries()) {
      await typeLine(
        typedQuestions,
        visibleQuestions,
        index,
        faq.question,
        "question",
        4,
        index === 0 ? 40 : 0
      );

      if (cancelled) {
        return;
      }

      await wait(40);

      await typeLine(
        typedAnswers,
        visibleAnswers,
        index,
        faq.answer,
        "answer",
        3,
        12
      );

      if (cancelled) {
        return;
      }

      if (index < faqs.length - 1) {
        await wait(60);
      }
    }
  }

  onMount(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      typedQuestions = faqs.map((faq) => faq.question);
      typedAnswers = faqs.map((faq) => faq.answer);
      visibleQuestions = faqs.map(() => true);
      visibleAnswers = faqs.map(() => true);
      return () => {};
    }

    if (!chatWindowElement) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          runConversation();
          break;
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(chatWindowElement);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  });
</script>

<section id="faq" class="section chat-faq-section">
  <div class="container">
    <div class="chat-header" use:reveal>
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>

    <div class="chat-window" bind:this={chatWindowElement} use:reveal={{ from: "scale", delay: 120 }}>
      <div class="chat-messages">
        {#each faqs as faq, i}
          {#if visibleQuestions[i]}
            <div class="chat-row customer-row">
              <div class="avatar customer-avatar">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="bubble-wrap customer-wrap">
                <div class="bubble customer-bubble">
                  <p>
                    {typedQuestions[i]}
                    {#if activeLine.role === "question" && activeLine.index === i && typedQuestions[i].length < faq.question.length}
                      <span class="typing-caret" aria-hidden="true">|</span>
                    {/if}
                  </p>
                </div>
                <span class="chat-label">Customer</span>
              </div>
            </div>
          {/if}

          {#if visibleAnswers[i]}
            <div class="chat-row team-row">
              <div class="bubble-wrap team-wrap">
                <span class="team-badge">
                  <i class="fa-solid fa-circle-check"></i> BettaHVAC Team
                </span>
                <div class="bubble team-bubble">
                  <p>
                    {typedAnswers[i]}
                    {#if activeLine.role === "answer" && activeLine.index === i && typedAnswers[i].length < faq.answer.length}
                      <span class="typing-caret" aria-hidden="true">|</span>
                    {/if}
                  </p>
                </div>
                <span class="chat-label team-label">BettaHVAC Team</span>
              </div>
              <div class="avatar team-avatar">
                <i class="fa-solid fa-headset"></i>
              </div>
            </div>
          {/if}
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
</section>

<style>
  .chat-faq-section {
    padding-bottom: 0;
    background-color: var(--color-bg-alt);
    background-image: var(--doodle-pattern);
    background-size: 440px auto;
  }

  .chat-header {
    margin-bottom: 3rem;
    text-align: center;
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
    background: var(--color-bg);
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
    /* Shared glass base */
    background: var(--color-glass-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--color-glass-border);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .bubble:hover {
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .bubble p {
    margin: 0;
    font-size: 1rem;
    min-height: 1.55em;
    text-align: left;
  }

  .customer-bubble {
    color: var(--color-text);
    border-radius: 18px 18px 18px 4px;
  }

  .team-bubble {
    color: var(--color-text);
    border-radius: 18px 18px 4px 18px;
    /* Slight primary tint on top of the glass base */
    background:
      linear-gradient(135deg,
        color-mix(in srgb, var(--color-primary) 12%, transparent),
        color-mix(in srgb, var(--color-primary-light) 6%, transparent)),
      var(--color-glass-bg);
    border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-glass-border));
  }

  .team-bubble p {
    color: var(--color-text);
    text-align: left;
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
    color: var(--color-primary-light);
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

  .typing-caret {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 700;
    margin-left: 0.08em;
    animation: caretBlink 0.9s steps(2, start) infinite;
  }

  @keyframes caretBlink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .typing-caret {
      animation: none;
      opacity: 0;
    }
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
  }
</style>
