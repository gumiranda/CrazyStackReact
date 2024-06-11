import { AspectRatio, Image } from "@/shared/ui";

export const HeroImage = () => {
  return (
    <AspectRatio ratio={1}>
      <Image
        src="https://tinyurl.com/yeyjvptc"
        alt="Hero image"
        objectFit="cover"
        objectPosition="center"
      />
    </AspectRatio>
  );
};
