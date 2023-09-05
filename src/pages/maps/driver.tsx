import { useEffect, useRef } from "react";
import { useMap } from "shared/libs/hooks/useMap";
import { Route, socket } from "shared/libs/utils";
import { Grid, Text, Button } from "@chakra-ui/react";
import { RouteSelect } from "features/maps/RouteSelect";

export function DriverPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  async function startRoute() {
    const routeId = (document.getElementById("route") as HTMLSelectElement).value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${routeId}`
    );
    const route: any = await response.json();
    console.log({ route });
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: routeId,
      startMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: route.directions.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
    });

    const { steps } = route.directions.routes[0].legs[0];

    for (const step of steps) {
      await sleep(2000);
      map?.moveCar(routeId, step.start_location);
      socket.emit("new-points", {
        route_id: routeId,
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      });

      await sleep(2000);
      map?.moveCar(routeId, step.end_location);
      socket.emit("new-points", {
        route_id: routeId,
        lat: step.end_location.lat,
        lng: step.end_location.lng,
      });
    }
  }

  return (
    <Grid display={"flex"} flexDir={"column"} flex={1}>
      <Grid px={2}>
        <Text as="h4">Nova rota</Text>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <RouteSelect id="route" />
          <Button variant="contained" onClick={startRoute}>
            Iniciar a viagem
          </Button>
        </div>
      </Grid>
      <Grid id="map" p={80} ref={mapContainerRef}></Grid>
    </Grid>
  );
}

export default DriverPage;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
