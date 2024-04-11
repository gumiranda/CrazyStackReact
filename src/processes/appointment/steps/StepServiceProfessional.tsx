import { Button, Flex } from "@/shared/ui";

export const StepServiceProfessional = ({ setActiveStep }) => {
  return (
    <>
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
          form="clientFormId"
          isLoading={false}
          m={2}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};
