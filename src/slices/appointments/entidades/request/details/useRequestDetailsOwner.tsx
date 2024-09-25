import { useGetClientById } from "@/slices/appointments/entidades/client/client.lib";
import { useGetServiceById } from "@/slices/appointments/entidades/service/service.lib";
import { editRequestMutation } from "@/slices/appointments/features/request/edit/editRequest.hook";
import { api } from "@/shared/api";
import { useUi } from "@/shared/libs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const useRequestDetailsOwner = ({ serviceId, clientId, currentRequest }) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const router = useRouter();
  const { data: service } = useGetServiceById(serviceId);
  const { data: client } = useGetClientById(clientId);
  const onSuccess = () => {
    router.push("/home");
  };
  const onError = () => {
    showModal({
      type: "error",
      title: t("PAGES:MESSAGES.internalServerError", {
        defaultValue: "Erro no servidor",
      }),
      message: t("PAGES:MESSAGES.errorMessage", {
        defaultValue:
          "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
      }),
    });
  };
  const editRequest = editRequestMutation({
    currentRequest,
    showModal,
    routeRedirect: "/home",
    content: t("PAGES:NEW_APPOINTMENT.confirmMessage", {
      defaultValue:
        "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    }),
    router,
    t,
  });
  const deleteRequest = useMutation({
    mutationFn: async (requestsToDelete: any = []) => {
      try {
        if (requestsToDelete?.length > 0) {
          return Promise.all(
            requestsToDelete?.map?.((request: any) =>
              Promise.all([api.delete(`/appointment/delete?requestId=${request._id}`)])
            )
          );
        }
        return null;
      } catch (error) {
        onError();
      }
    },
    onSuccess,
    onError,
    retry: 3,
  } as any);
  const deleteSelectedAction = async (item) => {
    deleteRequest.mutateAsync([item] as any);
  };
  const updateRequest = async (newRequest) => {
    await editRequest.mutateAsync(newRequest as any);
  };
  return { service, client, deleteSelectedAction, updateRequest, editRequest };
};
