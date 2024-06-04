import { Flex, GenericDetailsItem, Heading, Icon, Button } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { UserProps } from "../user.model";
import { useTranslation } from "react-i18next";

type UserDetailsProps = {
  user: UserProps;
};

export const UserDetails = ({ user }: UserDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Profissional {user?.name}
        </Heading>
        <NextLink passHref href={`/users/edit/${user?._id}`}>
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
        item={user}
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
