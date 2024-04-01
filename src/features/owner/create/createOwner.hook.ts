import { useUi } from "@/shared/libs";
import { SubmitCreateOwnerHandler, useCreateOwnerLib } from "./createOwner.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  CreateOwnerFormData,
  Days,
  HourValidatorInput,
  daysOptions,
  formatDays,
  listHours,
} from "@/entidades/owner";
export const useCreateOwner = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [haveAlternativeHour, setHaveAlternativeHour] = useState(false);
  const [haveAlternativeHour2, setHaveAlternativeHour2] = useState(false);
  const [haveLunchTime1, setHaveLunchTime1] = useState(false);
  const [haveLunchTime2, setHaveLunchTime2] = useState(false);
  const [haveLunchTime3, setHaveLunchTime3] = useState(false);
  const [hourWork, setHourWork] = useState<HourValidatorInput>({
    hourStart1: "08:00",
    hourEnd1: "18:00",
    hourStart2: "08:00",
    hourEnd2: "18:00",
    hourStart3: "08:00",
    hourEnd3: "18:00",
  });
  const createOwner = useMutation({
    mutationFn: async (owner: CreateOwnerFormData & HourValidatorInput & Days) => {
      try {
        const { data } = await api.post("/owner/add", {
          ...owner,
          active: true,
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
  });
  const { register, handleSubmit, formState, control } = useCreateOwnerLib();
  const handleCreateOwner: SubmitCreateOwnerHandler = async (
    values: CreateOwnerFormData
  ) => {
    await createOwner.mutateAsync({
      ...values,
      ...hourWork,
      hourLunchStart1: applyDefaultLunchTime(haveLunchTime1, hourWork?.hourLunchStart1),
      hourLunchEnd1: applyDefaultLunchTime(haveLunchTime1, hourWork?.hourLunchEnd1),
      hourLunchStart2: applyDefaultLunchTime(haveLunchTime2, hourWork?.hourLunchStart2),
      hourLunchEnd2: applyDefaultLunchTime(haveLunchTime2, hourWork?.hourLunchEnd2),
      hourLunchStart3: applyDefaultLunchTime(haveLunchTime3, hourWork?.hourLunchStart3),
      hourLunchEnd3: applyDefaultLunchTime(haveLunchTime3, hourWork?.hourLunchEnd3),
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
  const daysOptions1 = daysOptions.map((item) => ({
    ...item,
    value: item?.value + "1",
  }));
  const daysOptions2 = daysOptions.map((item) => ({
    ...item,
    value: item?.value + "2",
  }));
  const daysOptions3 = daysOptions.map((item) => ({
    ...item,
    value: item?.value + "3",
  }));
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
  };
};
function applyDefaultLunchTime(haveLunchTime: boolean, field: string | undefined) {
  if (!haveLunchTime) {
    return;
  }
  if (!field) {
    return "7:00";
  }
  return field;
}
