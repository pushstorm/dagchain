"use client";
import { menuLinks } from "./header";

const Menu = () => {
  return (
    <nav
      className="hidden lg:flex items-center rounded-xl gap-1 p-1"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2)) border-box",
      }}
    >
      {menuLinks.map((item, idx) => (
        <button
          key={idx}
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
