import { Flex, GenericDetailsItem, Text, Button } from "shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { RouteDriverProps } from "../routeDriver.model";
type RouteDriverDetailsProps = {
  routeDriver: RouteDriverProps;
};

export const RouteDriverDetails = ({ routeDriver }: RouteDriverDetailsProps) => {
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Corridas {routeDriver?.name}
        </Heading>
        <NextLink passHref href={`/routeDrivers/edit/${routeDriver?._id}`}>
          <Button
            size="sm"
            fontSize={"sm"}
            colorScheme="green"
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Editar
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={routeDriver}
        fields={[
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
    </>
  );
};
