import { Flex, GenericDetailsItem, Text, Button } from "@/shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { ClientProps } from "../client.model";
type ClientDetailsProps = {
  client: ClientProps;
};

export const ClientDetails = ({ client }: ClientDetailsProps) => {
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Cliente {client?.name}
        </Heading>
        <NextLink passHref href={`/clients/edit/${client?._id}`}>
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
        item={client}
        fields={[
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
    </>
  );
};
