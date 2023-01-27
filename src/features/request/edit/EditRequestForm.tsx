import { RequestProps } from "entidades/request";
import { useEditRequest } from "./editRequest.hook";
import {
  BoxCreateItem,
  DatePicker,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Select,
} from "shared/ui";
import { statusArray } from "entidades/request/request.model";

export interface EditRequestFormProps {
  request: RequestProps;
}
export const EditRequestForm = ({ request }: EditRequestFormProps) => {
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
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditRequest)}
      title={"Editar solicitação"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GenericDetailsItem
        item={request}
        fields={[
          { id: "_id", label: "Id" },
          { id: "message", label: "Obs" },
          { id: "statusLabel", label: "Status da solicitação" },
          { id: "createdById", label: "Id do criador" },
          { id: "ownerId", label: "Id do owner" },
          { id: "clientId", label: "Id do cliente" },
          { id: "initDateFormatted", label: "Data início" },
          { id: "endDateFormatted", label: "Data fim" },
          { id: "professionalId", label: "Id do profissional" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <Select
          bg="purple.700"
          name="statusList"
          label="Status da solicitação"
          list={statusArray}
          value={statusSelected}
          onChange={handleChangeStatus}
          keyValue="key"
          keyLabel="value"
        />
        <DatePicker
          placeholder="Selecione uma data"
          name="date"
          defaultValue={dateSelected}
          label="Data de agendamento"
          onChange={(date: string) => {
            setDateChanged(true);
            setDateSelected(date as any);
          }}
        />
        {dateChanged && timeAvailable?.timeAvailable?.length > 0 && (
          <Select
            bg="purple.700"
            name="timeList"
            label="Horário disponível"
            list={timeAvailable?.timeAvailable ?? []}
            value={timeSelected ?? ""}
            onChange={handleChangeTimeSelected}
            keyValue="value"
            keyLabel="label"
          />
        )}
        <FormControl
          label="Mensagem da solicitação"
          error={formState.errors.message}
          {...register("message")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
