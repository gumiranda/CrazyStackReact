import { useUi } from "shared/libs";
import {
  CreateOwnerFormData,
  SubmitCreateOwnerHandler,
  useCreateOwnerLib,
} from "./createOwner.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
  const [haveLunchTime, setHaveLunchTime] = useState(false);
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
  const { register, handleSubmit, formState } = useCreateOwnerLib();
  const handleCreateOwner: SubmitCreateOwnerHandler = async (
    values: CreateOwnerFormData
  ) => {
    await createOwner.mutateAsync({
      ...values,
      ...hourWork,
      days1: {
        monday1: false,
        sunday1: false,
        tuesday1: false,
        thursday1: false,
        friday1: false,
        wednesday1: false,
        saturday1: false,
      },
      haveDelivery: false,
    });
  };
  const changeHour = (event: any, nameField: string) => {
    event.preventDefault();
    setHourWork((prev) => ({ ...prev, [nameField]: event.target.value }));
  };

  return {
    formState,
    register,
    handleSubmit,
    handleCreateOwner,
    haveLunchTime,
    setHaveLunchTime,
    hourWork,
    setHourWork,
    changeHour,
    listHours,
  };
};
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
    monday1: boolean;
    sunday1: boolean;
    tuesday1: boolean;
    thursday1: boolean;
    friday1: boolean;
    wednesday1: boolean;
    saturday1: boolean;
  };
  days2?: {
    monday2: boolean;
    sunday2: boolean;
    tuesday2: boolean;
    thursday2: boolean;
    friday2: boolean;
    wednesday2: boolean;
    saturday2: boolean;
  };
  days3?: {
    monday3: boolean;
    sunday3: boolean;
    tuesday3: boolean;
    thursday3: boolean;
    friday3: boolean;
    wednesday3: boolean;
    saturday3: boolean;
  };
};
