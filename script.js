const timelineProgress = document.querySelector(".timeline-progress");

if (timelineProgress) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        timelineProgress.classList.add("is-visible");
      });
    },
    {
      threshold: 0.35
    }
  );

  observer.observe(timelineProgress);
}
