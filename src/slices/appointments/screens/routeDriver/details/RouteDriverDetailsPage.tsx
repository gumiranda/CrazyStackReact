"use client";
import { Box, Grid } from "@/shared/ui";
import { RouteDriverDetails } from "@/slices/appointments/entidades/routeDriver/details";
import { RouteDriverProps } from "@/slices/appointments/entidades/routeDriver";
import { MapRouteProps } from "@/slices/appointments/entidades/mapRoute";
import { useRef, useEffect, useState } from "react";
import { useLoadMap } from "@/slices/appointments/features/mapRoute/load-map";
import { mapRouteModel } from "@/slices/appointments/entidades/mapRoute/mapRoute.model";
import { useWS } from "@/application/providers/webSocketProvider";
import { parseJSON, useUi } from "@/shared/libs";
import { routeDriverModel } from "@/slices/appointments/entidades/routeDriver/routeDriver.model";
import { useTranslation } from "react-i18next";

type RouteDriverDetailsProps = {
  data: RouteDriverProps;
  mapRoute: MapRouteProps;
  id: string;
};
export const RouteDriverDetailsPage = ({ data, mapRoute }: RouteDriverDetailsProps) => {
  const { t } = useTranslation(["PAGES"]);

  const props = { routeDriver: data, mapRoute };
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useLoadMap(mapContainerRef);
  const [socketClosed, setSocketClosed] = useState(false);
  const [newPoints, setNewPoints] = useState<any>([]);
  const { wsInstance: socket } = useWS();
  const { showModal, setLoading } = useUi();
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    if (map) {
      socket.onmessage = (event: any) => {
        console.log("mensagem recebida", event.data);
        const message = parseJSON(event.data);
        if (message?.route_id) {
          handleMessage(message);
        }
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
    }
  }, [map]);
  const handleMessage = async (message: {
    route_id: string;
    routeDriverId: string;
    lat: string;
    lng: string;
  }) => {
    const route = mapRouteModel(mapRoute).format();
    const routeDriver = routeDriverModel(data).format();
    const routeId = route?._id;
    const { route_id, routeDriverId, lat, lng } = message;
    if (route_id !== routeId || routeDriverId !== routeDriver?._id) {
      return;
    }
    setNewPoints((prev: any) => [
      ...(prev ?? []),
      { routeId, location: convertLocation({ lat, lng }) },
    ]);
  };
  useEffect(() => {
    const route = mapRouteModel(mapRoute).format();
    const routeDriver = routeDriverModel(data).format();
    initRouteMap({ route, routeDriver });
  }, [map, socketClosed]);
  useEffect(() => {
    async function updateMapPoints() {
      const pointsSize = newPoints?.length ?? 0;
      if (pointsSize > 1) {
        await updateRoutes();
        map?.moveCar(
          newPoints?.[0]?.routeId,
          convertLocation(newPoints?.[pointsSize - 1]?.location)
        );
      }
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(updateMapPoints, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(updateMapPoints, 1500);
      setTimeoutId(id);
    }
  }, [newPoints]);
  const updateRoutes = async () => {
    const pointsSize = newPoints?.length ?? 0;
    for (let index = 0; index < newPoints.length; index++) {
      const { location } = newPoints[index];
      const nextLocation =
        newPoints[index === pointsSize - 1 ? index : index + 1]?.location;
      const routeKey = `${location?.lat}-${location?.lng}-${nextLocation?.lat}-${nextLocation?.lng}`;
      if (!map?.hasRoute(routeKey) && index + 1 <= pointsSize - 1) {
        await map?.addRoute({
          routeId: routeKey,
          startMarkerOptions: {
            visible: false,
            position: convertLocation(location),
          },
          carMarkerOptions: {
            visible: false,
            position: convertLocation(newPoints[pointsSize - 1]?.location),
          },
          endMarkerOptions: {
            visible: false,
            position: convertLocation(nextLocation),
          },
        });
      }
    }
  };
  const initRouteMap = async ({
    route,
    routeDriver,
  }: {
    routeDriver: RouteDriverProps;
    route: MapRouteProps;
  }) => {
    if (!mapRoute) {
      return;
    }
    map?.removeAllRoutes();
    const pointsSize = routeDriver?.points?.length ?? 0;
    await map?.addRouteWithIcons({
      routeId: route?._id,
      startMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].start_location,
      },
      carMarkerOptions: {
        position: convertLocation(routeDriver?.points?.[pointsSize - 1]?.location),
      },
      endMarkerOptions: {
        position: route.directionsJson.routes[0].legs[0].end_location,
      },
    });
    await sleep(2000);
    if (pointsSize > 0) {
      routeDriver.points.forEach(async ({ location }, index) => {
        if (index + 1 <= pointsSize - 1) {
          await map?.addRoute({
            routeId: `${route?._id}-${routeDriver?._id}-${location?.lat}`,
            startMarkerOptions: {
              visible: false,
              position: convertLocation(location),
            },
            carMarkerOptions: {
              visible: false,
              position: convertLocation(routeDriver?.points?.[pointsSize - 1]?.location),
            },
            endMarkerOptions: {
              visible: false,
              position: convertLocation(routeDriver?.points?.[index + 1].location),
            },
          });
        }
      });
    }
  };
  const convertLocation = ({ lat, lng }: any) => {
    return { lat: Number(lat), lng: Number(lng) };
  };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <RouteDriverDetails {...props} />
        <Box display="flex" flexDir="column">
          <Grid id="map" p={80} ref={mapContainerRef} />
        </Box>
      </Box>
    </>
  );
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
