import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  item?: any;
  fields?: any;
  mainField?: any;
  children?: React.ReactNode;
  onClick?: Function;
}
export const Card = ({ item, fields, mainField, children, onClick }: CardProps) => {
  return (
    <>
      {!!item && (
        <Flex
          wordBreak={"break-word"}
          p="2"
          as="button"
          w="full"
          alignItems="center"
          justifyContent={"center"}
          onClick={onClick as any}
        >
          <Box
            bg="white"
            maxW="sm"
            borderWidth={"1px"}
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            <Box p="6">
              <Flex mt="1" alignContent={"center"} flexDir="column">
                <Box
                  fontSize="2xl"
                  fontWeight={"semibold"}
                  as="h4"
                  maxWidth={"234px"}
                  color="purple.700"
                  overflow="hidden"
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                  lineHeight="tight"
                  isTruncated
                >
                  {item?.[mainField]}
                </Box>
                {!!item &&
                  fields?.map?.(({ id, label }: any, index: number) => (
                    <React.Fragment key={`${Math.random() * 10}-${index}`}>
                      {!!item?.[id] && (
                        <Text color="purple.700">{`${label ?? ""} ${item?.[id]}`}</Text>
                      )}
                    </React.Fragment>
                  ))}
              </Flex>
              {children}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};
