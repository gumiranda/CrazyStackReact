import { useUi } from "shared/libs";
import { SubmitCreateOwnerHandler, useCreateOwnerLib } from "./createOwner.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CreateOwnerFormData } from "entidades/owner";
type HourValidatorInput = {
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

export const useCreateOwner = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [haveAlternativeHour, setHaveAlternativeHour] = useState(false);
  const [haveAlternativeHour2, setHaveAlternativeHour2] = useState(false);
  const [haveLunchTime1, setHaveLunchTime1] = useState(false);
  const [haveLunchTime2, setHaveLunchTime2] = useState(false);
  const [haveLunchTime3, setHaveLunchTime3] = useState(false);
  const [hourWork, setHourWork] = useState<HourValidatorInput>({
    hourStart1: "8:00",
    hourEnd1: "18:00",
  });
  const createOwner = useMutation(
    async (owner: CreateOwnerFormData & HourValidatorInput & Days) => {
      try {
        const { data } = await api.post("/owner/add", {
          ...owner,
        });
        if (!data) {
          showModal({
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content:
            "Estabelecimento criada com sucesso, você será redirecionado para a lista de estabelecimentos",
          title: "Sucesso",
          type: "success",
        });
        router.push("/owners/1");
        return data;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {}
  );
  const { register, handleSubmit, formState, control } = useCreateOwnerLib();
  const handleCreateOwner: SubmitCreateOwnerHandler = async (
    values: CreateOwnerFormData
  ) => {
    await createOwner.mutateAsync({
      ...values,
      ...hourWork,
      days1: formatDays(values?.days1Options, "1"),
      days2: formatDays(values?.days2Options, "2"),
      days3: formatDays(values?.days3Options, "3"),
      haveDelivery: false,
    });
  };
  const changeHour = (event: any, nameField: string) => {
    event.preventDefault();
    setHourWork((prev) => ({ ...prev, [nameField]: event.target.value }));
  };
  const daysOptions1 = daysOptions.map((item) => ({ ...item, value: item?.value + "1" }));
  const daysOptions2 = daysOptions.map((item) => ({ ...item, value: item?.value + "2" }));
  const daysOptions3 = daysOptions.map((item) => ({ ...item, value: item?.value + "3" }));
  return {
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
    hourWork,
    setHourWork,
    changeHour,
    listHours,
    daysOptions1,
    daysOptions2,
    daysOptions3,
    control,
    haveAlternativeHour,
    setHaveAlternativeHour,
    haveAlternativeHour2,
    setHaveAlternativeHour2,
  };
};
const daysOptions = [
  { label: "Segunda-feira", value: "monday" },
  { label: "Terça-feira", value: "tuesday" },
  { label: "Quarta-feira", value: "wednesday" },
  { label: "Quinta-feira", value: "thursday" },
  { label: "Sexta-feira", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];
const listHours = [
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
type Days = {
  days1: {
    [x: string]: boolean;
  };
  days2?: {
    [x: string]: boolean;
  };
  days3?: {
    [x: string]: boolean;
  };
};
function formatDays(array: any, numberOfDay: string) {
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
