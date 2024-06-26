import { useCreateMapRoute } from "./createMapRoute.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "@/shared/ui";
import { useRef } from "react";
import { Grid, Text, List, ListItem, Card, CardBody, Button } from "@chakra-ui/react";
export const CreateMapRouteForm = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    directionsData,
    fetchDirections,
    originText,
    destinationText,
  } = useCreateMapRoute({ mapContainerRef });
  return (
    <>
      <BoxCreateItem
        onSubmit={handleSubmit(handleCreateMapRoute)}
        title={"Criar rotas"}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/mapRoutes/1"}
      >
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
          <Checkbox
            label="Ativo"
            colorScheme="green"
            isChecked={active}
            onChange={(e) => {
              e.preventDefault();
              setActive(e.target.checked);
            }}
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
