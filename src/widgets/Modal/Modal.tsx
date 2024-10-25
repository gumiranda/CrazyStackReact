import {
  DialogCloseTrigger,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent, DialogHeader, DialogBody, DialogFooter } from "@chakra-ui/react";
export const Modal = ({
  children,
  open,
  dialogHeaderText,
  dialogFooter,
  ...rest
}: any) => {
  return (
    <DialogRoot open={open} {...rest}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader color="purple.700" textAlign={"center"}>
          <DialogTitle>{dialogHeaderText}</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger color="purple.700" />
        <DialogBody>{children}</DialogBody>
        <DialogFooter>{dialogFooter}</DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
