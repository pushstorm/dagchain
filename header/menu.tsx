"use client";
import { menuLinks } from "./header";
const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};
const Menu = () => {
  return (
    <nav
      className="hidden border lg:flex items-center rounded-xl gap-1 p-1"
      style={{
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2)) border-box",
      }}
    >
      {menuLinks.map((item, idx) => (
        <button
          key={idx}
          onClick={() => scrollToSection(item.link)}
          className="relative cursor-pointer font-inter px-3 py-2 rounded-lg text-sm text-neutral-700 transition-colors"
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background =
              "linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2))";
            btn.style.color = "white";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "";
            btn.style.color = "";
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
