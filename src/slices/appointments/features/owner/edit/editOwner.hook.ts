"use client";
import { useUi } from "@/shared/libs";
import { EditOwnerFormProps } from "./EditOwnerForm";
import { SubmitEditOwnerHandler, useEditOwnerLib } from "./editOwner.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const daysOptions1 =
    daysOptions?.map?.((item) => ({
      ...item,
      value: item?.value + "1",
    })) ?? [];

  const daysOptions2 =
    daysOptions?.map?.((item) => ({
      ...item,
      value: item?.value + "2",
    })) ?? [];

  const daysOptions3 =
    daysOptions?.map?.((item) => ({
      ...item,
      value: item?.value + "3",
    })) ?? [];

  const daysOptionsSelected1 = daysOptions1?.filter?.(
    (item) => currentOwner?.days1?.[item?.value] === true
  );
  const daysOptionsSelected2 = daysOptions2?.filter?.(
    (item) => currentOwner?.days2?.[item?.value] === true
  );
  const daysOptionsSelected3 = daysOptions3?.filter?.(
    (item) => currentOwner?.days3?.[item?.value] === true
  );
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
    days1: daysOptionsSelected1?.map?.((item) => item?.value),
    days2: daysOptionsSelected2?.map?.((item) => item?.value),
    days3: daysOptionsSelected3?.map?.((item) => item?.value),
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
      days1: {
        monday1: !!hourWork?.days1?.includes?.("monday1"),
        tuesday1: !!hourWork?.days1?.includes?.("tuesday1"),
        wednesday1: !!hourWork?.days1?.includes?.("wednesday1"),
        thursday1: !!hourWork?.days1?.includes?.("thursday1"),
        friday1: !!hourWork?.days1?.includes?.("friday1"),
        saturday1: !!hourWork?.days1?.includes?.("saturday1"),
        sunday1: !!hourWork?.days1?.includes?.("sunday1"),
      },
      days2: {
        monday2: !!hourWork?.days2?.includes?.("monday2"),
        tuesday2: !!hourWork?.days2?.includes?.("tuesday2"),
        wednesday2: !!hourWork?.days2?.includes?.("wednesday2"),
        thursday2: !!hourWork?.days2?.includes?.("thursday2"),
        friday2: !!hourWork?.days2?.includes?.("friday2"),
        saturday2: !!hourWork?.days2?.includes?.("saturday2"),
        sunday2: !!hourWork?.days2?.includes?.("sunday2"),
      },
      days3: {
        monday3: !!hourWork?.days3?.includes?.("monday3"),
        tuesday3: !!hourWork?.days3?.includes?.("tuesday3"),
        wednesday3: !!hourWork?.days3?.includes?.("wednesday3"),
        thursday3: !!hourWork?.days3?.includes?.("thursday3"),
        friday3: !!hourWork?.days3?.includes?.("friday3"),
        saturday3: !!hourWork?.days3?.includes?.("saturday3"),
        sunday3: !!hourWork?.days3?.includes?.("sunday3"),
      },
    });
  };

  const changeHour = (event: any, nameField: string) => {
    setHourWork((prev) => ({ ...prev, [nameField]: event.target.value }));
  };
  useEffect(() => {
    if (!haveLunchTime1) {
      setHourWork((prev) => ({
        ...prev,
        hourLunchStart1: null,
        hourLunchEnd1: null,
      }));
    }
    if (!haveLunchTime2) {
      setHourWork((prev) => ({
        ...prev,
        hourLunchStart2: null,
        hourLunchEnd2: null,
      }));
    }
    if (!haveLunchTime3) {
      setHourWork((prev) => ({
        ...prev,
        hourLunchStart3: null,
        hourLunchEnd3: null,
      }));
    }
    if (!haveAlternativeHour) {
      setHourWork((prev) => ({
        ...prev,
        hourStart2: null,
        hourEnd2: null,
      }));
    }
    if (!haveAlternativeHour2) {
      setHourWork((prev) => ({
        ...prev,
        hourStart3: null,
        hourEnd3: null,
      }));
    }
  }, [
    haveLunchTime1,
    haveLunchTime2,
    haveLunchTime3,
    haveAlternativeHour,
    haveAlternativeHour2,
  ]);
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
    daysOptionsSelected1,
    daysOptionsSelected2,
    daysOptionsSelected3,
  };
};
