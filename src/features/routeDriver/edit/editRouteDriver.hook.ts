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
export const useEditRouteDriver = (props: EditRouteDriverFormProps) => {
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
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content:
            "Corrida editada com sucesso, você será redirecionado para a lista de corridas",
          title: "Sucesso",
          type: "success",
        });
        router.push("/routeDrivers/1");
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
  const { register, handleSubmit, formState } = useEditRouteDriverLib(props);
  const handleEditRouteDriver: SubmitEditRouteDriverHandler = async (
    values: EditRouteDriverFormData
  ) => {
    await editRouteDriver.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditRouteDriver };
};
