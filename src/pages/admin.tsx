import { useEffect, useRef } from "react";
import { Grid } from "@chakra-ui/react";
import { useWS } from "application/providers/webSocketProvider";
import { parseJSON } from "shared/libs";
import { parseCookies } from "nookies";
import { mapRouteModel } from "entidades/mapRoute/mapRoute.model";
import { useLoadMap } from "features/mapRoute/load-map";

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useLoadMap(mapContainerRef);
  const { wsInstance } = useWS();
  const handleSocket = (socket: any) => {
    socket.onmessage = (event: any) => {
      console.log("Mensagem recebida:", event.data);
      if (parseJSON(event.data)?.route_id) {
        handleMessage(parseJSON(event.data));
      }
    };

    socket.onclose = () => {
      console.log("Conexão WebSocket fechada");
      window.location.reload();
    };
  };
  useEffect(() => {
    console.log({ map });
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
          headers: {
            Authorization: `Bearer ${cookies["belezixadmin.token"]}`, // Adicione o token do cookie ao header de autorização.
          },
        }
      );
      const responsejson: any = await response.json();
      const route = mapRouteModel(responsejson).format();

      map?.removeRoute(routeId);
      await map?.addRouteWithIcons({
        routeId: routeId,
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
    map?.moveCar(routeId, {
      lat: data.lat,
      lng: data.lng,
    });
  };

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
