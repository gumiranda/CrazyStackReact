"use client";
import { useUsersSelect } from "@/slices/general/features/user/userList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
} from "@/slices/appointments/features/client/create/createClient.lib";
import { createClientMutation } from "@/slices/appointments/features/client/create/createClient.hook";
import { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, GridForm } from "@/shared/ui";
import { useEditClientLib } from "@/slices/appointments/features/client/edit/editClient.lib";
import { useTranslation } from "react-i18next";

export const StepClient = ({ clientList, userList, setActiveStep, ownerSelected }) => {
  const { t } = useTranslation(["PAGES"]);
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
      triggerPhoneClient(existingClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientName]);
  const triggerPhoneClient = (currentClient) => {
    if (currentClient?.phone) {
      setValue("phone", currentClient?.phone);
      setValue("name", currentClient?.name);
      trigger("phone");
      trigger("name");
    }
  };
  const createClient = createClientMutation(
    () => {
      setLoading?.(false);
    },
    null,
    t
  );
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    const existingClient = clientList?.clients?.find?.(
      (item) => item?.name === values.name
    );

    setLoading(true);
    const userId = userSelected ?? users?.[0]?._id ?? userList?.[0]?._id ?? "";
    const payload = {
      ...values,
      clientUserId: userId,
      userId,
      active: true,
      ownerId: ownerSelected?._id,
      myOwnerId: ownerSelected?.createdById,
    };
    if (existingClient?._id) {
      setRequest((prev) => ({
        ...prev,
        ...payload,
        clientCreated: existingClient,
      }));
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
            label={t("PAGES:NEW_APPOINTMENT.nameClient", {
              defaultValue: "Nome do(a) cliente",
            })}
            error={formState.errors.name}
            labelColor="gray.800"
            inputBgColor="gray.800"
            bgColor="gray.100"
            autoCompleteProps={{
              list:
                clientList?.clients?.map?.((item) => ({
                  value: item._id,
                  label: item.name,
                })) ?? [],
              placeholder: "",
              listStyleProps: { bgColor: "gray.100", color: "black" },
              listItemStyleProps: {
                bgColor: "gray.100",
                color: "black",
                onClick: (clientSelected) => {
                  const existingClient = clientList?.clients?.find?.(
                    (item) => item?._id === clientSelected?.value
                  );
                  triggerPhoneClient(existingClient);
                },
              },
              highlightItemBg: "gray.200",
            }}
            {...register("name")}
          />
          <FormControl
            label={t("PAGES:NEW_APPOINTMENT.phone", {
              defaultValue: "Telefone do(a) cliente",
            })}
            error={formState.errors.phone}
            labelColor="gray.800"
            bgColor="gray.100"
            bgColorHover="gray.50"
            type="tel"
            mask="(__) _____-____"
            {...register("phone")}
          />
        </GridForm>
      </Box>
      <Flex justifyContent={"flex-end"} mt={10}>
        <Button colorPalette="purple" m={2}>
          {t("PAGES:NEW_APPOINTMENT.back", {
            defaultValue: "Voltar",
          })}
        </Button>
        <Button colorPalette="tertiary" type="submit" form="clientFormId" m={2}>
          {t("PAGES:NEW_APPOINTMENT.next", {
            defaultValue: "Próximo",
          })}
        </Button>
      </Flex>
    </>
  );
};
