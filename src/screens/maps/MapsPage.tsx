import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData,
} from "@googlemaps/google-maps-services-js";
import { FormEvent, useRef, useState } from "react";
import { useMap } from "shared/libs/hooks/useMap";
import {
  Grid,
  Text,
  List,
  ListItem,
  Card,
  Input,
  CardBody,
  Button,
} from "@chakra-ui/react";

export function MapsPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);
  const [directionsData, setDirectionsData] = useState<
    DirectionsResponseData & { request: any }
  >();
  const [open, setOpen] = useState(false);

  async function searchPlaces(event: FormEvent) {
    event.preventDefault();
    const source = (document.getElementById("source") as HTMLInputElement).value;
    const destination = (document.getElementById("destination") as HTMLInputElement).value;

    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${source}`),
      fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${destination}`),
    ]);
    console.log({ sourceResponse, destinationResponse });
    const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()]);

    if (sourcePlace.status !== "OK") {
      console.error(sourcePlace);
      alert("Não foi possível encontrar a origem");
      return;
    }

    if (destinationPlace.status !== "OK") {
      console.error(destinationPlace);
      alert("Não foi possível encontrar o destino");
      return;
    }

    const placeSourceId = sourcePlace.candidates[0].place_id;
    const placeDestinationId = destinationPlace.candidates[0].place_id;

    const directionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`
    );
    const directionsData: DirectionsResponseData & { request: any } =
      await directionsResponse.json();
    setDirectionsData(directionsData);
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: "1",
      startMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directionsData.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
    });
  }

  async function createRoute() {
    const startAddress = directionsData!.routes[0].legs[0].start_address;
    const endAddress = directionsData!.routes[0].legs[0].end_address;
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${startAddress} - ${endAddress}`,
        source_id: directionsData!.request.origin.place_id,
        destination_id: directionsData!.request.destination.place_id,
      }),
    });
    const route = await response.json();
    console.log({ route });
    setOpen(true);
  }

  return (
    <Grid display={"flex"} flexDir={"column"} flex={1}>
      <Grid gap={4}>
        <Text as="h4">Nova rota</Text>
        <form onSubmit={searchPlaces}>
          <Input id="source" />
          <Input id="destination" mt={1} />
          <Button variant="contained" type="submit" mt={1}>
            Pesquisar
          </Button>
        </form>
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
                  <Text>Distância</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.distance.text}</Text>
                </ListItem>
                <ListItem>
                  <Text>Duração</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.duration.text}</Text>
                </ListItem>
              </List>
              <Button type="button" variant="contained" onClick={createRoute}>
                Adicionar rota
              </Button>
            </CardBody>
            {/* <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="button" variant="contained" onClick={createRoute}>
                Adicionar rota
              </Button>
            </CardActions> */}
          </Card>
        )}
      </Grid>
      <Grid id="map" p={40} ref={mapContainerRef}></Grid>
      {/* <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Rota cadastrada com sucesso
        </Alert>
      </Snackbar> */}
    </Grid>
  );
}
