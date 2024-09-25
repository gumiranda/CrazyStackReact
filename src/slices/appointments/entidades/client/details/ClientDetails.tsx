import { Flex, GenericDetailsItem, Heading, Icon, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { ClientProps } from "../client.model";
import { useTranslation } from "react-i18next";
type ClientDetailsProps = {
  client: ClientProps;
};

export const ClientDetails = ({ client }: ClientDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          {t("PAGES:HOME_PAGE.client", {
            defaultValue: "Cliente",
          })}
          {client?.name}
        </Heading>
        <NextLink passHref href={`/clients/edit/${client?._id}`}>
          <Button
            size="sm"
            fontSize={"sm"}
            colorScheme="green"
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            {t("PAGES:MESSAGES.edit", {
              defaultValue: "Editar",
            })}
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={client}
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
