import { useServiceListMultiple } from "@/features/user/serviceListMultiple";
import { useOwnersSelect } from "@/features/owner/ownerList.hook";
import { useUi } from "@/shared/libs";
import { EditUserFormProps } from "./EditUserForm";
import { EditUserFormData, SubmitEditUserHandler, useEditUserLib } from "./editUser.lib";
import { useRouter } from "next/router";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { OwnerProps } from "@/entidades/owner";
export const useEditUser = (props: EditUserFormProps) => {
  const { showModal } = useUi();
  const { user: currentUser, serviceList, ownerList } = props;
  const router = useRouter();
  const { serviceOptions, services, prevServiceOptions } = useServiceListMultiple({
    serviceList,
    prevServicesSelected: currentUser?.serviceIds,
  });
  const { ownerSelected, handleChangeOwnerSelected, owners } = useOwnersSelect({
    ownerList,
    currentUser,
  });
  const editUser = useMutation(async (user: EditUserFormData) => {
    try {
      const { data } = await api.patch(`/user/update?_id=${currentUser._id}`, {
        ...user,
        updatedAt: new Date(),
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
          "Profissional editada com sucesso, você será redirecionado para a lista de profissionais",
        title: "Sucesso",
        type: "success",
      });
      router.push("/users/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState, control } = useEditUserLib({
    ...props,
    services,
    prevServiceOptions,
  });
  const handleEditUser: SubmitEditUserHandler = async (values: EditUserFormData) => {
    await editUser.mutateAsync({
      ...values,
      serviceIds: values?.serviceOptions?.map?.((service) => service?.value),
      ownerId: ownerSelected,
      myOwnerId: owners?.find?.((owner: OwnerProps) => owner?._id === ownerSelected)?._id,
      role: "professional",
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleEditUser,
    serviceOptions,
    control,
    services,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
  };
};
