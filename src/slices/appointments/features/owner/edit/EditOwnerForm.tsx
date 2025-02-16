import { HourWorks, OwnerProps } from "@/slices/appointments/entidades/owner";
import { useEditOwner } from "./editOwner.hook";
import {
  Avatar,
  Box,
  BoxCreateItem,
  Button,
  Container,
  FormControl,
  GridForm,
  Icon,
  Input,
} from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { EditIcon } from "lucide-react";

export interface EditOwnerFormProps {
  owner: OwnerProps;
  id: string;
  users: any;
}
export const EditOwnerForm = ({ owner, id, users }: EditOwnerFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleEditOwner,
    haveLunchTime1,
    setHaveLunchTime1,
    haveLunchTime2,
    setHaveLunchTime2,
    haveLunchTime3,
    setHaveLunchTime3,
    changeHour,
    listHours,
    hourWork,
    daysOptions1,
    daysOptions2,
    daysOptions3,
    control,
    haveAlternativeHour,
    setHaveAlternativeHour,
    haveAlternativeHour2,
    setHaveAlternativeHour2,
    daysOptionsSelected1,
    daysOptionsSelected2,
    daysOptionsSelected3,
  } = useEditOwner({
    owner,
    users,
    id,
  });
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  const profileImage =
    "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const coverImage =
    "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <Container maxW="container.lg" py={8}>
        {/* Seção da Foto de Capa */}
        <Box
          position="relative"
          h="300px"
          bg={coverImage ? `url(${coverImage})` : "gray.100"}
          backgroundSize="cover"
          backgroundPosition="center"
          borderRadius="lg"
          mb={20}
        >
          {/* Botão para alterar capa */}
          <Box position="absolute" bottom={4} right={4}>
            <Input
              type="file"
              accept="image/*"
              id="cover-upload"
              onChange={handleCoverChange}
              display="none"
              name="photo"
            />
            <label htmlFor="cover-upload">
              <Button
                as="span"
                leftIcon={<EditIcon />}
                colorScheme="gray"
                variant="solid"
                size="sm"
              >
                Alterar Capa
              </Button>
            </label>
          </Box>

          {/* Seção da Foto de Perfil */}
          <Box position="absolute" bottom="-75px" left="50%" transform="translateX(-50%)">
            <Box position="relative">
              <Avatar
                size="2xl"
                src={profileImage || undefined}
                border="4px solid white"
                boxShadow="md"
              />
              {/* Botão para alterar perfil */}
              <Box position="absolute" bottom={0} right={0}>
                <Input
                  type="file"
                  accept="image/*"
                  id="profile-upload"
                  onChange={handleProfileChange}
                  display="none"
                  name={"profile-upload"}
                />
                <label htmlFor="profile-upload">
                  <Button
                    as="span"
                    borderRadius="full"
                    p={2}
                    bg="white"
                    boxShadow="md"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Icon as={EditIcon} boxSize={4} />
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <BoxCreateItem
        onSubmit={handleSubmit(handleEditOwner)}
        title={t("PAGES:HOME_PAGE.editDomain", {
          defaultValue: "Editar estabelecimento",
          domain: t("PAGES:HOME_PAGE.owner", {
            defaultValue: "Estabelecimento",
          }),
        })}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/owners/1"}
      >
        <GridForm>
          <FormControl
            label={t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            })}
            error={formState.errors.name}
            {...register("name")}
          />
          <FormControl
            label={t("PAGES:FIELDS.description", {
              defaultValue: "Descrição",
            })}
            error={formState.errors.description}
            {...register("description")}
          />
          <HourWorks
            props={{
              haveLunchTime1,
              setHaveLunchTime1,
              haveLunchTime2,
              setHaveLunchTime2,
              haveLunchTime3,
              setHaveLunchTime3,
              changeHour,
              listHours,
              hourWork,
              daysOptions1,
              daysOptions2,
              daysOptions3,
              control,
              haveAlternativeHour,
              setHaveAlternativeHour,
              haveAlternativeHour2,
              setHaveAlternativeHour2,
              daysOptionsSelected1,
              daysOptionsSelected2,
              daysOptionsSelected3,
            }}
          />
          <FormControl
            label="Tempo limite para reagendamento/cancelamento (em minutos)"
            error={formState.errors.minimumTimeForReSchedule}
            {...register("minimumTimeForReSchedule")}
          />
        </GridForm>
      </BoxCreateItem>
    </>
  );
};
