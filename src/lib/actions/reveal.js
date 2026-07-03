/**
 * Scroll-reveal action: hides the node until it enters the viewport, then
 * plays a one-shot entrance animation (see `.reveal` styles in app.css).
 * Classes are removed once the animation ends so the element's own
 * transforms/transitions (hover lifts, 3D tilts) are never overridden.
 *
 * Usage:
 *   <div use:reveal>
 *   <div use:reveal={{ from: "left", delay: 150 }}>
 *
 * @param {HTMLElement} node
 * @param {{ from?: "up" | "left" | "right" | "scale", delay?: number }} [options]
 */
export function reveal(node, options = {}) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    return;
  }

  const variant = `reveal-${options.from ?? "up"}`;
  node.classList.add("reveal", variant);
  if (options.delay) {
    node.style.setProperty("--reveal-delay", `${options.delay}ms`);
  }

  const cleanup = () => {
    node.classList.remove("reveal", variant, "is-revealed");
    node.style.removeProperty("--reveal-delay");
  };

  node.addEventListener("animationend", cleanup, { once: true });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-revealed");
        observer.disconnect();
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
      node.removeEventListener("animationend", cleanup);
    },
  };
}
