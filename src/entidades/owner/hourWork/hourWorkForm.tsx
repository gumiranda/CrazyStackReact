import { Select, ControlledSelect, Checkbox } from "shared/ui";
import { OptionBase } from "chakra-react-select";
export type HourValidatorInput = {
  hourStart1: string;
  hourEnd1: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourStart2?: string;
  hourEnd2?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  hourStart3?: string;
  hourEnd3?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
};
export interface DaysOptions extends OptionBase {
  label: string;
  value: string;
}
export type CreateOwnerFormData = {
  name: string;
  description: string;
  minimumTimeForReSchedule?: number;
  active?: boolean;
  haveDelivery?: boolean;
  days1Options?: DaysOptions[];
  days2Options?: DaysOptions[];
  days3Options?: DaysOptions[];
};
export type EditOwnerFormData = {
  name: string;
  description: string;
  minimumTimeForReSchedule?: number;
  active?: boolean;
  haveDelivery?: boolean;
  days1Options?: DaysOptions[];
  days2Options?: DaysOptions[];
  days3Options?: DaysOptions[];
};
type HourWorkFormInput = {
  props: {
    labelDayWork: string;
    labelHourStart: string;
    labelHourEnd: string;
    labelHourLunchStart: string;
    labelHourLunchEnd: string;
    control: any;
    daysOptions: any;
    listHours: any;
    daysOptionsName: any;
    flagDependent: boolean;
    valueHourStart: string;
    onChangeHourStart: any;
    valueHourEnd: string;
    onChangeHourEnd: any;
    valueHourLunchStart: string;
    onChangeHourLunchStart: any;
    valueHourLunchEnd: string;
    onChangeHourLunchEnd: any;
  };
};
type HourWorksProps = {
  changeHour: any;
  listHours: any;
  hourWork: any;
  daysOptions1: any;
  daysOptions2: any;
  daysOptions3: any;
  control: any;
  haveAlternativeHour: boolean;
  setHaveAlternativeHour: any;
  haveAlternativeHour2: boolean;
  setHaveAlternativeHour2: any;
  haveLunchTime1: boolean;
  setHaveLunchTime1: any;
  haveLunchTime2: boolean;
  setHaveLunchTime2: any;
  haveLunchTime3: boolean;
  setHaveLunchTime3: any;
};
type HourWorksInput = {
  props: HourWorksProps;
};
export const HourWorks = ({
  props: {
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
  },
}: HourWorksInput) => {
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
    <>
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
    </>
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

export const HourWorkForm = ({
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
}: HourWorkFormInput) => {
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
      />
      <Select
        bg="purple.700"
        name="endHour"
        label={labelHourEnd}
        list={listHours}
        value={valueHourEnd}
        onChange={onChangeHourEnd}
        keyValue="label"
        keyLabel="label"
      />
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
          />
          <Select
            bg="purple.700"
            name="openHour"
            label={labelHourLunchEnd}
            list={listHours}
            value={valueHourLunchEnd}
            onChange={onChangeHourLunchEnd}
            keyValue="label"
            keyLabel="label"
          />
        </>
      )}
    </>
  );
};

export const daysOptions = [
  { label: "Segunda-feira", value: "monday" },
  { label: "Terça-feira", value: "tuesday" },
  { label: "Quarta-feira", value: "wednesday" },
  { label: "Quinta-feira", value: "thursday" },
  { label: "Sexta-feira", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];
export const listHours = [
  { label: "7:00" },
  { label: "7:30" },
  { label: "8:00" },
  { label: "8:30" },
  { label: "9:00" },
  { label: "9:30" },
  { label: "10:00" },
  { label: "10:30" },
  { label: "11:00" },
  { label: "11:30" },
  { label: "12:00" },
  { label: "12:30" },
  { label: "13:00" },
  { label: "13:30" },
  { label: "14:00" },
  { label: "14:30" },
  { label: "15:00" },
  { label: "15:30" },
  { label: "16:00" },
  { label: "16:30" },
  { label: "17:00" },
  { label: "17:30" },
  { label: "18:00" },
  { label: "18:30" },
  { label: "19:00" },
  { label: "19:30" },
  { label: "20:00" },
  { label: "20:30" },
  { label: "21:00" },
  { label: "21:30" },
  { label: "22:00" },
  { label: "22:30" },
  { label: "23:00" },
  { label: "23:30" },
];
type Day = {
  [x: string]: boolean;
};
export type Days = {
  days1: Day;
  days2?: Day;
  days3?: Day;
};
export function formatOptions(day: Day | undefined) {
  if (!day) return [];
  const options = [];
  for (const [dayOfWeek, value] of Object.entries(day)) {
    if (value) {
      const currentValue = dayOfWeek?.substring(0, dayOfWeek?.length - 1);
      options.push({
        label: daysOptions?.find?.((day) => day.value === currentValue)?.label,
        value: currentValue,
      });
    }
  }
  return options;
}
export function formatDays(array: any, numberOfDay: string) {
  return {
    ["monday" + numberOfDay]: getDayOfWeek(array, "monday" + numberOfDay),
    ["sunday" + numberOfDay]: getDayOfWeek(array, "sunday" + numberOfDay),
    ["tuesday" + numberOfDay]: getDayOfWeek(array, "tuesday" + numberOfDay),
    ["thursday" + numberOfDay]: getDayOfWeek(array, "thursday" + numberOfDay),
    ["friday" + numberOfDay]: getDayOfWeek(array, "friday" + numberOfDay),
    ["wednesday" + numberOfDay]: getDayOfWeek(array, "wednesday" + numberOfDay),
    ["saturday" + numberOfDay]: getDayOfWeek(array, "saturday" + numberOfDay),
  };
}

function getDayOfWeek(array: any, value: string): boolean {
  return !!array?.find?.((item: any) => item?.value === value);
}
