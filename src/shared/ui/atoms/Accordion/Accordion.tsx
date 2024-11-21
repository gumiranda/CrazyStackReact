import {
  AccordionItem as AccordionItemChakra,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Icon } from "@chakra-ui/react";

export const Accordion = ({ children, datatestid, ...rest }: any) => {
  return (
    <AccordionRoot {...rest} data-testid={datatestid ?? "AccordionTestId"}>
      {children}
    </AccordionRoot>
  );
};

export const AccordionItem = ({ children, datatestid, ...rest }: any) => {
  return (
    <AccordionItemChakra {...rest} data-testid={datatestid ?? "AccordionItemTestId"}>
      {children}
    </AccordionItemChakra>
  );
};

export const AccordionButton = ({ children, datatestid, ...rest }: any) => {
  return (
    <AccordionItemTrigger {...rest} data-testid={datatestid ?? "AccordionButtonTestId"}>
      {children}
    </AccordionItemTrigger>
  );
};

export const AccordionPanel = ({ children, datatestid, ...rest }: any) => {
  return (
    <AccordionItemContent {...rest} data-testid={datatestid ?? "AccordionPanelTestId"}>
      {children}
    </AccordionItemContent>
  );
};

export const AccordionIcon = ({ datatestid, ...rest }: any) => {
  return <Icon {...rest} data-testid={datatestid ?? "AccordionIconTestId"} />;
};
