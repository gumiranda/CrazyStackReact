import { Grid } from "@chakra-ui/react";
import { useWS } from "@/application/providers/webSocketProvider";
import { mapRouteModel } from "@/slices/appointments/entidades/mapRoute/mapRoute.model";
import { useLoadMap } from "@/slices/appointments/features/mapRoute/load-map";
import { parseCookies } from "nookies";
import { useEffect, useRef } from "react";
import { parseJSON } from "@/shared/libs";

export default function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useLoadMap(mapContainerRef);
  const { wsInstance } = useWS();
  const handleSocket = (socket: any) => {
    socket.onmessage = (event: any) => {
      console.log("mensagem recebida", event.data);
      const message = parseJSON(event.data);
      if (message?.route_id) {
        handleMessage(message);
      }
    };
    socket.onclose = () => {
      console.log("conexão fechada");
    };
  };
  useEffect(() => {
    if (map) {
      handleSocket(wsInstance);
      return () => {
        wsInstance.close();
      };
    }
  }, [map]);

  const handleMessage = async (data: { route_id: string; lat: number; lng: number }) => {
    const routeId = data?.route_id;
    if (!map?.hasRoute(routeId)) {
      const cookies = parseCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${routeId}`,
        {
          headers: { Authorization: `Bearer ${cookies["belezixadmin.token"]}` },
        }
      );
      const responseJson: any = await response.json();
      const route = mapRouteModel(responseJson).format();
      await map?.addRouteWithIcons({
        routeId,
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
    map?.moveCar(routeId, { lat: data.lat, lng: data.lng });
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid id="map" p={80} ref={mapContainerRef}></Grid>
    </div>
  );
}
