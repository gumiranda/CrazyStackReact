"use client";

import { Link } from "@chakra-ui/react";
import { Icon, Box, Text, Button, Table2 } from "@/shared/ui";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Head, Field } from "./Head";
import { RiPencilLine } from "react-icons/ri";
import NextLink from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

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
    <Table2
      head={
        <Head
          fields={fields}
          mainChecked={mainChecked}
          setMainChecked={setMainChecked}
          setItems={setItems}
        />
      }
      {...rest}
      data-testid="TableItemsTestId"
    >
      {items?.map?.((item, index) => (
        <Box
          as="tr"
          key={`${Math.random() * 10}-${index}`}
          _hover={{
            background: "secondary.400",
            cursor: "pointer",
          }}
        >
          <Box as="td" px={["1", "1", "2"]}>
            <Checkbox
              colorPalette={"green"}
              checked={item?.value}
              onChange={(e: any) => {
                setItems((prevState: any) => {
                  const newArray = [...prevState];
                  newArray[index].value = e.target.checked;
                  return newArray;
                });
              }}
            />
          </Box>
          {fields?.map?.((field, ix) => (
            <Box
              as="td"
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
                    <Text fontSize={["10", "xs", "sm", "md"]} fontWeight={"bold"}>
                      {item[field?.id]}
                    </Text>
                  </Link>
                </Box>
              ) : field?.displayKeyText === false ? (
                <>
                  {React.cloneElement(field?.children, {
                    ...item,
                    id: field?.id,
                  })}
                </>
              ) : (
                <Text
                  textAlign="center"
                  fontSize={["10", "xs", "sm", "md"]}
                  fontWeight={"400"}
                >
                  {item[field?.id]}
                </Text>
              )}
            </Box>
          ))}
          <Box as="td" style={{ textAlign: "end" }}>
            <NextLink href={`${route}/edit/${item?._id}`}>
              <Button
                size={["xs", "sm", "md", "md"]}
                fontSize={["xs", "sm", "md", "md"]}
                colorPalette={"purple"}
              >
                <Icon fontSize={["xs", "sm", "md", "lg"]} as={RiPencilLine as any} />
              </Button>
            </NextLink>
          </Box>
        </Box>
      ))}
      {children}
    </Table2>
  );
};
