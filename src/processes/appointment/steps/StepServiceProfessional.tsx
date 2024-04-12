"use client";

import { Box, Button, Flex, GridForm, Select } from "@/shared/ui";
import { useStepRequest } from "../context/StepRequest.context";
import { useUsersSelect } from "@/features/user/userList.hook";
import { useServicesSelect } from "@/features/service/serviceList.hook";
import { theme } from "@/application/theme";

export const StepServiceProfessional = ({ setActiveStep, ownerSelected }) => {
  const { setRequest } = useStepRequest();
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    ownerSelected: ownerSelected?._id,
  });
  const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
    userSelected,
    users,
    ownerSelected: ownerSelected?._id,
  });
  return (
    <>
      <Box
        as="form"
        flex="1"
        bg="white"
        p={["0", "2", "3", "4"]}
        id="step2ID"
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            serviceId: serviceSelected,
            professionalId: userSelected,
            services,
          };
          setRequest((prev) => ({ ...prev, ...payload, users }));
          setActiveStep(2);
        }}
      >
        <GridForm>
          <Select
            bg="gray.100"
            labelColor="gray.800"
            color="gray.800"
            name="userList"
            label="Profissional prestador"
            list={users}
            value={userSelected}
            onChange={handleChangeUserSelected}
            keyLabel="name"
            keyValue="_id"
          >
            <option
              style={{ backgroundColor: theme.colors.grayscale[500] }}
              value="loadMore"
            >
              Carregar mais
            </option>
          </Select>
          <Select
            bg="gray.100"
            labelColor="gray.800"
            color="gray.800"
            name="serviceList"
            label="Serviço"
            list={services}
            value={serviceSelected}
            onChange={handleChangeServiceSelected}
            keyLabel="name"
            keyValue="_id"
          >
            <option
              style={{ backgroundColor: theme.colors.grayscale[500] }}
              value="loadMore"
            >
              Carregar mais
            </option>
          </Select>
        </GridForm>
      </Box>
      <Flex justifyContent={"flex-end"} mt={10}>
        <Button
          colorScheme="purple"
          m={2}
          onClick={() => {
            setActiveStep(0);
          }}
        >
          Voltar
        </Button>
        <Button
          colorScheme="tertiary"
          type="submit"
          form="step2ID"
          isLoading={false}
          m={2}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};
