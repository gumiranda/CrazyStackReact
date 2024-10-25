import {
  AccordionItem as AccordionItemChakra,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Icon } from "@chakra-ui/react";

export const Accordion = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionRoot ref={ref} {...rest} data-testid={datatestid ?? "AccordionTestId"}>
      {children}
    </AccordionRoot>
  );
};

export const AccordionItem = ({ children, datatestid, ...rest }: any, ref) => {
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

export const AccordionButton = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionItemTrigger
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionButtonTestId"}
    >
      {children}
    </AccordionItemTrigger>
  );
};

export const AccordionPanel = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <AccordionItemContent
      ref={ref}
      {...rest}
      data-testid={datatestid ?? "AccordionPanelTestId"}
    >
      {children}
    </AccordionItemContent>
  );
};

export const AccordionIcon = ({ datatestid, ...rest }: any, ref) => {
  return <Icon ref={ref} {...rest} data-testid={datatestid ?? "AccordionIconTestId"} />;
};
