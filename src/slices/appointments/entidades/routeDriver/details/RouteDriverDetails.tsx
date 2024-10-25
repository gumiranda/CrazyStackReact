import { Flex, GenericDetailsItem, Heading, Icon, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { RouteDriverProps } from "../routeDriver.model";
import { useTranslation } from "react-i18next";

type RouteDriverDetailsProps = {
  routeDriver: RouteDriverProps;
};

export const RouteDriverDetails = ({ routeDriver }: RouteDriverDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Corrida {routeDriver?.name}
        </Heading>
        <NextLink passHref href={`/routeDrivers/edit/${routeDriver?._id}`}>
          <Button
            size="sm"
            fontSize={"sm"}
            colorPalette="green"
            // leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Editar
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={routeDriver}
        fields={[
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
        ]}
      />
    </>
  );
};
