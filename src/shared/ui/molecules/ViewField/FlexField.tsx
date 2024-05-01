import { useMemo } from "react";
import { Flex, Text } from "../../atoms";
export const FlexScreen = ({ children }) => {
  return (
    <Flex mt={2} flex="1" flexDir={"column"} borderRadius={8} bg="secondary.500" p="8">
      {children}
    </Flex>
  );
};
export const FlexFullCenter = ({ children }) => {
  return (
    <Flex w="100%" justifyContent="center" flexDir={"column"} alignItems={"center"}>
      {children}
    </Flex>
  );
};
export const FlexBody = ({ children }) => {
  return (
    <Flex
      flex="1"
      mt={8}
      flexDir={{ base: "column", md: "row" }}
      borderRadius={8}
      bg="secondary.500"
      alignItems={"center"}
      justifyContent="center"
      p="1"
    >
      {children}
    </Flex>
  );
};

export const FlexField = ({ children }) => {
  return (
    <Flex flexDir={{ base: "column", md: "row" }} alignItems={"center"}>
      {children}
    </Flex>
  );
};
export const SubFlexField = ({ children }) => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      bgColor="secondary.400"
      p={4}
      m={4}
      w={{ base: "100%", md: "50%" }}
      borderRadius={8}
    >
      {children}
    </Flex>
  );
};
const Label = ({ children }) => {
  return <Text fontSize={20}>{children}</Text>;
};
const Description = ({ children }) => {
  return (
    <Text color="gray.500" fontSize="md" fontWeight={"500"} textAlign="center" mt={1}>
      {children}
    </Text>
  );
};
export const Price = ({ children }) => {
  const priceText = useMemo(() => {
    return `${children?.toLocaleString?.("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  }, [children]);
  return (
    <Text fontSize={30} fontWeight={"600"}>
      {priceText}
    </Text>
  );
};
const DateText = ({ children }) => {
  const dateText = useMemo(() => {
    return new Date(children)?.toLocaleTimeString("pt-BR", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }, [children]);
  return (
    <Text fontSize={30} fontWeight={"600"}>
      {dateText}
    </Text>
  );
};
SubFlexField.Label = Label;
SubFlexField.Description = Description;
SubFlexField.Price = Price;
SubFlexField.DateText = DateText;
