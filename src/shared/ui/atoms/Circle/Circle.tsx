import { Circle as CircleChakra, forwardRef } from "@chakra-ui/react";
export const Circle_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <CircleChakra ref={ref} {...rest} data-testid={datatestid ?? "CircleTestId"}>
      {children}
    </CircleChakra>
  );
};
export const Circle = forwardRef(Circle_);
