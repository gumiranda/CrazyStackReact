import { useUi } from "shared/libs";
import { SubmitCreateOwnerHandler, useCreateOwnerLib } from "./createOwner.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  CreateOwnerFormData,
  Days,
  HourValidatorInput,
  daysOptions,
  formatDays,
  listHours,
} from "entidades/owner";

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
