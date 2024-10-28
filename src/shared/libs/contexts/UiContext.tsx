/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useContext, ReactNode, useState } from "react";
//import { Modal } from "@/widgets";
import { Button, BoxError, BoxSuccess } from "@/shared/ui";
import { useTranslation } from "react-i18next";
type UiProviderProps = {
  children: ReactNode;
};
type UiContextData = {
  clearModalProps: Function;
  showModal: Function;
  loading: boolean;
  setLoading: Function;
  setModalBody: Function;
  setModalFooter: Function;
  onClose: Function;
  onOpen: Function;
  isOpen: boolean;
  open: boolean;
  onToggle: Function;
};
const UiContext = createContext({} as UiContextData);
const CloseButton = ({ onClose }: any) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Button colorPalette={"purple"} mr={3} onClick={onClose}>
      {t("PAGES:MESSAGES.okUnderstand", {
        defaultValue: "Ok, entendi",
      }) || ""}
    </Button>
  );
};
export function UiProvider({ children }: UiProviderProps) {
  const [open, setOpen] = useState(false);
  const disclosure = {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen(!open),
  };
  const { onOpen, onClose } = disclosure;
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
      (newModalBody ?? type === "error") ? (
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
      <Button colorPalette="whiteAlpha" mr={3} onClick={onClose}>
        Fechar
      </Button>
    );
    setModalBody(<></>);
    setModalHeaderText("");
  };
  return (
    <UiContext.Provider
      value={{
        ...disclosure,
        isOpen: open,
        setModalBody,
        showModal,
        clearModalProps,
        loading,
        setLoading,
        setModalFooter,
      }}
    >
      {children}
      {/* <Modal
        open={open}
        onClose={onClose}
        modalHeaderText={modalHeaderText}
        modalFooter={modalFooter}
      >
        {modalBody}
      </Modal>
      <LoadingOverlay
        styles={{
          spinner: (base) => ({ ...base }),
          wrapper: { width: "100%", height: "100%" },
          content: null,p
          overlay: (base) => ({ ...base, position: "fixed" }),
        }}
        active={!!isFetching || !!isMutating || loading}
        spinner
        text={"Carregando..."}
      /> */}
    </UiContext.Provider>
  );
}
const isBrowser = typeof window !== "undefined";

export const useUi = () => {
  if (!isBrowser) {
    return {
      clearModalProps: () => {},
      showModal: (s) => {},
      loading: false,
      setLoading: (t) => {},
      setModalBody: (a) => {},
      setModalFooter: (b) => {},
      onClose: () => {},
      onOpen: () => {},
      isOpen: false,
      open: false,
      onToggle: (c) => {},
    };
  }
  return useContext(UiContext);
};
