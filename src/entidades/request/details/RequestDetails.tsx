import { Flex, GenericDetailsItem, Button } from "@/shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { RequestProps } from "../request.model";
type RequestDetailsProps = {
  request: RequestProps;
};

export const RequestDetails = ({ request }: RequestDetailsProps) => {
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size={"lg"} fontWeight={"normal"}>
          Solicitação
        </Heading>
        <NextLink passHref href={`/requests/edit/${request?._id}`}>
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
        item={request}
        fields={[
          { id: "message", label: "Mensagem" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
    </>
  );
};
