import { Flex, GenericDetailsItem, Text, Button } from "shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { MapRouteProps } from "../mapRoute.model";
type MapRouteDetailsProps = {
  mapRoute: MapRouteProps;
};

export const MapRouteDetails = ({ mapRoute }: MapRouteDetailsProps) => {
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Rota {mapRoute?.name}
        </Heading>
        <NextLink passHref href={`/mapRoutes/edit/${mapRoute?._id}`}>
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
        item={mapRoute}
        fields={[
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
          { id: "distance", label: "Distância (em metros)" },
          { id: "source", subId: "name", label: "Origem" },
          { id: "directions", objectWithArray: "geocoded_waypoints", label: "Direções" },
          { id: "destination", subId: "name", label: "Destino" },
        ]}
      />
    </>
  );
};
