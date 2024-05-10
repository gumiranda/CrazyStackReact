import { useUi } from "@/shared/libs";
import { EditOwnerFormProps } from "./EditOwnerForm";
import { SubmitEditOwnerHandler, useEditOwnerLib } from "./editOwner.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  HourValidatorInput,
  formatDays,
  Days,
  daysOptions,
  listHours,
  EditOwnerFormData,
} from "@/slices/appointments/entidades/owner";
import { useTranslation } from "react-i18next";

export const useEditOwner = (props: EditOwnerFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const { owner: currentOwner, id, users } = props;
  const [haveAlternativeHour, setHaveAlternativeHour] = useState(
    !!currentOwner?.hourStart2
  );
  const [haveAlternativeHour2, setHaveAlternativeHour2] = useState(
    !!currentOwner?.hourStart3
  );
  const [haveLunchTime1, setHaveLunchTime1] = useState(!!currentOwner?.hourLunchStart1);
  const [haveLunchTime2, setHaveLunchTime2] = useState(!!currentOwner?.hourLunchStart2);
  const [haveLunchTime3, setHaveLunchTime3] = useState(!!currentOwner?.hourLunchStart2);
  const [hourWork, setHourWork] = useState<HourValidatorInput>({
    hourStart1: currentOwner?.hourStart1 ?? "8:00",
    hourEnd1: currentOwner?.hourEnd1 ?? "18:00",
    hourLunchEnd1: currentOwner?.hourLunchEnd1,
    hourLunchStart1: currentOwner?.hourLunchStart1,
    hourStart2: currentOwner?.hourStart2,
    hourEnd2: currentOwner?.hourEnd2,
    hourLunchEnd2: currentOwner?.hourLunchEnd2,
    hourLunchStart2: currentOwner?.hourLunchStart2,
    hourStart3: currentOwner?.hourStart3,
    hourEnd3: currentOwner?.hourEnd3,
    hourLunchEnd3: currentOwner?.hourLunchEnd3,
    hourLunchStart3: currentOwner?.hourLunchStart3,
  });
  const router = useRouter();
  const editOwner = useMutation({
    mutationFn: async (owner: EditOwnerFormData & HourValidatorInput & Days) => {
      try {
        const { data } = await api.patch(`/owner/update?_id=${currentOwner?._id ?? id}`, {
          ...owner,
          updatedAt: new Date(),
        });
        if (!data) {
          showModal({
            content: t("PAGES:MESSAGES.errorMessage", {
              defaultValue:
                "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            }),
            title: t("PAGES:MESSAGES.internalServerError", {
              defaultValue: "Erro no servidor",
            }),
            type: "error",
          });
          return;
        }
        showModal({
          content: t("PAGES:MESSAGES.successMessage", {
            domain: t("PAGES:HOME_PAGE.owner", {
              defaultValue: "Estabelecimento",
            }),
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editada",
            }),
            defaultValue:
              "Estabelecimento editada com sucesso, você será redirecionado para a lista de estabelecimentos",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/owners/1");
        return data;
      } catch (error) {
        showModal({
          content: t("PAGES:MESSAGES.errorMessage", {
            defaultValue:
              "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          }),
          title: t("PAGES:MESSAGES.internalServerError", {
            defaultValue: "Erro no servidor",
          }),
          type: "error",
        });
      }
    },
  });
  const { register, handleSubmit, formState, control } = useEditOwnerLib(props);
  const handleEditOwner: SubmitEditOwnerHandler = async (values: EditOwnerFormData) => {
    await editOwner.mutateAsync({
      ...hourWork,
      ...values,
      days1: formatDays(values?.days1Options, "1"),
      days2: formatDays(values?.days2Options, "2"),
      days3: formatDays(values?.days3Options, "3"),
    });
  };
  const daysOptions1 = daysOptions
    .map((item) => ({ ...item, value: item?.value + "1" }))
    ?.filter?.(
      (item) => currentOwner?.days1?.[item?.value] === false || !currentOwner?.days1
    );
  const daysOptions2 = daysOptions
    .map((item) => ({ ...item, value: item?.value + "2" }))
    ?.filter?.(
      (item) => currentOwner?.days2?.[item?.value] === false || !currentOwner?.days2
    );
  const daysOptions3 = daysOptions
    .map((item) => ({ ...item, value: item?.value + "3" }))
    ?.filter?.(
      (item) => currentOwner?.days3?.[item?.value] === false || !currentOwner?.days3
    );
  const changeHour = (event: any, nameField: string) => {
    event.preventDefault();
    setHourWork((prev) => ({ ...prev, [nameField]: event.target.value }));
  };
  return {
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
  };
};
