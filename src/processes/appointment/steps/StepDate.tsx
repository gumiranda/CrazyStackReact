import {
  Box,
  Button,
  DatePicker,
  Flex,
  FormControl,
  GridForm,
  Select,
} from "@/shared/ui";
import { useStepRequest } from "../context/StepRequest.context";
import { useEffect, useState } from "react";
import { useTimeAvailable } from "@/features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";
import { createRequestMutation } from "@/features/request/create/createRequest.hook";
import {
  CreateRequestFormData,
  SubmitCreateRequestHandler,
  useCreateRequestLib,
} from "@/features/request/create/createRequest.lib";
import { theme } from "@/application/theme";

export const StepDate = ({ setActiveStep, currentOwner }) => {
  const { request, setRequest } = useStepRequest() || {};
  const [dateSelected, setDateSelected] = useState(null);
  console.log({ dateSelected });
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: currentOwner?._id,
    professionalId: request?.professionalId,
    serviceId: request?.serviceId,
    date: dateSelected ?? null,
  });
  const currentService = request?.services?.find(
    (service) => service._id === request?.serviceId
  );
  const serviceDuration = currentService?.duration;
  const requestObjectIds = {
    haveDelivery: false,
    haveRecurrence: false,
    haveRide: false,
    haveFidelity: false,
    type: "service",
    status: 1,
    serviceId: request?.serviceId,
    clientId: request?.clientCreated?._id,
    professionalId: request?.professionalId,
    ownerId: currentOwner?._id,
    createdForId: currentOwner?.createdById,
    clientUserId: request?.clientCreated?.userId,
    initDate: timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value,
    endDate: addMinutes(
      new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
      serviceDuration
    )?.toISOString(),
    duration: serviceDuration,
    serviceName: currentService?.name,
    ownerName: currentOwner?.name,
    clientName: request?.clientCreated?.name,
    professionalName: request?.users?.find?.(
      (user) => user?._id === request?.professionalId
    )?.name,
  };
  const createRequest = createRequestMutation(() => {}, null);
  const { register, handleSubmit, formState } = useCreateRequestLib(requestObjectIds);
  const handleCreateRequest: SubmitCreateRequestHandler = async (
    values: CreateRequestFormData
  ) => {
    setRequest((prev) => ({
      ...prev,
      requestToSend: { ...values, ...requestObjectIds },
      currentService,
    }));
    await createRequest.mutateAsync({ ...values, ...requestObjectIds });
  };
  useEffect(() => {
    if (createRequest?.data) {
      setRequest((prev) => ({ ...prev, requestCreated: createRequest?.data }));
      setActiveStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRequest?.data]);
  return (
    <>
      <Box
        as="form"
        flex="1"
        bg="white"
        p={["0", "2", "3", "4"]}
        id="step3ID"
        onSubmit={handleSubmit(handleCreateRequest)}
      >
        <GridForm>
          <DatePicker
            placeholder="Selecione uma data"
            name="date"
            label="Data do agendamento"
            bgColor="gray.100"
            labelColor="gray.800"
            onChange={(date) => setDateSelected(date as any)}
          />
          {currentOwner?._id?.length === 24 &&
            timeAvailable?.timeAvailable?.length > 0 && (
              <Select
                bg="gray.100"
                labelColor="gray.800"
                color="gray.800"
                name="timeList"
                label="Horário disponível"
                list={timeAvailable?.timeAvailable ?? []}
                value={timeSelected ?? ""}
                onChange={handleChangeTimeSelected}
                keyLabel="label"
                keyValue="value"
              />
            )}
          <FormControl
            label="Observação"
            labelColor="black"
            bgColor="gray.100"
            bgColorHover="gray.100"
            error={formState.errors.message}
            {...register("message")}
          />
        </GridForm>
      </Box>
      <Flex justifyContent={"flex-end"} mt={10}>
        <Button
          colorScheme="purple"
          m={2}
          onClick={() => {
            setActiveStep(1);
          }}
        >
          Voltar
        </Button>
        <Button
          colorScheme="tertiary"
          type="submit"
          form="step3ID"
          isLoading={false}
          m={2}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};
