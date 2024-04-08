"use client";

import { Tr, Td, Checkbox, Link, Icon } from "@chakra-ui/react";
import { Box, Text, Button, Table } from "@/shared/ui";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Head, Field } from "./Head";
import { RiPencilLine } from "react-icons/ri";
import NextLink from "next/link";

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
            background: "secondary.400",
            cursor: "pointer",
          }}
        >
          <Td px={["1", "1", "2"]}>
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
                    <Text fontSize={["xs", "sm", "md", "lg"]} fontWeight={"bold"}>
                      {item[field?.id]}
                    </Text>
                  </Link>
                </Box>
              ) : field?.displayKeyText === false ? (
                <>{React.cloneElement(field?.children, { ...item, id: field?.id })}</>
              ) : (
                <Text fontSize={["xs", "sm", "md", "lg"]} fontWeight={"400"}>
                  {item[field?.id]}
                </Text>
              )}
            </Td>
          ))}
          <Td style={{ textAlign: "end" }}>
            <NextLink href={`${route}/edit/${item?._id}`}>
              <Button size="sm" fontSize="sm" colorScheme={"purple"}>
                <Icon fontSize="10" as={RiPencilLine} />
              </Button>
            </NextLink>
          </Td>
        </Tr>
      ))}
      {children}
    </Table>
  );
};
