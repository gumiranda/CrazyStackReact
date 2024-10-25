import { Flex, GenericDetailsItem, Heading, Icon, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { OwnerProps } from "../owner.model";
import { useTranslation } from "react-i18next";
type OwnerDetailsProps = {
  owner: OwnerProps;
};

export const OwnerDetails = ({ owner }: OwnerDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Estabelecimento {owner?.name}
        </Heading>
        <NextLink passHref href={`/owners/edit/${owner?._id}`}>
          <Button
            size="sm"
            fontSize={"sm"}
            colorPalette="green"
            //leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Editar
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={owner}
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
