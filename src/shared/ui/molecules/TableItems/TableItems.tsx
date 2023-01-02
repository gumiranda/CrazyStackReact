import { Tr, Td, Checkbox, Link, Icon } from "@chakra-ui/react";
import { Box, Text, Button, Table } from "shared/ui";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Head, Field } from "./Head";
import { RiPencilLine } from "react-icons/ri";

interface TableItemsProps {
  items: any[];
  route: string;
  routeDetails: string;
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  children?: any;
}
export const TableItems = ({
  items = [],
  setItems,
  linkOnMouseEnter,
  fields = [],
  route = "/",
  routeDetails = "/",
  children,
  ...rest
}: TableItemsProps) => {
  const router = useRouter();
  const [mainChecked, setMainChecked] = useState(false);
  return (
    <Table
      head={
        <Head
          fields={fields}
          mainChecked={mainChecked}
          setMainChecked={setMainChecked}
          setItems={setItems}
        />
      }
      colorScheme="whiteAlpha"
      {...rest}
      data-testid="TableItemsTestId"
    >
      {items?.map?.((item, index) => (
        <Tr
          key={`${Math.random() * 10}-${index}`}
          _hover={{
            background: "purple.700",
            cursor: "pointer",
          }}
        >
          <Td px={["2", "2", "3"]}>
            <Checkbox
              colorScheme={"green"}
              isChecked={item?.value}
              onChange={(e) => {
                setItems((prevState: any) => {
                  const newArray = [...prevState];
                  newArray[index].value = e.target.checked;
                  return newArray;
                });
              }}
            />
          </Td>
          {fields?.map?.((field, ix) => (
            <Td
              key={`${Math.random() * 10}-${ix}`}
              whiteSpace="nowrap"
              maxW={0}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {field?.id === "name" ? (
                <Box>
                  <Link
                    color="green.400"
                    href={`${routeDetails}/${item?._id}`}
                    onMouseEnter={() => linkOnMouseEnter(item)}
                  >
                    <Text fontWeight={"bold"}>{item[field?.id]}</Text>
                  </Link>
                </Box>
              ) : field?.displayKeyText === false ? (
                <>{React.cloneElement(field?.children, { ...item, id: field?.id })}</>
              ) : (
                <>{item[field?.id]}</>
              )}
            </Td>
          ))}
          <Td style={{ textAlign: "end" }}>
            <Button
              as="a"
              size="sm"
              href={`${route}/edit/${item?._id}`}
              fontSize="sm"
              colorScheme={"purple"}
            >
              <Icon fontSize="16" as={RiPencilLine} />
            </Button>
          </Td>
        </Tr>
      ))}
      {children}
    </Table>
  );
};
