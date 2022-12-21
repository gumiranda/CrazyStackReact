import React from "react";
import { List, ListItem, Flex } from "shared/ui";

interface GenericListProps {
  items: any[];
  renderItem: React.FC;
  children?: React.ReactNode;
}

export const GenericListGrid = ({ items, renderItem, children }: GenericListProps) => {
  return (
    <>
      <Flex minW={["100%", "100%", "100%", "auto"]} justifyContent="center">
        <Flex justifyContent={"center"}>
          {!!items && items.length > 0 && (
            <List
              display="grid"
              gridAutoColumns={"1fr"}
              gridAutoRows="1fr"
              gridTemplateColumns={[
                "1fr",
                "1fr",
                "1fr 1fr",
                "1fr 1fr 1fr",
                "1fr 1fr 1fr 1fr",
              ]}
              gridTemplateRows={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
              gap="8"
            >
              {items?.map?.((item, index) => (
                <ListItem key={`${Math.random() * 10}-${index}`}>
                  {renderItem(item)}
                </ListItem>
              ))}
            </List>
          )}
          {children}
        </Flex>
      </Flex>
    </>
  );
};
