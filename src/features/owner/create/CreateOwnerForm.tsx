import { useCreateOwner } from "./createOwner.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Select } from "shared/ui";

export const CreateOwnerForm = () => {
  const {
    formState,
    register,
    handleSubmit,
    handleCreateOwner,
    haveLunchTime,
    setHaveLunchTime,
    changeHour,
    listHours,
    hourWork,
  } = useCreateOwner();
  const onChangeHourStart1 = (event: any) => {
    changeHour(event, "hourStart1");
  };
  const onChangeHourEnd1 = (event: any) => {
    changeHour(event, "hourEnd1");
  };
  const onChangeHourLunchStart1 = (event: any) => {
    changeHour(event, "hourLunchStart1");
  };
  const onChangeHourLunchEnd1 = (event: any) => {
    changeHour(event, "hourLunchEnd1");
  };
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
          label="Descrição do estabelecimento"
          error={formState.errors.description}
          {...register("description")}
        />
        <Select
          bg="purple.700"
          name="openHour"
          label="Horário de abertura 1"
          list={listHours}
          value={hourWork.hourStart1}
          onChange={onChangeHourStart1}
          keyValue="label"
          keyLabel="label"
        ></Select>
        <Select
          bg="purple.700"
          name="openHour"
          label="Horário de fechamento 1"
          list={listHours}
          value={hourWork.hourEnd1}
          onChange={onChangeHourEnd1}
          keyValue="label"
          keyLabel="label"
        ></Select>
        {haveLunchTime && (
          <>
            <Select
              bg="purple.700"
              name="openHour"
              label="Horário início do almoço 1"
              list={listHours}
              value={hourWork.hourLunchStart1}
              onChange={onChangeHourLunchStart1}
              keyValue="label"
              keyLabel="label"
            ></Select>
            <Select
              bg="purple.700"
              name="openHour"
              label="Horário fim do almoço 1"
              list={listHours}
              value={hourWork.hourLunchEnd1}
              onChange={onChangeHourLunchEnd1}
              keyValue="label"
              keyLabel="label"
            ></Select>
          </>
        )}
        <Checkbox
          colorScheme="green"
          isChecked={haveLunchTime}
          label="Possui horário de almoço?"
          onChange={(e) => {
            e.preventDefault();
            setHaveLunchTime(e.target.checked);
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
