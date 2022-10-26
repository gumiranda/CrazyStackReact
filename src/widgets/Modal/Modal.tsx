import {
  Modal as ModalChakra,
  ModalProps as ModalPropsChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
interface ModalProps extends ModalPropsChakra {
  children: React.ReactNode;
  modalFooter: React.ReactNode;
  modalHeaderText: string;
}
export const Modal = ({
  children,
  isOpen,
  onClose,
  modalHeaderText,
  modalFooter,
  ...rest
}: ModalProps) => {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700" textAlign={"center"}>
          {modalHeaderText}
        </ModalHeader>
        <ModalCloseButton color="purple.700" />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};
