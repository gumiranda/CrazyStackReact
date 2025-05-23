import { Box, IconButton, type IconButtonProps } from "@chakra-ui/react";

interface ToggleButtonProps extends IconButtonProps {
  open: boolean;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { open, ...iconButtonProps } = props;
  return (
    <IconButton variant="ghost" display="inline-flex" size="xs" {...iconButtonProps}>
      <ToggleIcon active={open} />
    </IconButton>
  );
};

const ToggleIcon = (props: { active: boolean }) => {
  const { active } = props;
  return (
    <Box
      className="group"
      data-active={active ? "" : undefined}
      as="span"
      display="block"
      w="1.5rem"
      h="1.5rem"
      pos="relative"
      aria-hidden
      pointerEvents="none"
    >
      {/* <Bar
        top="0.4375rem"
        _groupActive={{ top: "0.6875rem", transform: "rotate(45deg)" }}
      />
      <Bar
        bottom="0.4375rem"
        _groupActive={{ bottom: "0.6875rem", transform: "rotate(-45deg)" }}
      /> */}
    </Box>
  );
};

// const Bar = chakra("span", {
//   baseStyle: {
//     display: "block",
//     pos: "absolute",
//     w: "1.25rem",
//     h: "0.125rem",
//     rounded: "full",
//     bg: "currentcolor",
//     mx: "auto",
//     insetStart: "0.125rem",
//     transition: "all 0.12s",
//   },
// });
