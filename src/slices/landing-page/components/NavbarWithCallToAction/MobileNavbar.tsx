import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerProps,
  Stack,
} from "@chakra-ui/react";

export const MobileDrawer = (props: Omit<DrawerProps, "children">) => (
  <Drawer placement="left" {...props}>
    <DrawerContent bgColor={"secondary.500"}>
      <DrawerBody my="16">
        <Stack spacing="6" align="stretch">
          {["Components", "Pricing", "Marketplace", "Support"].map((item) => (
            <Button
              bgColor={"secondary.500"}
              color="white"
              _hover={{ bgColor: "secondary.600" }}
              key={item}
              size="lg"
              colorScheme="gray"
            >
              {item}
            </Button>
          ))}
          <Button bgColor="primary.600" color="white" _hover={{ bgColor: "primary.700" }}>
            Sign Up
          </Button>
        </Stack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);
