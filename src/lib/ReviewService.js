const localReviewsData = {
  averageRating: 4.8,
  totalReviews: 4,
  reviews: [
    {
      id: "r1",
      author: "Jane Doe",
      rating: 5,
      text: "Excellent service! The technicians were prompt, professional, and had our A/C running perfectly in no time.",
      date: "2025-05-12"
    },
    {
      id: "r2",
      author: "John Smith",
      rating: 4,
      text: "Very knowledgeable team. They fixed our heating issue efficiently. Highly recommend bettaHVAC.",
      date: "2025-11-20"
    },
    {
      id: "r3",
      author: "Sarah Connor",
      rating: 5,
      text: "Great communication and transparent pricing. Will definitely use them again for our annual maintenance.",
      date: "2026-01-05"
    },
    {
      id: "r4",
      author: "Mike Johnson",
      rating: 5,
      text: "Best HVAC service in town! They installed our new heating system quickly and at a fair price. Very satisfied.",
      date: "2026-03-15"
    }
  ]
};

const API_ENDPOINT = null;

export const fetchReviews = async () => {
  if (API_ENDPOINT) {
    try {
      const response = await fetch(API_ENDPOINT);
      return await response.json();
    } catch (error) {
      console.error(
        "Failed to fetch external reviews, falling back to local.",
        error,
      );
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return localReviewsData;
};

export const postReview = async (review) => {
  if (API_ENDPOINT) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to post external review.", error);
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    review: {
      ...review,
      id: `r${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString().split("T")[0],
    },
  };
};
