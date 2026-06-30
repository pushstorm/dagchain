"use client";
import { menuLinks } from "./header";

const Menu = () => {
  return (
    <nav
      className="flex items-center rounded-xl gap-1 p-1"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2)) border-box",
      }}
    >
      {menuLinks.map((item, idx) => (
        <button
          key={idx}
          className="relative cursor-pointer transition-all duration-300 font-inter px-3 py-2 rounded-lg text-sm
            text-neutral-700 hover:text-white
            hover:bg-linear-to-r hover:from-color-1 hover:via-color-3 hover:to-color-2"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
