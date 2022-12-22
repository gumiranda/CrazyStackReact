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
      gap={2}
    >
      {!!item &&
        fields?.map?.((field, index) => (
          <React.Fragment key={`${Math.random() * 10}-${index}`}>
            {!!item?.[field?.id] && (
              <GridItem w="100%" p={["0", "0", "0", "4"]}>
                <Text>{field?.label}:&nbsp;</Text>
                <Text>{item?.[field?.id]}</Text>
              </GridItem>
            )}
          </React.Fragment>
        ))}
    </Grid>
  );
};
