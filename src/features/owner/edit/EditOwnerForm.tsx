import { HourWorks, OwnerProps } from "@/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "@/shared/ui";

export interface EditOwnerFormProps {
  owner: OwnerProps;
}
export const EditOwnerForm = ({ owner }: EditOwnerFormProps) => {
  const {
    formState,
    register,
    handleSubmit,
    handleEditOwner,
    haveLunchTime1,
    setHaveLunchTime1,
    haveLunchTime2,
    setHaveLunchTime2,
    haveLunchTime3,
    setHaveLunchTime3,
    changeHour,
    listHours,
    hourWork,
    daysOptions1,
    daysOptions2,
    daysOptions3,
    control,
    haveAlternativeHour,
    setHaveAlternativeHour,
    haveAlternativeHour2,
    setHaveAlternativeHour2,
  } = useEditOwner({
    owner,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditOwner)}
      title={"Editar estabelecimento"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/owners/1"}
    >
      <GenericDetailsItem
        item={owner}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da estabelecimento"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Descrição do estabelecimento"
          error={formState.errors.description}
          {...register("description")}
        />
        <HourWorks
          props={{
            haveLunchTime1,
            setHaveLunchTime1,
            haveLunchTime2,
            setHaveLunchTime2,
            haveLunchTime3,
            setHaveLunchTime3,
            changeHour,
            listHours,
            hourWork,
            daysOptions1,
            daysOptions2,
            daysOptions3,
            control,
            haveAlternativeHour,
            setHaveAlternativeHour,
            haveAlternativeHour2,
            setHaveAlternativeHour2,
          }}
        />
        <FormControl
          label="Tempo limite para reagendamento/cancelamento (em minutos)"
          error={formState.errors.minimumTimeForReSchedule}
          {...register("minimumTimeForReSchedule")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
