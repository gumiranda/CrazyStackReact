import { Stack } from "@chakra-ui/react";
import { PaginationItem, Text } from "@/shared/ui/atoms";
interface PaginationGroupItemsProps {
  currentPage: number;
  siblingsCount: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  previousPages: number[];
  nextPages: number[];
}

export const PaginationGroupItems = ({
  currentPage,
  siblingsCount,
  onPageChange,
  previousPages,
  nextPages,
  lastPage,
}: PaginationGroupItemsProps) => {
  return (
    <Stack direction="row" spacing="2">
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + siblingsCount && (
            <Text textAlign={"center"} width="8" color="purple.300">
              ...
            </Text>
          )}
        </>
      )}
      {previousPages.length > 0 &&
        previousPages?.map?.((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
      <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} />
      {nextPages.length > 0 &&
        nextPages?.map?.((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <>
              <Text textAlign={"center"} width="8" color="purple.300">
                ...
              </Text>
            </>
          )}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </Stack>
  );
};
