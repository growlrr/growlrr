import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BASE_SECTIONS = [
  {
    id: "about",
    title: "About Growlrr",
    blurb:
      "Growlrr is a bistro-inspired pet food maker focused on transparency, nutrition and chef-quality ingredients. We craft rotational diets to keep pets excited and healthy."
  },
  {
    id: "values",
    title: "Our Values",
    blurb: "Transparency • Quality • Science-led. Full ingredient lists, vet-reviewed templates, and ethical sourcing."
  },
  {
    id: "community",
    title: "Join The Pack",
    blurb: "Share unboxing videos, follow our launch, and join a growing community of pet parents who care."
  }
];

export default function Home() {
  const [sections, setSections] = useState(() => {
    // start with two copies so page isn't empty on short viewports
    return [...BASE_SECTIONS, ...BASE_SECTIONS];
  });
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
        if (nearBottom && !loadingMore) {
          setLoadingMore(true);
          // append another copy of base sections after a tiny simulated load
          setTimeout(() => {
            setSections((s) => [...s, ...BASE_SECTIONS]);
            setLoadingMore(false);
          }, 250); // small delay so user sees a subtle load
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadingMore]);

  return (
    <div style={{ background: "#f4f6f8", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
        <header style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "serif", fontSize: "2.4rem", margin: 0 }}>
            Growl with us ♥
          </h1>
          <p style={{ color: "#555", marginTop: 8 }}>
            Bistro-style pet food — rotational, vet-informed, and joyful.
          </p>
          <p style={{ marginTop: 12 }}>
            Explore: <a href="/products">Products</a> • <a href="/crowdfund">Crowdfund</a>
          </p>
        </header>

        <section aria-label="landing-sections" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {sections.map((s, idx) => (
            <article
              key={`${s.id}-${idx}`}
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                minHeight: 160
              }}
            >
              <h2 style={{ marginTop: 0 }}>{s.title}</h2>
              <p style={{ color: "#444", lineHeight: 1.5 }}>{s.blurb}</p>
            </article>
          ))}

          <div style={{ textAlign: "center", padding: 16, color: "#666" }}>
            {loadingMore ? "Loading more…" : "Scroll to load more"}
          </div>
        </section>
      </main>
    </div>
  );
}

