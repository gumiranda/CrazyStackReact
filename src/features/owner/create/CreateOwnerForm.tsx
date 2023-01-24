import { HourWorks } from "entidades/owner";
import { useCreateOwner } from "./createOwner.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateOwnerForm = () => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateOwner,
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
  } = useCreateOwner();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateOwner)}
      title={"Criar estabelecimento"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/owners/1"}
    >
      <GridForm>
        <FormControl
          label="Nome do estabelecimento"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Descrição da estabelecimento"
          error={formState.errors.description}
          {...register("description")}
        />
        <HourWorks
          props={{
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
            haveLunchTime1,
            setHaveLunchTime1,
            haveLunchTime2,
            setHaveLunchTime2,
            haveLunchTime3,
            setHaveLunchTime3,
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
