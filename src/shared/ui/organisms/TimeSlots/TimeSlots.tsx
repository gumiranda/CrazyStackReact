"use client";
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Text } from "../../atoms";
import { FaRegClock } from "react-icons/fa6";
import { statusMap } from "@/slices/appointments/entidades/request/request.model";
import { SlOptions } from "react-icons/sl";
import { Modal } from "@/widgets";
import { RequestDetailsV2 } from "@/slices/appointments/entidades/request/details/RequestDetailsV2";
import { useTranslation } from "react-i18next";

export const TimeSlots = ({ list }) => {
  const { t } = useTranslation(["PAGES"]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestsSelected, setRequestsSelected] = useState<any>(null);
  const timeSlots = Array.from({ length: 18 }, (_, i) => ({
    start: `${i + 6}h`,
    end: `${i + 7}h`,
    items: [] as any[],
  }));
  list.forEach((item) => {
    const hour = parseInt(
      new Date(item.initDate)
        .toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
        .split(":")[0]
    );
    const slotIndex = hour - 6;
    if (slotIndex >= 0 && slotIndex < timeSlots.length) {
      timeSlots[slotIndex].items.push(item);
    }
  });

  return (
    <>
      <Flex direction="column" align="center" mt={2}>
        {timeSlots.map((interval, index) => {
          return (
            <Flex
              key={`${index}-${interval.start}${interval.end}`}
              flexDir="column"
              p={2}
              m={1}
              mb={10}
              minH={60}
              borderBottom="2px"
              borderColor="white"
              w={"100%"}
              borderRadius={4}
            >
              <Text fontSize="xl" fontWeight={"500"}>
                {`${interval.start} - ${interval.end}`}
              </Text>
              {interval.items
                .sort(
                  (a, b) =>
                    new Date(a.initDate).getTime() - new Date(b.initDate).getTime()
                )
                .map((item, ix) => (
                  <Flex
                    key={`${item?._id}${ix}`}
                    borderLeft="4px"
                    borderRadius={4}
                    p={4}
                    mt={5}
                    bg="secondary.500"
                    borderColor={
                      [7, 1]?.includes?.(item?.status)
                        ? "tertiary.500"
                        : [2, 3, 7].includes(item?.status)
                          ? "red.500"
                          : "primary.500"
                    }
                  >
                    <Flex justifyContent={"space-between"} w="100%">
                      <Flex flexDir="column" justifyContent={"space-between"}>
                        <Flex alignItems="center" gap={2}>
                          <FaRegClock />
                          <Text fontSize="2xl" fontWeight={"300"}>
                            {new Date(item.initDate).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            -{" "}
                            {new Date(item.endDate).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </Flex>
                        <Flex flexDir="column">
                          <Text fontWeight={"600"} my={1}>
                            {t(`PAGES:STATUS.${item?.status}`, {
                              defaultValue: statusMap?.[item?.status],
                            })}
                          </Text>
                          <Text>{item?.clientName}</Text>
                          <Text fontSize="xs">{item?.serviceName}</Text>
                        </Flex>
                      </Flex>
                      <IconButton
                        aria-label="Ver detalhes do agendamento"
                        bg="primary.500"
                        icon={<SlOptions />}
                        onClick={() => {
                          setRequestsSelected(item);
                          onOpen();
                        }}
                      />
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          );
        })}
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        modalHeaderText={t("PAGES:FIELDS.appointmentDetails", {
          defaultValue: "Detalhes do agendamento",
        })}
        modalFooter={null}
      >
        <RequestDetailsV2 props={{ request: requestsSelected, onClose }} />
      </Modal>
    </>
  );
};
