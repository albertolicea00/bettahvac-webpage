<script>
  import { onMount } from "svelte";
  import { fetchReviews, postReview } from "../ReviewService.js";
  import { reveal } from "../actions/reveal.js";

  /** @type {import("../ReviewService.js").ReviewsData} */
  let reviewsData = $state({ averageRating: 0, totalReviews: 0, reviews: [] });
  let loading = $state(true);

  // Form State
  /** @type {HTMLDialogElement | undefined} */
  let dialogElement;
  let newReview = $state({ author: "", rating: 5, text: "" });
  let hoverRating = $state(0);
  let submitting = $state(false);

  // Anti-spam Honeypot
  let honeypot = $state("");

  // Hash that opens the review dialog from any shared link, e.g. /#write-review
  const FORM_HASH = "#write-review";

  const openForm = () => {
    if (dialogElement && !dialogElement.open) {
      dialogElement.showModal();
    }
  };

  const closeForm = () => {
    dialogElement?.close();
  };

  // Runs on every close (button, Esc, backdrop): clear the hash so the
  // shared link works again on the next click.
  const handleDialogClose = () => {
    hoverRating = 0;
    if (window.location.hash === FORM_HASH) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  onMount(() => {
    fetchReviews().then((data) => {
      reviewsData = data;
      loading = false;
    });

    const openFromHash = () => {
      if (window.location.hash === FORM_HASH) {
        openForm();
      }
    };

    window.addEventListener("hashchange", openFromHash);
    openFromHash();

    return () => window.removeEventListener("hashchange", openFromHash);
  });

  const handleSubmit = async () => {
    // Honeypot check: If a bot fills this hidden field, silently reject the submission
    if (honeypot !== "") {
      console.warn("Bot detected by honeypot.");
      closeForm();
      newReview = { author: "", rating: 5, text: "" };
      return;
    }

    submitting = true;
    const result = await postReview(newReview);
    if (result && result.success) {
      // Optimitic update / Local prepending
      reviewsData.reviews = [result.review, ...reviewsData.reviews];
      reviewsData.totalReviews += 1;

      // Update average naive calculation
      const tempTotal =
        reviewsData.averageRating * (reviewsData.totalReviews - 1) +
        newReview.rating;
      reviewsData.averageRating = Number(
        (tempTotal / reviewsData.totalReviews).toFixed(1)
      );

      closeForm();
      newReview = { author: "", rating: 5, text: "" };
    }
    submitting = false;
  };
</script>

<section id="reviews" class="section section-alt">
  <div class="container">
    <div class="reviews-header" use:reveal>
      <div>
        <h2 class="section-title" style="margin-bottom: 0.5rem;">
          Customer Reviews
        </h2>
        {#if !loading}
          <div class="rating-summary">
            <span class="score">{reviewsData.averageRating}</span>
            <div class="stars" style="font-size: 1.5rem;">
              {"★".repeat(Math.round(reviewsData.averageRating))}{"☆".repeat(
                5 - Math.round(reviewsData.averageRating),
              )}
            </div>
            <span class="count">({reviewsData.totalReviews} reviews)</span>
          </div>
        {/if}
      </div>
      <a class="btn btn-primary" href={FORM_HASH} onclick={openForm} aria-haspopup="dialog">
        Write a Review
      </a>
    </div>

    <!-- Submission Dialog -->
    <dialog
      class="review-dialog"
      bind:this={dialogElement}
      onclose={handleDialogClose}
      onclick={(e) => {
        // Close when clicking the backdrop (the dialog element itself)
        if (e.target === dialogElement) closeForm();
      }}
      aria-labelledby="review-dialog-title"
    >
      <div class="review-form-container glass-panel">
        <button
          type="button"
          class="dialog-close"
          onclick={closeForm}
          aria-label="Close review form"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        <h3 id="review-dialog-title">Rate your experience with bettaHVAC</h3>
        <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <!-- Honeypot Field (Hidden from real users via CSS) -->
          <div class="oh-no-bots" aria-hidden="true">
            <label for="website-url">Website URL</label>
            <input
              id="website-url"
              type="text"
              bind:value={honeypot}
              autocomplete="off"
              tabindex="-1"
            />
          </div>

          <div class="form-group">
            <label for="author">Name</label>
            <input
              id="author"
              type="text"
              bind:value={newReview.author}
              required
              placeholder="John Doe"
            />
          </div>
          <div class="form-group">
            <span class="form-label" id="rating-label">Rating</span>
            <div class="star-picker" role="radiogroup" aria-labelledby="rating-label">
              {#each [1, 2, 3, 4, 5] as star (star)}
                <button
                  type="button"
                  class="star-btn"
                  class:filled={star <= (hoverRating || newReview.rating)}
                  role="radio"
                  aria-checked={newReview.rating === star}
                  aria-label="{star} {star === 1 ? 'star' : 'stars'}"
                  onmouseenter={() => (hoverRating = star)}
                  onmouseleave={() => (hoverRating = 0)}
                  onfocus={() => (hoverRating = star)}
                  onblur={() => (hoverRating = 0)}
                  onclick={() => (newReview.rating = star)}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>
          <div class="form-group">
            <label for="text">Review Content</label>
            <textarea
              id="text"
              bind:value={newReview.text}
              required
              rows="3"
              placeholder="Share details of your own experience at this place"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-secondary" disabled={submitting}>
            {submitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </dialog>

    <!-- Reviews Grid -->
    {#if loading}
      <p style="text-align: center; color: var(--color-text-light);" aria-live="polite" aria-busy="true">
        Loading reviews...
      </p>
    {:else}
      <div class="reviews-grid">
        {#each reviewsData.reviews as review, i (review.id)}
          <div class="review-card" use:reveal={{ delay: i * 110 }}>
            <div class="review-header">
              <div class="avatar">{review.author.charAt(0)}</div>
              <div class="meta">
                <div class="author-name">{review.author}</div>
                <div class="date">{review.date}</div>
              </div>
            </div>
            <div class="stars">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
            <p class="review-text">{review.text}</p>
            <span class="tail" aria-hidden="true"></span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .rating-summary {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .score {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text);
    font-family: var(--font-heading);
  }

  .stars {
    color: #fbbc04; /* Google Yellow Star Color */
    letter-spacing: 2px;
  }

  .count {
    color: var(--color-text-light);
    font-size: 1.1rem;
    margin-left: 0.5rem;
  }

  /* Dialog */
  .review-dialog {
    border: none;
    padding: 0;
    background: transparent;
    width: min(560px, calc(100vw - 2rem));
    max-height: calc(100vh - 4rem);
    margin: auto;
  }

  .review-dialog::backdrop {
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(4px);
  }

  .review-dialog[open] .review-form-container {
    animation: dialogIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes dialogIn {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .review-dialog[open] .review-form-container {
      animation: none;
    }
  }

  /* Form */
  .review-form-container {
    position: relative;
    padding: 2rem;
    background: var(--color-bg);
    color: var(--color-text);
    border-radius: var(--radius-lg);
  }

  /* Honeypot: pulled off-screen instead of display:none so naive bots
     still "see" and fill it, while real users never do */
  .oh-no-bots {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .review-form-container h3 {
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .dialog-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    line-height: 1;
    padding: 0.35rem;
    color: var(--color-text-light);
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .dialog-close:hover {
    color: var(--color-text);
    transform: scale(1.1);
  }

  .dialog-close:focus-visible {
    outline: 2px solid var(--color-primary);
    border-radius: 4px;
  }

  /* Star picker */
  .form-label {
    font-weight: 500;
  }

  .star-picker {
    display: flex;
    gap: 0.25rem;
  }

  .star-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    line-height: 1;
    padding: 0.1rem;
    color: var(--color-text-light);
    opacity: 0.45;
    transition: color 0.15s ease, opacity 0.15s ease, transform 0.15s ease;
  }

  .star-btn.filled {
    color: #fbbc04;
    opacity: 1;
  }

  .star-btn:hover {
    transform: scale(1.15);
  }

  .star-btn:focus-visible {
    outline: 2px solid var(--color-primary);
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 500;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    background: var(--color-bg-alt);
    color: var(--color-text);
    border: 1px solid rgba(128, 128, 128, 0.4);
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--color-text-light);
    opacity: 0.7;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  /* Grid */
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .review-card {
    position: relative;
    background: var(--color-bg);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 6px;
    padding: 1.5rem 1.5rem 1.75rem;
    box-shadow: var(--shadow-sm);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .review-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  /* Speech bubble tail at the bottom-left */
  .tail {
    position: absolute;
    left: 18px;
    bottom: -10px;
    width: 18px;
    height: 18px;
    background: var(--color-bg);
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transform: rotate(45deg);
    border-bottom-right-radius: 4px;
  }

  .review-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .author-name {
    font-weight: 600;
    color: var(--color-text);
  }

  .date {
    font-size: 0.85rem;
    color: var(--color-text-light);
  }

  .review-card .stars {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .review-text {
    color: var(--color-text);
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .reviews-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .reviews-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
