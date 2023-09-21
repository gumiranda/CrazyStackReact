import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { useLoadMap } from "../load-map";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { parseCookies } from "nookies";

export interface HandleLocationProps {
  originText: string;
  destinationText: string;
  mapContainerRef: any;
  currentMapRoute?: any;
}

export const useHandleLocation = ({
  originText,
  destinationText,
  mapContainerRef,
  currentMapRoute = null,
}: HandleLocationProps) => {
  const map = useLoadMap(mapContainerRef);
  const [directionsData, setDirectionsData] = useState<
    DirectionsResponseData & { request: any }
  >(currentMapRoute?.directionsJson);
  const [originListPlaces, setOriginListPlaces] = useState([]);
  const [destinationListPlaces, setDestinationListPlaces] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const fetchTextOptions = async (text: string, setPlaces: any) => {
    if (text?.length < 1) {
      return;
    }
    const cookies = parseCookies();
    try {
      const sourceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${text}`,
        {
          headers: {
            ContentType: "application/json",
            authorization: `Bearer ${cookies["belezixadmin.token"]}`,
          },
        }
      );
      if (sourceResponse?.status !== 200) {
        setPlaces([]);
        return;
      }
      const sourcePlace = await sourceResponse.json();
      setPlaces(
        sourcePlace?.candidates?.map?.(({ name, place_id }: any) => ({
          label: name,
          value: place_id,
        })) ?? []
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(originText, setOriginListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [originText]);
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(destinationText, setDestinationListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [destinationText]);
  const fetchDirections = useCallback(async () => {
    const cookies = parseCookies();
    const source = (document.getElementById("originText") as HTMLInputElement).value;
    const destination = (document.getElementById("destinationText") as HTMLInputElement)
      .value;
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === source
    );
    if (!currentOrigin) {
      return;
    }
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === destination
    );
    if (!currentDestination) {
      return;
    }
    const directionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/directions?originId=${currentOrigin?.value}&destinationId=${currentDestination?.value}`,
      { headers: { authorization: `Bearer ${cookies["belezixadmin.token"]}` } }
    );
    const directionsDataRes: DirectionsResponseData & { request: any } =
      await directionsResponse.json();
    setDirectionsData(directionsDataRes);
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: "123",
      startMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
      carMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
      endMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.end_location,
      },
    });
  }, [originText, destinationText, originListPlaces, destinationListPlaces]);
  useEffect(() => {
    if (directionsData) {
      updateMapView();
    }
  }, [map, directionsData]);
  const updateMapView = async () => {
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: "1",
      startMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
      endMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.end_location,
      },
      carMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
    });
  };
  return { originListPlaces, destinationListPlaces, fetchDirections, directionsData };
};
