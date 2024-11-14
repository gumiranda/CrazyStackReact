"use client";
import { Checkbox, Select } from "@/shared/ui";
import { useTranslation } from "react-i18next";

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
  days1?: any;
  days2?: any;
  days3?: any;
};

export interface DaysOptions {
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
    flagDependent?: boolean;
    valueHourStart: string;
    onChangeHourStart: any;
    valueHourLunchStart: string;
    onChangeHourLunchStart: any;
    valueHourLunchEnd: string;
    onChangeHourLunchEnd: any;
    valueHourEnd: string;
    onChangeHourEnd: any;
    onChangedays: any;
    valueDays: any;
    defaultValueDays: any;
  };
};

type HourWorkProps = {
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
  daysOptionsSelected1: any;
  daysOptionsSelected2: any;
  daysOptionsSelected3: any;
};
type HourWorksInput = {
  props: HourWorkProps;
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
    daysOptionsSelected1,
    daysOptionsSelected2,
    daysOptionsSelected3,
  },
}: HourWorksInput) => {
  const {
    onChangehourStart1,
    onChangehourEnd1,
    onChangehourLunchStart1,
    onChangehourLunchEnd1,
    onChangehourStart2,
    onChangehourEnd2,
    onChangehourLunchStart2,
    onChangehourLunchEnd2,
    onChangehourStart3,
    onChangehourEnd3,
    onChangehourLunchStart3,
    onChangehourLunchEnd3,
    onChangedays1,
    onChangedays2,
    onChangedays3,
  } = useOnChanges({ changeHour });
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <HourWorkForm
        props={{
          labelDayWork: t("PAGES:FIELDS.daysOfHourWorked", {
            defaultValue: "Dias de funcionamento 1",
          }),
          labelHourStart: t("PAGES:FIELDS.hourInit", {
            defaultValue: "Hora de início",
          }),
          labelHourEnd: t("PAGES:FIELDS.hourEnd", {
            defaultValue: "Hora de término",
          }),
          labelHourLunchStart: t("PAGES:FIELDS.lunchTimeInit", {
            defaultValue: "Hora de início do almoço",
          }),
          labelHourLunchEnd: t("PAGES:FIELDS.lunchTimeEnd", {
            defaultValue: "Hora de término do almoço",
          }),
          control,
          daysOptions: daysOptions1,
          listHours,
          daysOptionsName: "days1Options",
          flagDependent: haveLunchTime1,
          valueHourStart: hourWork.hourStart1,
          onChangeHourStart: onChangehourStart1,
          valueHourLunchStart: hourWork.hourLunchStart1,
          onChangeHourLunchStart: onChangehourLunchStart1,
          valueHourLunchEnd: hourWork.hourLunchEnd1,
          onChangeHourLunchEnd: onChangehourLunchEnd1,
          valueHourEnd: hourWork.hourEnd1,
          onChangeHourEnd: onChangehourEnd1,
          onChangedays: onChangedays1,
          valueDays: hourWork.days1,
          defaultValueDays: daysOptionsSelected1,
        }}
      />
      <Checkbox
        colorPalette={"tertiary"}
        checked={haveLunchTime1}
        label={t("PAGES:FIELDS.haveLunchTime", {
          defaultValue: "Possui horário de almoço?",
        })}
        onChange={(e) => {
          e.preventDefault();
          setHaveLunchTime1(e.target.checked);
        }}
        children={undefined}
      />
      <Checkbox
        colorPalette={"tertiary"}
        checked={haveAlternativeHour}
        label={t("PAGES:FIELDS.haveAlternativeDaysWorked", {
          defaultValue: "Possui horário alternativo?",
        })}
        onChange={(e) => {
          e.preventDefault();
          setHaveAlternativeHour(e.target.checked);
        }}
      />
      {haveAlternativeHour && (
        <>
          <HourWorkForm
            props={{
              labelDayWork: t("PAGES:FIELDS.daysOfHourWorked2", {
                defaultValue: "Dias de funcionamento 2",
              }),
              labelHourStart: t("PAGES:FIELDS.hourInit", {
                defaultValue: "Hora de início",
              }),
              labelHourEnd: t("PAGES:FIELDS.hourEnd", {
                defaultValue: "Hora de término",
              }),
              labelHourLunchStart: t("PAGES:FIELDS.lunchTimeInit", {
                defaultValue: "Hora de início do almoço",
              }),
              labelHourLunchEnd: t("PAGES:FIELDS.lunchTimeEnd", {
                defaultValue: "Hora de término do almoço",
              }),
              control,
              daysOptions: daysOptions2,
              listHours,
              daysOptionsName: "days2Options",
              flagDependent: haveLunchTime2,
              valueHourStart: hourWork.hourStart2,
              onChangeHourStart: onChangehourStart2,
              valueHourLunchStart: hourWork.hourLunchStart2,
              onChangeHourLunchStart: onChangehourLunchStart2,
              valueHourLunchEnd: hourWork.hourLunchEnd2,
              onChangeHourLunchEnd: onChangehourLunchEnd2,
              valueHourEnd: hourWork.hourEnd2,
              onChangeHourEnd: onChangehourEnd2,
              onChangedays: onChangedays2,
              valueDays: hourWork.days2,
              defaultValueDays: daysOptionsSelected2,
            }}
          />
          <Checkbox
            colorPalette={"tertiary"}
            checked={haveLunchTime2}
            label={t("PAGES:FIELDS.haveLunchTime", {
              defaultValue: "Possui horário de almoço?",
            })}
            onChange={(e) => {
              e.preventDefault();
              setHaveLunchTime2(e.target.checked);
            }}
            children={undefined}
          />
          <Checkbox
            colorPalette={"tertiary"}
            checked={haveAlternativeHour2}
            label={t("PAGES:FIELDS.haveAnotherAlternativeDaysWorked", {
              defaultValue: "Possui horário alternativo?",
            })}
            onChange={(e) => {
              e.preventDefault();
              setHaveAlternativeHour2(e.target.checked);
            }}
          />
          {haveAlternativeHour2 && (
            <>
              <HourWorkForm
                props={{
                  labelDayWork: t("PAGES:FIELDS.daysOfHourWorked3", {
                    defaultValue: "Dias de funcionamento 3",
                  }),
                  labelHourStart: t("PAGES:FIELDS.hourInit", {
                    defaultValue: "Hora de início",
                  }),
                  labelHourEnd: t("PAGES:FIELDS.hourEnd", {
                    defaultValue: "Hora de término",
                  }),
                  labelHourLunchStart: t("PAGES:FIELDS.lunchTimeInit", {
                    defaultValue: "Hora de início do almoço",
                  }),
                  labelHourLunchEnd: t("PAGES:FIELDS.lunchTimeEnd", {
                    defaultValue: "Hora de término do almoço",
                  }),
                  control,
                  daysOptions: daysOptions3,
                  listHours,
                  daysOptionsName: "days3Options",
                  flagDependent: haveLunchTime3,
                  valueHourStart: hourWork.hourStart3,
                  onChangeHourStart: onChangehourStart3,
                  valueHourLunchStart: hourWork.hourLunchStart3,
                  onChangeHourLunchStart: onChangehourLunchStart3,
                  valueHourLunchEnd: hourWork.hourLunchEnd3,
                  onChangeHourLunchEnd: onChangehourLunchEnd3,
                  valueHourEnd: hourWork.hourEnd3,
                  onChangeHourEnd: onChangehourEnd3,
                  onChangedays: onChangedays3,
                  valueDays: hourWork.days3,
                  defaultValueDays: daysOptionsSelected3,
                }}
              />
              <Checkbox
                colorPalette={"tertiary"}
                checked={haveLunchTime3}
                label={t("PAGES:FIELDS.haveAnotherAlternativeLunchTimeDaysWorked", {
                  defaultValue: "Possui horário de almoço alternativo?",
                })}
                onChange={(e) => {
                  e.preventDefault();
                  setHaveLunchTime3(e.target.checked);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
const useOnChanges = ({ changeHour }: any) => {
  const createOnChange = (field: string) => (event: any) => changeHour(event, field);
  const fields = [
    "hourStart1",
    "hourEnd1",
    "hourLunchStart1",
    "hourLunchEnd1",
    "hourStart2",
    "hourEnd2",
    "hourLunchStart2",
    "hourLunchEnd2",
    "hourStart3",
    "hourEnd3",
    "hourLunchStart3",
    "hourLunchEnd3",
    "days1",
    "days2",
    "days3",
  ];
  const onChange = fields.reduce((acc: any, field) => {
    acc[`onChange${field}`] = createOnChange(field);
    return acc;
  }, {});
  return onChange;
};
export const HourWorkForm = ({
  props: {
    labelDayWork = "Dias de funcionamento 1",
    labelHourStart = "Horário de abertura 1",
    labelHourEnd = "Horário de fechamento 1",
    labelHourLunchStart = "Horário de almoço 1",
    labelHourLunchEnd = "Horário de retorno do almoço 1",
    control,
    daysOptions,
    listHours,
    daysOptionsName = "days1Options",
    flagDependent = false,
    valueHourStart,
    onChangeHourStart,
    valueHourLunchStart,
    onChangeHourLunchStart,
    valueHourLunchEnd,
    onChangeHourLunchEnd,
    valueHourEnd,
    onChangeHourEnd,
    onChangedays,
    valueDays,
    defaultValueDays,
  },
}: HourWorkFormInput) => {
  return (
    <>
      <Select
        bg="secondary.500"
        list={daysOptions}
        onChange={onChangedays}
        multiple
        control={control as any}
        label={labelDayWork}
        name={daysOptionsName}
        placeholder="Selecione pelo menos 1 dia"
        keyValue="value"
        keyLabel="label"
        value={valueDays}
        //defaultValue={defaultValueDays?.map?.((item: any) => item?.value) ?? null}
      />
      <Select
        bg="secondary.500"
        name="openHour"
        label={labelHourStart}
        value={valueHourStart}
        list={listHours}
        keyValue="label"
        keyLabel="label"
        onChange={onChangeHourStart}
      />
      <Select
        bg="secondary.500"
        name="endHour"
        label={labelHourEnd}
        value={valueHourEnd}
        list={listHours}
        keyValue="label"
        keyLabel="label"
        onChange={onChangeHourEnd}
      />
      {flagDependent && (
        <>
          <Select
            bg="secondary.500"
            name="openHourLunch"
            label={labelHourLunchStart}
            value={valueHourLunchStart}
            list={listHours}
            keyValue="label"
            keyLabel="label"
            onChange={onChangeHourLunchStart}
          />
          <Select
            bg="secondary.500"
            name="endHourLunch"
            label={labelHourLunchEnd}
            value={valueHourLunchEnd}
            list={listHours}
            keyValue="label"
            keyLabel="label"
            onChange={onChangeHourLunchEnd}
          />
        </>
      )}
    </>
  );
};
export const daysOptions = [
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
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
  const options: any = [];
  for (const [dayOfWeek, value] of Object.entries(day)) {
    if (value) {
      const currentValue = dayOfWeek?.substring(0, dayOfWeek?.length - 1);
      options.push({
        label: daysOptions?.find?.((day) => day?.value === currentValue)?.label,
        value: dayOfWeek,
      });
    }
  }
  return options;
}
export function formatDays(array: any, numberOfDay: string) {
  return {
    ["monday" + numberOfDay]: getDayOfWeek(array, "monday" + numberOfDay),
    ["tuesday" + numberOfDay]: getDayOfWeek(array, "tuesday" + numberOfDay),
    ["wednesday" + numberOfDay]: getDayOfWeek(array, "wednesday" + numberOfDay),
    ["thursday" + numberOfDay]: getDayOfWeek(array, "thursday" + numberOfDay),
    ["friday" + numberOfDay]: getDayOfWeek(array, "friday" + numberOfDay),
    ["saturday" + numberOfDay]: getDayOfWeek(array, "saturday" + numberOfDay),
    ["sunday" + numberOfDay]: getDayOfWeek(array, "sunday" + numberOfDay),
  };
}
function getDayOfWeek(array: any, value: string): boolean {
  return !!array?.find?.((item: any) => item?.value === value);
}
