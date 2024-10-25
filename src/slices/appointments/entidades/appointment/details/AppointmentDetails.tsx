import { Flex, GenericDetailsItem, Button, Heading, Icon } from "@/shared/ui";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { AppointmentProps } from "../appointment.model";
import { useTranslation } from "react-i18next";

type AppointmentDetailsProps = {
  appointment: AppointmentProps;
};

export const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Agendamento
        </Heading>
        <NextLink passHref href={`/appointments/edit/${appointment?._id}`}>
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
        item={appointment}
        fields={[
          { id: "message", label: "Mensagem" },
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
