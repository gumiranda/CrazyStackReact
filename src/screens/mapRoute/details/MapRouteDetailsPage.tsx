import { Box, Head, Button } from "shared/ui";
import { MapRouteDetails } from "entidades/mapRoute/details";
import { MapRouteProps } from "entidades/mapRoute";
import { useRef, useEffect } from "react";
import { useLoadMap } from "features/mapRoute/load-map";
import { mapRouteModel } from "entidades/mapRoute/mapRoute.model";
import { Grid } from "@chakra-ui/react";
import { parseCookies } from "nookies";
type MapRouteDetailsProps = {
  data: MapRouteProps;
  id: string;
};
export const MapRouteDetailsPage = ({ data }: MapRouteDetailsProps) => {
  const props = { mapRoute: data };
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useLoadMap(mapContainerRef);
  useEffect(() => {
    initRouteMap();
  }, [map]);
  async function initRouteMap() {
    const route = mapRouteModel(data).format();
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: route?._id,
      startMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].start_location,
      },
    });
  }
  async function startRoute() {
    const route = mapRouteModel(data).format();
    const cookies = parseCookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/routeDriver`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookies["belezixadmin.token"]}`,
      },
      body: JSON.stringify({
        name: route?.name,
        routeId: route?._id,
        points: [],
        status: "initialized",
      }),
    });
    if (!response || response?.status !== 200) {
      console.log(response);
      return;
    }
    const routeCreatedResponse = await response.json();
    if (!routeCreatedResponse) {
      return;
    }
    const { steps } = route.directionsJson.routes[0].legs[0];
    for (const step of steps) {
      await sleep(2000);
      map?.moveCar(route?._id, step.start_location);
      // socket.send(
      //   JSON.stringify({
      //     route_id: route?._id,
      //     lat: step.start_location.lat,
      //     lng: step.start_location.lng,
      //   })
      // );

      await sleep(2000);
      map?.moveCar(route?._id, step.end_location);
      // socket.send(
      //   JSON.stringify({
      //     route_id: route?._id,
      //     lat: step.end_location.lat,
      //     lng: step.end_location.lng,
      //   })
      // );
    }
  }
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de detalhes de rotas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <MapRouteDetails {...props} />
        <Box display={"flex"} flexDir={"column"}>
          <Button
            bgColor="green.500"
            colorScheme="green"
            variant="contained"
            alignSelf={"flex-end"}
            onClick={startRoute}
            mb={10}
            mt={10}
          >
            Iniciar a viagem
          </Button>
          <Grid id="map" p={40} ref={mapContainerRef}></Grid>
        </Box>
      </Box>
    </>
  );
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
