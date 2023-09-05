import { useEffect, useRef } from "react";
import { useMap } from "shared/libs/hooks/useMap";
import { socket } from "shared/libs/utils";
import { Grid, Text, Button } from "@chakra-ui/react";

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    socket.connect();

    socket.on(
      "admin-new-points",
      async (data: { route_id: string; lat: number; lng: number }) => {
        console.log({ data });
        if (!map?.hasRoute(data.route_id)) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${data.route_id}`
          );
          const route: any = await response.json();
          map?.removeRoute(data.route_id);
          await map?.addRouteWithIcons({
            routeId: data.route_id,
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
        }
        map?.moveCar(data.route_id, {
          lat: data.lat,
          lng: data.lng,
        });
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [map]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid id="map" p={80} ref={mapContainerRef}></Grid>
    </div>
  );
}

export default AdminPage;
