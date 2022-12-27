import { useCreateOwner } from "./createOwner.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Select,
  ControlledSelect,
} from "shared/ui";
import { CreateOwnerFormData, DaysOptions } from "./createOwner.lib";

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
  const {
    onChangeHourStart1,
    onChangeHourEnd1,
    onChangeHourLunchEnd1,
    onChangeHourLunchStart1,
    onChangeHourStart2,
    onChangeHourEnd2,
    onChangeHourLunchEnd2,
    onChangeHourLunchStart2,
    onChangeHourStart3,
    onChangeHourEnd3,
    onChangeHourLunchEnd3,
    onChangeHourLunchStart3,
  } = useOnChanges({ changeHour });
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
        <HourWorkForm
          props={{
            labelDayWork: "Dias de funcionamento 1",
            labelHourStart: "Horário de abertura 1",
            labelHourEnd: "Horário de fechamento 1",
            labelHourLunchStart: "Horário de almoço de abertura 1",
            labelHourLunchEnd: "Horário de almoço de fechamento 1",
            control,
            daysOptions: daysOptions1,
            listHours,
            daysOptionsName: "days1Options",
            flagDependent: haveLunchTime1,
            valueHourStart: hourWork.hourStart1,
            onChangeHourStart: onChangeHourStart1,
            valueHourEnd: hourWork.hourEnd1,
            onChangeHourEnd: onChangeHourEnd1,
            valueHourLunchStart: hourWork.hourLunchStart1,
            onChangeHourLunchStart: onChangeHourLunchStart1,
            valueHourLunchEnd: hourWork.hourLunchEnd1,
            onChangeHourLunchEnd: onChangeHourLunchEnd1,
          }}
        />
        <Checkbox
          colorScheme="green"
          isChecked={haveLunchTime1}
          label="Possui horário de almoço?"
          onChange={(e) => {
            e.preventDefault();
            setHaveLunchTime1(e.target.checked);
          }}
        />
        <Checkbox
          colorScheme="green"
          isChecked={haveAlternativeHour}
          label="Possui horário alternativo?"
          onChange={(e) => {
            e.preventDefault();
            setHaveAlternativeHour(e.target.checked);
          }}
        />
        {haveAlternativeHour && (
          <>
            <HourWorkForm
              props={{
                labelDayWork: "Dias de funcionamento 2",
                labelHourStart: "Horário de abertura 2",
                labelHourEnd: "Horário de fechamento 2",
                labelHourLunchStart: "Horário de almoço de abertura 2",
                labelHourLunchEnd: "Horário de almoço de fechamento 2",
                control,
                daysOptions: daysOptions2,
                listHours,
                daysOptionsName: "days2Options",
                flagDependent: haveLunchTime2,
                valueHourStart: hourWork.hourStart2,
                onChangeHourStart: onChangeHourStart2,
                valueHourEnd: hourWork.hourEnd2,
                onChangeHourEnd: onChangeHourEnd2,
                valueHourLunchStart: hourWork.hourLunchStart2,
                onChangeHourLunchStart: onChangeHourLunchStart2,
                valueHourLunchEnd: hourWork.hourLunchEnd2,
                onChangeHourLunchEnd: onChangeHourLunchEnd2,
              }}
            />
            <Checkbox
              colorScheme="green"
              isChecked={haveLunchTime2}
              label="Possui horário de almoço?"
              onChange={(e) => {
                e.preventDefault();
                setHaveLunchTime2(e.target.checked);
              }}
            />
            <Checkbox
              colorScheme="green"
              isChecked={haveAlternativeHour2}
              label="Possui terceiro horário?"
              onChange={(e) => {
                e.preventDefault();
                setHaveAlternativeHour2(e.target.checked);
              }}
            />
            {haveAlternativeHour2 && (
              <>
                <HourWorkForm
                  props={{
                    labelDayWork: "Dias de funcionamento 3",
                    labelHourStart: "Horário de abertura 3",
                    labelHourEnd: "Horário de fechamento 3",
                    labelHourLunchStart: "Horário de almoço de abertura 3",
                    labelHourLunchEnd: "Horário de almoço de fechamento 3",
                    control,
                    daysOptions: daysOptions3,
                    listHours,
                    daysOptionsName: "days3Options",
                    flagDependent: haveLunchTime3,
                    valueHourStart: hourWork.hourStart3,
                    onChangeHourStart: onChangeHourStart3,
                    valueHourEnd: hourWork.hourEnd3,
                    onChangeHourEnd: onChangeHourEnd3,
                    valueHourLunchStart: hourWork.hourLunchStart3,
                    onChangeHourLunchStart: onChangeHourLunchStart3,
                    valueHourLunchEnd: hourWork.hourLunchEnd3,
                    onChangeHourLunchEnd: onChangeHourLunchEnd3,
                  }}
                />
                <Checkbox
                  colorScheme="green"
                  isChecked={haveLunchTime2}
                  label="Possui horário de almoço?"
                  onChange={(e) => {
                    e.preventDefault();
                    setHaveLunchTime2(e.target.checked);
                  }}
                />
              </>
            )}
          </>
        )}

        <Checkbox
          colorScheme="green"
          isChecked={haveLunchTime3}
          label="Possui horário de almoço?"
          onChange={(e) => {
            e.preventDefault();
            setHaveLunchTime3(e.target.checked);
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
const useOnChanges = ({ changeHour }: any) => {
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
  const onChangeHourStart2 = (event: any) => {
    changeHour(event, "hourStart2");
  };
  const onChangeHourEnd2 = (event: any) => {
    changeHour(event, "hourEnd2");
  };
  const onChangeHourLunchStart2 = (event: any) => {
    changeHour(event, "hourLunchStart2");
  };
  const onChangeHourLunchEnd2 = (event: any) => {
    changeHour(event, "hourLunchEnd2");
  };
  const onChangeHourStart3 = (event: any) => {
    changeHour(event, "hourStart3");
  };
  const onChangeHourEnd3 = (event: any) => {
    changeHour(event, "hourEnd3");
  };
  const onChangeHourLunchStart3 = (event: any) => {
    changeHour(event, "hourLunchStart3");
  };
  const onChangeHourLunchEnd3 = (event: any) => {
    changeHour(event, "hourLunchEnd3");
  };
  return {
    onChangeHourStart1,
    onChangeHourEnd1,
    onChangeHourLunchStart1,
    onChangeHourLunchEnd1,
    onChangeHourStart2,
    onChangeHourEnd2,
    onChangeHourLunchEnd2,
    onChangeHourLunchStart2,
    onChangeHourStart3,
    onChangeHourEnd3,
    onChangeHourLunchEnd3,
    onChangeHourLunchStart3,
  };
};
const HourWorkForm = ({
  props: {
    labelDayWork = "Dias de funcionamento 1",
    labelHourStart = "Horário de abertura 1",
    labelHourEnd = "Horário de fechamento 1",
    labelHourLunchStart = "Horário de almoço de abertura 1",
    labelHourLunchEnd = "Horário de almoço de fechamento 1",
    control,
    daysOptions,
    listHours,
    daysOptionsName = "days1Options",
    flagDependent,
    valueHourStart,
    onChangeHourStart,
    valueHourEnd,
    onChangeHourEnd,
    valueHourLunchStart,
    onChangeHourLunchStart,
    valueHourLunchEnd,
    onChangeHourLunchEnd,
  },
}: any) => {
  return (
    <>
      <ControlledSelect<CreateOwnerFormData, DaysOptions, true>
        isMulti
        control={control}
        label={labelDayWork}
        placeholder="Selecione pelo menos 1 dia"
        options={daysOptions}
        name={daysOptionsName}
      />
      <Select
        bg="purple.700"
        name="openHour"
        label={labelHourStart}
        list={listHours}
        value={valueHourStart}
        onChange={onChangeHourStart}
        keyValue="label"
        keyLabel="label"
      ></Select>
      <Select
        bg="purple.700"
        name="endHour"
        label={labelHourEnd}
        list={listHours}
        value={valueHourEnd}
        onChange={onChangeHourEnd}
        keyValue="label"
        keyLabel="label"
      ></Select>
      {flagDependent && (
        <>
          <Select
            bg="purple.700"
            name="openHour"
            label={labelHourLunchStart}
            list={listHours}
            value={valueHourLunchStart}
            onChange={onChangeHourLunchStart}
            keyValue="label"
            keyLabel="label"
          ></Select>
          <Select
            bg="purple.700"
            name="openHour"
            label={labelHourLunchEnd}
            list={listHours}
            value={valueHourLunchEnd}
            onChange={onChangeHourLunchEnd}
            keyValue="label"
            keyLabel="label"
          ></Select>
        </>
      )}
    </>
  );
};
