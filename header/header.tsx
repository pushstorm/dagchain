import Logo from "@/logo/logo";
import Menu from "./menu";
export const menuLinks = [
  { label: "Overview", link: "/" },
  { label: "Why Join Dag Chain", link: "/" },
  { label: "Be a Part of the Ecosystem", link: "/" },
];
const Header = () => {
  return (
    <header className="py-2 sticky z-99 inset-0 bg-white/80 backdrop-blur-xl">
      <div className="container flex justify-between items-center">
        <Logo className="w-36" />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
