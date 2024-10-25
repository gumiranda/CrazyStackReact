import { Avatar } from "@/components/ui/avatar";

export const Avatar2 = ({ children, ...rest }) => {
  return (
    <Avatar {...rest} data-testid="AvatarTestId">
      {children}
    </Avatar>
  );
};
