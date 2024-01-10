import { MapRouteProps } from "entidades/mapRoute";
import { useEditMapRoute } from "./editMapRoute.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";
import { Grid, Text, List, ListItem, Card, CardBody, Button } from "@chakra-ui/react";
import { useRef } from "react";

export interface EditMapRouteFormProps {
  mapRoute: MapRouteProps;
  mapContainerRef?: any;
}
export const EditMapRouteForm = ({ mapRoute }: EditMapRouteFormProps) => {
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
        title={"Editar rota"}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/mapRoutes/1"}
      >
        <GenericDetailsItem
          item={mapRoute}
          fields={[
            { id: "_id", label: "Id" },
            { id: "name", label: "Nome" },
            { id: "distance", label: "Distância (em metros)" },
            { id: "duration", label: "Duração (em minutos)" },
            { id: "source", subId: "name", label: "Origem" },
            { id: "destination", subId: "name", label: "Destino" },
            { id: "createdById", label: "Id do criador" },
            { id: "createdAt", label: "Data de criação" },
          ]}
        />
        <GridForm>
          <FormControl
            label="Nome da rota"
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
          colorScheme="green"
          variant="contained"
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
