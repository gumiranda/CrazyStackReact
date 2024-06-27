"use client";
import { Box, Button } from "@/shared/ui";
import { UserProps } from "@/slices/general/entidades/user";
import { deleteUserById } from "@/slices/general/entidades/user/user.api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/libs";
import { ProfileCard } from "./ProfileCard";
import { PhotoUpload } from "./PhotoUpload";

type UserDetailsProps = {
  data: UserProps;
  id: string;
  canDelete?: boolean;
};
export const UserDetailsPage = ({ data, id, canDelete = false }: UserDetailsProps) => {
  const router = useRouter();
  const { logout, updateUserPhoto } = useAuth();
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <ProfileCard
          userData={data}
          handleOnClickButton={() => router.push(`/users/edit/${id}`)}
        >
          {canDelete === true && (
            <Button
              colorScheme="red"
              onClick={async () => {
                logout?.();
                await deleteUserById(id, null);
                router.push("/login");
              }}
              mt="4"
              width="full"
              _focus={{ boxShadow: "outline", borderColor: "red.500" }}
            >
              Deletar conta
            </Button>
          )}
        </ProfileCard>
        <PhotoUpload userId={id} updateUserPhoto={updateUserPhoto} />
      </Box>
    </>
  );
};
