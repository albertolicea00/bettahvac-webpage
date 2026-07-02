<script>
  import { onMount } from "svelte";
  import { fetchReviews, postReview } from "../ReviewService.js";

  let reviewsData = { averageRating: 0, totalReviews: 0, reviews: [] };
  let loading = true;

  // Form State
  let showForm = false;
  let newReview = { author: "", rating: 5, text: "" };
  let submitting = false;

  // Anti-spam Honeypot
  let honeypot = "";

  onMount(async () => {
    reviewsData = await fetchReviews();
    loading = false;
  });

  const handleSubmit = async () => {
    // Honeypot check: If a bot fills this hidden field, silently reject the submission
    if (honeypot !== "") {
      console.warn("Bot detected by honeypot.");
      showForm = false;
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
      reviewsData.averageRating = (
        tempTotal / reviewsData.totalReviews
      ).toFixed(1);

      showForm = false;
      newReview = { author: "", rating: 5, text: "" };
    }
    submitting = false;
  };
</script>

<section id="reviews" class="section section-alt">
  <div class="container">
    <div class="reviews-header">
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
      <button class="btn btn-primary" on:click={() => (showForm = !showForm)}>
        {showForm ? "Cancel" : "Write a Review"}
      </button>
    </div>

    <!-- Submission Form -->
    {#if showForm}
      <div class="review-form-container glass-panel">
        <h3>Rate your experience with bettaHVAC</h3>
        <form on:submit|preventDefault={handleSubmit}>
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
            <label for="rating">Rating (1-5)</label>
            <input
              id="rating"
              type="number"
              min="1"
              max="5"
              bind:value={newReview.rating}
              required
            />
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
    {/if}

    <!-- Reviews Grid -->
    {#if loading}
      <p style="text-align: center; color: var(--color-text-light);">
        Loading reviews...
      </p>
    {:else}
      <div class="reviews-grid">
        {#each reviewsData.reviews as review}
          <div class="review-card">
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

  /* Form */
  .review-form-container {
    padding: 2rem;
    margin-bottom: 3rem;
    animation: slideDown 0.3s ease;
  }

  .review-form-container h3 {
    margin-bottom: 1.5rem;
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
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
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
    background: var(--color-bg);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .review-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
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

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
