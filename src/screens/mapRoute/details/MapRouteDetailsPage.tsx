"use client";
import { Box, Head, Button } from "@/shared/ui";
import { MapRouteDetails } from "@/entidades/mapRoute/details";
import { MapRouteProps } from "@/entidades/mapRoute";
import { useRef, useEffect, useState } from "react";
import { useLoadMap } from "@/features/mapRoute/load-map";
import { Grid } from "@chakra-ui/react";
import { mapRouteModel } from "@/entidades/mapRoute/mapRoute.model";
import { parseCookies } from "nookies";
import { useWS } from "@/application/providers/webSocketProvider";
import { api } from "@/shared/api";
import { useUi } from "@/shared/libs";
import { useTranslation } from "react-i18next";

type MapRouteDetailsProps = {
  data: MapRouteProps;
  id: string;
};
export const MapRouteDetailsPage = ({ data }: MapRouteDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  const props = { mapRoute: data };
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useLoadMap(mapContainerRef);
  const [routeInitialized, setRouteInitialized] = useState(false);
  const [socketClosed, setSocketClosed] = useState(false);
  const { wsInstance: socket } = useWS();
  const { showModal, setLoading } = useUi();
  useEffect(() => {
    socket.onmessage = (event: any) => {
      console.log("mensagem recebida", event.data);
    };
    socket.onclose = () => {
      setSocketClosed(true);
      showModal({
        content: t("PAGES:MESSAGES.errorMessage", {
          defaultValue:
            "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        }),
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        type: "error",
      });
      console.log("conexão websocket fechada");
    };
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    initRouteMap();
  }, [map, socketClosed]);
  async function initRouteMap() {
    if (!data) {
      return;
    }
    const route = mapRouteModel(data).format();
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: route?._id,
      startMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].start_location,
      },
      carMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].end_location,
      },
    });
  }
  async function simulateFakeRide({ route, routeCreatedResponse }: any) {
    const { steps } = route.directionsJson.routes[0].legs[0];
    for (const step of steps) {
      await sleep(2000);
      map?.moveCar(route?._id, step.start_location);
      if (socketClosed) {
        const { data } = await api.patch(
          `/routeDriver/update?_id=${routeCreatedResponse?._id}&routeId=${route?._id}&lat=${step.start_location.lat}&lng=${step.start_location.lng}`,
          { updatedAt: new Date() }
        );
      }
      socket.send(
        JSON.stringify({
          topic: "updatePosition",
          routeDriverId: routeCreatedResponse?._id,
          route_id: route?._id,
          lat: step.start_location.lat,
          lng: step.start_location.lng,
        })
      );
      await sleep(2000);
      map?.moveCar(route?._id, step.end_location);
      if (socketClosed) {
        const { data } = await api.patch(
          `/routeDriver/update?_id=${routeCreatedResponse?._id}&routeId=${route?._id}&lat=${step.end_location.lat}&lng=${step.end_location.lng}`,
          { updatedAt: new Date() }
        );
      }
      socket.send(
        JSON.stringify({
          topic: "updatePosition",
          routeDriverId: routeCreatedResponse?._id,
          route_id: route?._id,
          lat: step.end_location.lat,
          lng: step.end_location.lng,
        })
      );
    }
  }
  async function startRoute() {
    const route = mapRouteModel(data).format();
    const cookies = parseCookies();
    setLoading(true);
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
    setLoading(false);
    if (!response || response?.status !== 200) {
      return;
    }
    const routeCreatedResponse = await response.json();
    if (!routeCreatedResponse) {
      return;
    }
    setRouteInitialized(true);
    await simulateFakeRide({ route, routeCreatedResponse });
  }
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <MapRouteDetails {...props} />
      <Box display="flex" flexDir="column">
        <Button
          bgColor="green.500"
          colorScheme="green"
          variant="contained"
          alignSelf={"flex-end"}
          onClick={startRoute}
          mb={10}
          mt={10}
        >
          Iniciar a corrida
        </Button>
        <Grid id="map" p={40} ref={mapContainerRef} />
      </Box>
    </Box>
  );
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
