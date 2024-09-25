import { useMemo } from "react";
import { Box, Text } from "../../atoms";
export const ViewField = ({ children, ...rest }) => {
  return (
    <Box display="flex" flexDir="row" justifyContent={"space-between"} my={1}>
      {children}
    </Box>
  );
};
export const Label = ({ children, ...props }) => {
  return (
    <Text
      color="gray.600"
      fontSize="md"
      fontWeight={"500"}
      textAlign="center"
      mt={1}
      {...props}
    >
      {children}
    </Text>
  );
};
export const Description = ({ children }) => {
  return (
    <Text color="gray.500" fontSize="md" fontWeight={"500"} textAlign="center" mt={1}>
      {children}
    </Text>
  );
};
export const PriceText = ({ children }) => {
  const priceText = useMemo(() => {
    return `${children?.toLocaleString?.("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  }, [children]);
  return (
    <Text
      fontSize="md"
      fontWeight={"semibold"}
      textAlign="center"
      mt={1}
      color="tertiary.500"
    >
      {priceText}
    </Text>
  );
};

ViewField.Label = Label;
ViewField.Description = Description;
ViewField.PriceText = PriceText;
