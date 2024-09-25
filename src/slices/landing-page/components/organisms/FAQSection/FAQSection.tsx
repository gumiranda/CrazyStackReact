import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Text,
} from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const FAQSection = () => {
  const { t } = useTranslation(["FAQ"]);
  const faqs = [
    {
      question: t("FAQ:QUESTION_1", { defaultValue: "O que é o sistema?" }),
      answer: t("FAQ:ANSWER_1", {
        defaultValue: "O sistema é uma plataforma para agendamentos online.",
      }),
    },
    {
      question: t("FAQ:QUESTION_2", { defaultValue: "Como funciona?" }),
      answer: t("FAQ:ANSWER_2", {
        defaultValue: "Você se cadastra e pode começar a agendar seus serviços online.",
      }),
    },
    {
      question: t("FAQ:QUESTION_3", {
        defaultValue: "Quais tipos de serviços posso agendar?",
      }),
      answer: t("FAQ:ANSWER_3", {
        defaultValue:
          "Você pode agendar uma variedade de serviços como consultas médicas, serviços de beleza, manutenção doméstica, entre outros.",
      }),
    },
    {
      question: t("FAQ:QUESTION_4", {
        defaultValue: "O agendamento é confirmado imediatamente?",
      }),
      answer: t("FAQ:ANSWER_4", {
        defaultValue:
          "Sim, o agendamento é confirmado imediatamente após a conclusão do processo de reserva.",
      }),
    },
    {
      question: t("FAQ:QUESTION_5", {
        defaultValue: "Como posso cancelar um agendamento?",
      }),
      answer: t("FAQ:ANSWER_5", {
        defaultValue:
          "Você pode cancelar seu agendamento através da seção 'Meus Agendamentos' no seu perfil, seguindo as instruções de cancelamento.",
      }),
    },
    {
      question: t("FAQ:QUESTION_6", { defaultValue: "Há taxas de cancelamento?" }),
      answer: t("FAQ:ANSWER_6", {
        defaultValue:
          "As taxas de cancelamento dependem do tipo de serviço e do tempo restante até o agendamento. Verifique a política de cancelamento para mais detalhes.",
      }),
    },
    {
      question: t("FAQ:QUESTION_7", {
        defaultValue: "Como posso entrar em contato com o suporte?",
      }),
      answer: t("FAQ:ANSWER_7", {
        defaultValue:
          "Você pode entrar em contato com o suporte através do nosso chat online ou enviando um e-mail para suporte@exemplo.com.",
      }),
    },
    {
      question: t("FAQ:QUESTION_8", { defaultValue: "Posso remarcar meu agendamento?" }),
      answer: t("FAQ:ANSWER_8", {
        defaultValue:
          "Sim, você pode remarcar seu agendamento na seção 'Meus Agendamentos' seguindo as instruções para remarcação.",
      }),
    },
    {
      question: t("FAQ:QUESTION_9", { defaultValue: "Como faço para me cadastrar?" }),
      answer: t("FAQ:ANSWER_9", {
        defaultValue:
          "Para se cadastrar, clique no botão 'Cadastre-se' no canto superior direito e preencha o formulário com suas informações pessoais.",
      }),
    },
    {
      question: t("FAQ:QUESTION_10", {
        defaultValue: "Quais métodos de pagamento são aceitos?",
      }),
      answer: t("FAQ:ANSWER_10", {
        defaultValue:
          "Aceitamos diversos métodos de pagamento, incluindo cartões de crédito, débito e pagamentos online como PayPal.",
      }),
    },
    {
      question: t("FAQ:QUESTION_11", {
        defaultValue: "Posso agendar serviços para outras pessoas?",
      }),
      answer: t("FAQ:ANSWER_11", {
        defaultValue:
          "Sim, você pode agendar serviços em nome de outras pessoas, bastando inserir as informações do destinatário durante o processo de agendamento.",
      }),
    },
    {
      question: t("FAQ:QUESTION_12", {
        defaultValue: "Os meus dados pessoais estão seguros?",
      }),
      answer: t("FAQ:ANSWER_12", {
        defaultValue:
          "Sim, utilizamos medidas de segurança avançadas para garantir que seus dados pessoais estejam protegidos.",
      }),
    },
  ];
  return (
    <Box
      as="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      minH="100vh"
      py={12}
    >
      <Heading
        letterSpacing="tighter"
        lineHeight="none"
        as="h2"
        textAlign="center"
        fontWeight="semibold"
        fontSize={{ base: "4xl", md: "5xl" }}
      >
        {t("FAQ:TITLE", { defaultValue: "Perguntas Frequentes" })}
      </Heading>
      <Text
        my={6}
        mb={10}
        textAlign="center"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="extralight"
        maxW={{ base: "90%", sm: "70%", xl: "50%" }}
      >
        {t("FAQ:SUBTITLE", {
          defaultValue:
            "Aqui estão algumas das perguntas mais frequentes sobre o nosso sistema.",
        })}
      </Text>
      <Container maxW={{ base: "90%", xl: "70%" }}>
        <Accordion allowMultiple>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} py={5}>
              <h2>
                <AccordionButton>
                  <Box
                    display="flex"
                    flex="1"
                    textAlign="left"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    color="primary.500"
                  >
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="extralight"
                mt={2}
                mr={{ base: 0, sm: 10, xl: 56 }}
              >
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};
