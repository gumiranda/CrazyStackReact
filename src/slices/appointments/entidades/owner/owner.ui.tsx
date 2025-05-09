import React from "react";
import { useUi } from "@/shared/libs";
import { Button, CustomCard, Text, Icon } from "@/shared/ui";
import NextLink from "next/link";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

export const useOwnerUi = ({ deleteSelectedAction }: any) => {
  const { showModal, onClose } = useUi();
  const openModalItem = ({ item = null, fields = [] }: any) => {
    const modalProps = {
      newModalBody: (
        <>
          {fields.map((field: any, ix: number) => (
            <React.Fragment key={`${ix}-${field?.id}`}>
              <Text fontSize="xl" color="purple.800">
                {field?.label}
              </Text>
              <Text color="purple.700">{item[field?.id]}</Text>
            </React.Fragment>
          ))}
        </>
      ),
      newModalFooter: (
        <>
          <Button
            colorPalette="red"
            mr={3}
            //leftIcon={<Icon fontSize="20" as={RiDeleteBin6Line} />}
            onClick={() => {
              onClose();
              deleteSelectedAction(item);
            }}
          >
            Excluir
          </Button>
          <NextLink passHref href={`/owners/edit/${item?._id}`}>
            <Button
              colorPalette="purple"
              //leftIcon={<Icon fontSize="20" as={RiEditLine} />}
              onClick={onClose}
            >
              Editar
            </Button>
          </NextLink>
        </>
      ),
      content: item?.name,
    };
    showModal(modalProps);
  };
  const renderItem = (item: any) => (
    <CustomCard
      {...item}
      onClick={() => {
        openModalItem(item);
      }}
    />
  );
  return { renderItem };
};
