import { ClientProps } from "@/entidades/client";
import { useEditClient } from "./editClient.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export interface EditClientFormProps {
  client: ClientProps;
  id: string;
  users: any;
}
export const EditClientForm = ({ client, id, users }: EditClientFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { formState, register, handleSubmit, handleEditClient } = useEditClient({
    client,
    id,
    users,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditClient)}
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar cliente",
        domain: t("PAGES:HOME_PAGE.client", {
          defaultValue: "Cliente",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/clients/1"}
    >
      <GenericDetailsItem
        item={client}
        fields={[
          { id: "_id", label: "Id" },
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
      <GridForm>
        <FormControl
          label={t("PAGES:FIELDS.name", {
            defaultValue: "Nome",
          })}
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label={t("PAGES:AUTH_PAGE.phone", {
            defaultValue: "Telefone",
          })}
          error={formState.errors.phone}
          labelColor="white"
          bgColor="secondary.500"
          bgColorHover="secondary.600"
          type="tel"
          mask="(99) 99999-9999"
          {...register("phone")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
