import { Button } from "@chakra-ui/react";
type PaginationItemProps = {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
};
export const PaginationItem = ({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorPalette={"green"}
        disabled
        _disabled={{ bgColor: "green.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="purple.700"
      _hover={{ bg: "purple.500" }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
};
