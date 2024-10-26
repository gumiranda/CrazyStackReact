import { Avatar as Avatar2 } from "@/components/ui/avatar";

export const Avatar = ({ children = null, ...rest }) => {
  return (
    <Avatar2 {...rest} data-testid="AvatarTestId">
      {children}
    </Avatar2>
  );
};
