import { Box, Flex, Text, Avatar } from "shared/ui/atoms";
import { useAuth } from "shared/libs";

type ProfileProps = {
  showProfileData?: boolean;
};
export const Profile = ({ showProfileData }: ProfileProps) => {
  const { user } = useAuth();

  return (
    <Flex align="center" mr={["2", "2", "0", "0"]} data-testid="ProfileTestId">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Miranda</Text>
          <Text color="purple.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <Avatar name="Gustavo Miranda" size="md" src="https://github.com/gumiranda.png" />
    </Flex>
  );
};
