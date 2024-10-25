import { Flex, GenericDetailsItem, Heading, Icon, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { MapRouteProps } from "../mapRoute.model";
import { useTranslation } from "react-i18next";

type MapRouteDetailsProps = {
  mapRoute: MapRouteProps;
};

export const MapRouteDetails = ({ mapRoute }: MapRouteDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

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
            colorPalette="green"
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Editar
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={mapRoute}
        fields={[
          { id: "_id", label: "Id da rota" },
          {
            id: "name",
            label: t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            }),
          },
          { id: "createdById", label: "Id do criador" },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
          { id: "distance", label: "Distância (em metros)" },
          { id: "duration", label: "Duração (em minutos)" },
          { id: "source", subId: "name", label: "Origem" },
          // { id: "directions", objectWithArray: "geocoded_waypoints", label: "Direções" },
          // { id: "directions", objectWithArray: "routes", label: "Direções" },
          { id: "destination", subId: "name", label: "Destino" },
        ]}
      />
    </>
  );
};
