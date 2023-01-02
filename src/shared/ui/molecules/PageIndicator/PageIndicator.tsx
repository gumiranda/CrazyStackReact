import { Box } from "shared/ui";
interface PageIndicatorProps {
  pageInitial: number;
  pageEnd: number;
  total: number;
}
export const PageIndicator = ({ pageInitial, pageEnd, total }: PageIndicatorProps) => {
  return (
    <Box>
      <strong>{pageInitial}</strong>-<strong>{pageEnd}</strong> de <strong>{total}</strong>
    </Box>
  );
};
