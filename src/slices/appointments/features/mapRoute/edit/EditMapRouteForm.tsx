import { MapRouteProps } from "@/slices/appointments/entidades/mapRoute";
import { useEditMapRoute } from "./editMapRoute.hook";
import {
  BoxCreateItem,
  FormControl,
  GenericDetailsItem,
  GridForm,
  Grid,
  Text,
  List,
  ListItem,
  Card,
  CardBody,
  Button,
} from "@/shared/ui";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export interface EditMapRouteFormProps {
  mapRoute: MapRouteProps;
  mapContainerRef?: any;
}
export const EditMapRouteForm = ({ mapRoute }: EditMapRouteFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    formState,
    register,
    handleSubmit,
    handleEditMapRoute,
    fetchDirections,
    originText,
    destinationText,
    directionsData,
    originListPlaces,
    destinationListPlaces,
  } = useEditMapRoute({
    mapRoute,
    mapContainerRef,
  });
  return (
    <>
      <BoxCreateItem
        onSubmit={handleSubmit(handleEditMapRoute)}
        title={t("PAGES:HOME_PAGE.editDomain", {
          defaultValue: "Editar rota",
          domain: t("PAGES:HOME_PAGE.mapRoute", {
            defaultValue: "Rota",
          }),
        })}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/mapRoutes/1"}
      >
        <GenericDetailsItem
          item={mapRoute}
          fields={[
            { id: "_id", label: "Id" },
            {
              id: "name",
              label: t("PAGES:FIELDS.name", {
                defaultValue: "Nome",
              }),
            },
            { id: "distance", label: "Distância (em metros)" },
            { id: "duration", label: "Duração (em minutos)" },
            { id: "source", subId: "name", label: "Origem" },
            { id: "destination", subId: "name", label: "Destino" },
            { id: "createdById", label: "Id do criador" },
            {
              id: "createdAt",
              label: t("PAGES:FIELDS.createdAt", {
                defaultValue: "Data de criação",
              }),
            },
          ]}
        />
        <GridForm>
          <FormControl
            label={t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            })}
            error={formState.errors.name}
            {...register("name")}
          />
          <FormControl
            label="Origem"
            error={formState.errors.originText}
            autoCompleteProps={{
              list: originListPlaces,
              placeholder: "Digite para pesquisar a origem",
            }}
            {...register("originText")}
          />
          <FormControl
            label="Destino"
            error={formState.errors.destinationText}
            autoCompleteProps={{
              list: destinationListPlaces,
              placeholder: "Digite para pesquisar a destino",
            }}
            {...register("destinationText")}
          />
        </GridForm>
        {directionsData && (
          <Card mt={1}>
            <CardBody>
              <List>
                <ListItem>
                  <Text>Origem</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.start_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Destino</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.end_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Distância (em metros)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.distance.text}</Text>
                </ListItem>
                <ListItem>
                  <Text>Duração (em minutos)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.duration.text}</Text>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        )}
      </BoxCreateItem>
      {originText?.length > 0 && destinationText?.length > 0 && (
        <Button
          bgColor="green.500"
          colorPalette="green"
          //variant="contained"
          mt={1}
          mb={2}
          onClick={(e) => {
            e.preventDefault();
            fetchDirections();
          }}
        >
          Ver Rotas
        </Button>
      )}
      <Grid id="map" p={40} ref={mapContainerRef}></Grid>
    </>
  );
};
