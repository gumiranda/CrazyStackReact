import { RequestProps } from "@/slices/appointments/entidades/request";
import { useEditRequest } from "./editRequest.hook";
import {
  BoxCreateItem,
  DatePicker,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "@/shared/ui";
import { statusArray } from "@/slices/appointments/entidades/request/request.model";
import { useTranslation } from "react-i18next";

export interface EditRequestFormProps {
  request: RequestProps;
  owners: any;
}
export const EditRequestForm = ({ request, owners }: EditRequestFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleEditRequest,
    statusSelected,
    handleChangeStatus,
    dateSelected,
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    dateChanged,
    setDateChanged,
  } = useEditRequest({
    request,
    owners,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditRequest)}
      title={t("PAGES:HOME_PAGE.editDomain", {
        defaultValue: "Editar solicitação",
        domain: t("PAGES:HOME_PAGE.request", {
          defaultValue: "Solicitação",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GenericDetailsItem
        item={request}
        fields={[
          { id: "_id", label: "Id" },
          { id: "message", label: "Obs" },
          { id: "statusLabel", label: "Status da solicitação" },
          { id: "ownerName", label: "Estabelecimento" },
          { id: "professionalName", label: "Profissional" },
          { id: "serviceName", label: "Serviço" },
          { id: "clientName", label: "Cliente" },
          { id: "initDateFormatted", label: "Data início" },
          { id: "endDateFormatted", label: "Data fim" },
          {
            id: "createdAt",
            label: t("PAGES:FIELDS.createdAt", {
              defaultValue: "Data de criação",
            }),
          },
        ]}
      />
      <GridForm>
        <Select
          bg="secondary.600"
          name="statusList"
          label="Status da solicitação"
          list={statusArray}
          value={statusSelected}
          onChange={handleChangeStatus}
          keyValue="key"
          keyLabel="value"
        />
        <DatePicker
          placeholder={t("PAGES:NEW_APPOINTMENT.selectDate", {
            defaultValue: "Selecione a data do agendamento",
          })}
          name="date"
          label={t("PAGES:NEW_APPOINTMENT.date", {
            defaultValue: "Data do agendamento",
          })}
          defaultValue={dateSelected}
          onChange={(date: string) => {
            setDateChanged(true);
            setDateSelected(date as any);
          }}
        />
        {dateChanged && timeAvailable?.timeAvailable?.length > 0 && (
          <Select
            bg="secondary.600"
            name="timeList"
            label={t("PAGES:NEW_APPOINTMENT.timeAvailable", {
              defaultValue: "Horário disponível",
            })}
            list={timeAvailable?.timeAvailable ?? []}
            value={timeSelected ?? ""}
            onChange={handleChangeTimeSelected}
            keyValue="value"
            keyLabel="label"
          />
        )}
        <FormControl
          label={t("PAGES:NEW_APPOINTMENT.observations", {
            defaultValue: "Observação",
          })}
          error={formState.errors.message}
          {...register("message")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
