import { Box, Flex, Text, Avatar } from "@/shared/ui/atoms";
import { useAuth } from "@/shared/libs";
import { useProfile } from "./useProfile.hook";
import { Separator } from "@chakra-ui/react";
import { IoExitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type ProfileProps = {
  showProfileData?: boolean;
};
export const Profile = ({ showProfileData }: ProfileProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { user, logout, userPhoto } = useAuth() || {};
  const router = useRouter();
  const { showUserMenu, setShowUserMenu } = useProfile();
  if (!user?.name) {
    return null;
  }
  return (
    <Flex align="center" mr={["2", "2", "0", "0"]}>
      <Box>
        <Avatar
          name={user?.name}
          size="md"
          bg="secondary.500"
          cursor={"pointer"}
          color="primary.500"
          src={userPhoto?.url}
          onClick={() => setShowUserMenu(!showUserMenu)}
        />
        {showUserMenu && (
          <Box
            position="absolute"
            gap={3}
            pt={4}
            pb={4}
            zIndex={900}
            right="10px"
            top="70px"
            backgroundColor={"secondary.500"}
            borderRadius={4}
          >
            <Box datatestid="ProfileTestId" pl={4} pr={4}>
              <Text fontSize="sm">{user?.name}</Text>
              <Text color="tertiary.500" fontSize="xs">
                {user?.email}
              </Text>
              <Separator orientation="horizontal" color="gray.600" mt={2} mb={2} />
            </Box>
            <Flex
              cursor="pointer"
              gap={2}
              pl={4}
              pt={1}
              pb={1}
              alignItems={"center"}
              _hover={{ bg: "gray.600" }}
              onClick={() => {
                logout?.();
                router.push("/login");
              }}
            >
              <IoExitOutline />
              <Text fontSize="sm">
                {t("PAGES:HOME_PAGE.logout", {
                  defaultValue: "Sair",
                })}
              </Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
