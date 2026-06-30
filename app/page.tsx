import HeroSection from "./sections/hero-section";
import TextDescription from "./sections/text-description";
import LogoMarquee from "./sections/logo-marquee";
import Stats from "./sections/stats";
import AboutRevolutionSection from "./sections/about";
import ProblemSolutionSection from "./sections/problems-section";
import ImageSlider from "./sections/image-slider";
import ThemeTable from "./sections/table";
import CTASection from "./sections/cta-section";

const Page = () => {
  return (
    <main className="mt-2">
      <HeroSection />
      <TextDescription />
      <LogoMarquee />
      <Stats />
      <AboutRevolutionSection />
      <ProblemSolutionSection />
      <ImageSlider />
      <ThemeTable />
      <CTASection />
    </main>
  );
};

export default Page;
