import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import Image from "next/image";

const LogoMarquee = () => {
  const images = ["dagarmy.png", "daggpt.png"];
  return (
    <ScrollVelocityContainer className=" mt-20 ">
      <ScrollVelocityRow baseVelocity={20} direction={1}>
        {images.map((image, idx) => (
          <Image
            src={`/ecosystem-logo/${image}`}
            width={200}
            height={200}
            className="ml-12"
            alt={image}
            key={idx}
          />
        ))}
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
  );
};

export default LogoMarquee;
