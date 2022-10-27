import { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { Modal } from "widgets";
import { Button, BoxError, BoxSuccess } from "shared/ui";
type UiProviderProps = {
  children: ReactNode;
};
type UiContextData = UseDisclosureReturn & {
  clearModalProps: Function;
  showModal: Function;
  loading: boolean;
  setLoading: Function;
};
const UiContext = createContext({} as UiContextData);
const CloseButton = ({ onClose }: any) => {
  return (
    <Button colorScheme={"purple"} mr={3} onClick={onClose}>
      Ok, entendi
    </Button>
  );
};
export function UiProvider({ children }: UiProviderProps) {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;
  const [modalHeaderText, setModalHeaderText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalBody, setModalBody] = useState<ReactNode>(null);

  const [modalFooter, setModalFooter] = useState<ReactNode>(
    <CloseButton onClose={onClose} />
  );
  const showModal = ({
    newModalFooter = <CloseButton onClose={onClose} />,
    newModalBody = null,
    title = "Atenção",
    subtitle = undefined,
    type = null,
    content = "",
  }) => {
    setModalFooter(newModalFooter);
    setModalBody(
      newModalBody ?? type === "error" ? (
        <BoxError title={subtitle} content={content} />
      ) : type === "success" ? (
        <BoxSuccess title={subtitle} content={content} />
      ) : null
    );
    setModalHeaderText(title);
    onOpen();
  };
  const clearModalProps = () => {
    setModalFooter(
      <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
        Fechar
      </Button>
    );
    setModalBody(<></>);
    setModalHeaderText("");
  };
  return (
    <UiContext.Provider
      value={{ ...disclosure, showModal, clearModalProps, loading, setLoading }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        modalHeaderText={modalHeaderText}
        modalFooter={modalFooter}
      >
        {modalBody}
      </Modal>
    </UiContext.Provider>
  );
}
export const useUi = () => useContext(UiContext);
