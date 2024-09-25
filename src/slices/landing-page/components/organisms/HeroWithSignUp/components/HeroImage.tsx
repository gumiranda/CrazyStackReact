import { AspectRatio, Image } from "@/shared/ui";

export const HeroImage = () => {
  return (
    <AspectRatio maxW="460px" ratio={3 / 4}>
      <Image
        src="/cellphone.png"
        alt="Cellphone with app displayed"
        objectFit="cover"
        objectPosition="center"
      />
    </AspectRatio>
  );
};
