import { useUi } from "@/shared/libs";
import { EditRouteDriverFormProps } from "./EditRouteDriverForm";
import {
  EditRouteDriverFormData,
  SubmitEditRouteDriverHandler,
  useEditRouteDriverLib,
} from "./editRouteDriver.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useEditRouteDriver = (props: EditRouteDriverFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const { routeDriver: currentRouteDriver } = props;
  const router = useRouter();
  const editRouteDriver = useMutation({
    mutationFn: async (routeDriver: EditRouteDriverFormData) => {
      try {
        const { data } = await api.patch(
          `/routeDriver/update?routeId=${currentRouteDriver.routeId}&lat=-33.8689604&lng=151.2092021`,
          {
            ...routeDriver,
            updatedAt: new Date(),
          }
        );
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
            domain: t("PAGES:HOME_PAGE.ride", {
              defaultValue: "Corrida",
            }),
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editada",
            }),
            defaultValue:
              "Corrida editada com sucesso, você será redirecionado para a lista de corridas",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/routeDrivers/1");
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
  const { register, handleSubmit, formState } = useEditRouteDriverLib(props);
  const handleEditRouteDriver: SubmitEditRouteDriverHandler = async (
    values: EditRouteDriverFormData
  ) => {
    await editRouteDriver.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditRouteDriver };
};
