import { useEffect, useRef, useState } from "react";

export function useInViewFadeUp(delayMs = 0) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return {
    ref,
    className: `reveal ${shown ? "revealShown" : ""}`,
    style: { transitionDelay: `${delayMs}ms` },
  };
}
