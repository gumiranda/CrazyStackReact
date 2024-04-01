import { Flex, GenericDetailsItem, Text, Button } from "@/shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { UserProps } from "../user.model";
type UserDetailsProps = {
  user: UserProps;
};

export const UserDetails = ({ user }: UserDetailsProps) => {
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
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
    </>
  );
};
