import {
  forwardRef,
  AccordionItem as AccordionItemChakra,
  AccordionButton as AccordionButtonChakra,
  AccordionPanel as AccordionPanelChakra,
  AccordionIcon as AccordionIconChakra,
  Accordion,
} from "@chakra-ui/react";
export const Accordion_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <Accordion ref={ref} {...rest} data-testid={datatestid ?? "AccordionTestId"}>
      {children}
    </Accordion>
  );
};
//export const Accordion = forwardRef(Accordion_);

export const AccordionItem_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionItemChakra
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionItemTestId"}
    >
      {children}
    </AccordionItemChakra>
  );
};
export const AccordionItem = forwardRef(AccordionItem_);

export const AccordionButton_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionButtonChakra
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionButtonTestId"}
    >
      {children}
    </AccordionButtonChakra>
  );
};
export const AccordionButton = forwardRef(AccordionButton_);

export const AccordionPanel_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionPanelChakra
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionPanelTestId"}
    >
      {children}
    </AccordionPanelChakra>
  );
};
export const AccordionPanel = forwardRef(AccordionPanel_);

export const AccordionIcon_ = ({ datatestid, ...rest }: any, ref) => {
  return (
    <AccordionIconChakra
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionIconTestId"}
    />
  );
};
export const AccordionIcon = forwardRef(AccordionIcon_);
