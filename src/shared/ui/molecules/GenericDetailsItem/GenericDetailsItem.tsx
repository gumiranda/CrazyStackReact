import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
interface GenericDetailsItemProps {
  item: any;
  fields: any[];
}

export const GenericDetailsItem: React.FC<GenericDetailsItemProps> = ({
  item,
  fields,
}) => {
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns={["repeat(1,1fr)", "repeat(2,1f)", "repeat(3,1fr)"]}
      gap={4}
      p={5}
      bg="gray.100"
      borderRadius="md"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.300"
      transition="all 0.3s"
      _hover={{
        boxShadow: "xl",
        bg: "gray.200",
        transform: "scale(1.05)",
      }}
      role="grid"
      aria-labelledby="grid-heading"
    >
      <Text as="h2" id="grid-heading" srOnly>
        Detalhes
      </Text>
      {!!item &&
        fields?.map?.((field, index) => (
          <React.Fragment key={`${Math.random() * 10}-${index}`}>
            {!!item?.[field?.id] && (
              <GridItem
                w="100%"
                p={["0", "0", "0", "4"]}
                borderRadius="md"
                boxShadow="lg"
                transition="all 0.3s"
                role="gridcell"
              >
                <Text as="span" fontWeight="bold" fontSize="lg" color="teal.600">
                  {field?.label}:&nbsp;
                </Text>
                {field?.subId ? (
                  <Text as="span" fontSize="lg" color="gray.700">
                    {item?.[field?.id]?.[field?.subId]}
                  </Text>
                ) : (
                  <Text as="span" fontSize="lg" color="gray.700">
                    {item?.[field?.id]}
                  </Text>
                )}
              </GridItem>
            )}
          </React.Fragment>
        ))}
    </Grid>
  );
};
