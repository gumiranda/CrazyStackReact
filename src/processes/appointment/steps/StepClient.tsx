"use client";
import { useUsersSelect } from "@/features/user/userList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
} from "@/features/client/create/createClient.lib";
import { createClientMutation } from "@/features/client/create/createClient.hook";
import { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, GridForm } from "@/shared/ui";
import { useEditClientLib } from "@/features/client/edit/editClient.lib";

export const StepClient = ({ clientList, userList, setActiveStep }) => {
  const { setRequest = () => {}, request } = useStepRequest();
  const [loading, setLoading] = useState(false);
  const { userSelected, users } = useUsersSelect({ role: "client", userList });
  const { register, handleSubmit, formState, watch, setValue, trigger } =
    useEditClientLib({
      client: request?.clientCreated,
      id: "",
      users: userList?.users,
    });
  const clientName = watch("name");
  useEffect(() => {
    if (clientName) {
      const existingClient = clientList?.clients?.find?.(
        (item) => item?.name === clientName
      );
      if (existingClient?.phone) {
        setValue("phone", existingClient?.phone);
        trigger("phone");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientName]);
  const createClient = createClientMutation(() => {
    setLoading(false);
  }, null);
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    const name = (document.getElementById("name") as HTMLInputElement).value;

    const existingClient = clientList?.clients?.find?.((item) => item?.name === name);
    console.log({ existingClient, values });
    setLoading(true);
    const userId = userSelected ?? users?.[0]?._id ?? userList?.[0]?._id ?? "";
    const payload = { ...values, clientUserId: userId, userId, active: true };
    if (existingClient?._id) {
      setRequest((prev) => ({ ...prev, ...payload, clientCreated: existingClient }));
      setActiveStep(1);
      return;
    }
    await createClient.mutateAsync(payload);
    setRequest((prev) => ({ ...prev, ...payload }));
  };
  useEffect(() => {
    if (createClient?.data) {
      setRequest((prev) => ({ ...prev, clientCreated: createClient?.data }));
      setActiveStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createClient?.data]);
  return (
    <>
      <Box
        bg="white"
        flex="1"
        p={["0", "2", "3", "4"]}
        as="form"
        onSubmit={handleSubmit(handleCreateClient)}
        id="clientFormId"
      >
        <GridForm>
          <FormControl
            label="Nome do(a) cliente"
            error={formState.errors.name}
            labelColor="gray.800"
            inputBgColor="gray.800"
            bgColor="gray.100"
            bgColorHover="gray.50"
            autoCompleteProps={{
              list:
                clientList?.clients?.map?.((item) => ({
                  value: item._id,
                  label: item.name,
                })) ?? [],
              placeholder: "",
              listStyleProps: { backgroundColor: "gray.100", color: "black" },
              listItemStyleProps: { backgroundColor: "gray.100", color: "black" },
              highlightItemBg: "gray.200",
            }}
            {...register("name")}
          />
          <FormControl
            label="Telefone"
            error={formState.errors.phone}
            labelColor="gray.800"
            bgColor="gray.100"
            bgColorHover="gray.50"
            type="tel"
            mask="(99) 99999-9999"
            {...register("phone")}
          />
        </GridForm>
      </Box>
      <Flex justifyContent={"flex-end"} mt={10}>
        <Button colorScheme="purple" m={2}>
          Voltar
        </Button>
        <Button
          colorScheme="tertiary"
          type="submit"
          form="clientFormId"
          isLoading={loading}
          m={2}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};
